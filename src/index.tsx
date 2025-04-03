import React, { FC } from 'react';
import Retool from '@tryretool/custom-component-support';
import { convertMidiToAbc } from './midiToAbcUtils';
import './styles.css';

export const MidiToAbcConverter: FC = () => {
  const [processingSteps, setProcessingSteps] = React.useState<Array<{step: string, timestamp: string}>>([]);
  const [abcOutput, setAbcOutput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  
  // Define Retool properties for component configuration
  const [title, setTitle] = Retool.useStateString({
    name: "title",
    defaultValue: "MIDI to ABC Converter"
  });

  const [showDebugInfo, setShowDebugInfo] = Retool.useStateBoolean({
    name: "showDebugInfo",
    defaultValue: true
  });

  // Define Retool event triggers
  const onConversionComplete = Retool.useTriggerEvent({ name: 'onConversionComplete' });
  const onError = Retool.useTriggerEvent({ name: 'onError' });

  // Expose the ABC output to Retool
  Retool.useSetValue('abcOutput', abcOutput);
  
  const addStep = (step: string) => {
    setProcessingSteps(prev => [...prev, { step, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleConversion = async (file: File) => {
    setProcessingSteps([]);
    setError('');
    setAbcOutput('');
    
    if (!file) {
      const errorMsg = 'No file selected';
      setError(errorMsg);
      onError({ error: errorMsg });
      return;
    }

    try {
      // Step 1: Read the file
      addStep(`Reading file: ${file.name}`);
      
      const result = await convertMidiToAbc(file, addStep);
      setAbcOutput(result);
      addStep('Conversion complete');
      
      // Trigger Retool event with the result
      onConversionComplete({ abc: result, filename: file.name });
    } catch (err: any) {
      const errorMsg = `Error during conversion: ${err.message}`;
      setError(errorMsg);
      addStep(`Error: ${err.message}`);
      onError({ error: errorMsg });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleConversion(file);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select MIDI File:</label>
        <input 
          type="file" 
          accept=".mid,.midi" 
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {showDebugInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Processing Steps</h2>
            <div className="h-64 overflow-y-auto">
              {processingSteps.length > 0 ? (
                <ul className="space-y-1">
                  {processingSteps.map((item, index) => (
                    <li key={index} className="border-b pb-1">
                      <span className="text-gray-500 text-xs">{item.timestamp}</span> - {item.step}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No processing steps yet...</p>
              )}
            </div>
          </div>
          
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">ABC Output</h2>
            <div className="h-64 overflow-y-auto">
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
                  {error}
                </div>
              )}
              {abcOutput ? (
                <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                  {abcOutput}
                </pre>
              ) : (
                <p className="text-gray-500">No output yet...</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {!showDebugInfo && abcOutput && (
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">ABC Output</h2>
          <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
            {abcOutput}
          </pre>
        </div>
      )}
    </div>
  );
};

// Add this export statement at the bottom - this is what Retool looks for
export default {
  MidiToAbcConverter
};
