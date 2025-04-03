import React, { FC } from 'react';
import Retool from '@tryretool/custom-component-support';
import { convertMidiToAbc } from './midiToAbcUtils';
import './styles.css';

// Create a simple component structure that follows Retool's example exactly
export const MidiToAbcConverter: FC = () => {
  // Basic state from Retool
  const [name, setName] = Retool.useStateString({
    name: "name",
    defaultValue: "World",
    description: "The name to display"
  });

  // Component-specific states
  const [title, setTitle] = Retool.useStateString({
    name: "title",
    defaultValue: "MIDI to ABC Converter",
    description: "The title of the component"
  });

  const [showDebugInfo, setShowDebugInfo] = Retool.useStateBoolean({
    name: "showDebugInfo",
    defaultValue: true,
    description: "Whether to show debugging information"
  });

  // Component local state - not directly exposed to Retool builder
  const [processingSteps, setProcessingSteps] = React.useState<Array<{step: string, timestamp: string}>>([]);
  const [abcOutput, setAbcOutput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  // Expose the ABC output to Retool
  Retool.useSetValue('abcOutput', abcOutput);
  
  // Define Retool event triggers
  const onConversionComplete = Retool.useTriggerEvent({ name: 'onConversionComplete' });
  const onError = Retool.useTriggerEvent({ name: 'onError' });
  
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
    <div className="converter-container p-4">
      {/* Start with a very simple component structure to verify it works */}
      <div className="debug-message" style={{marginBottom: '10px', color: 'blue'}}>
        Component loaded! Hello {name}!
      </div>
      
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      
      <div className="file-input mb-6">
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
            <div className="processing-steps">
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
            <div className="abc-output">
              {error && (
                <div className="error-message">
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
          <pre className="abc-output">
            {abcOutput}
          </pre>
        </div>
      )}
      
      <div className="info-panel mt-4 p-4">
        <h3 className="font-semibold">Conversion Information:</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>Upload a MIDI file to convert to ABC notation</li>
          <li>The component will process the file and display the ABC output</li>
          <li>You can configure this component using the Inspector panel</li>
        </ul>
      </div>
    </div>
  );
};

// This export is what Retool looks for
export default {
  MidiToAbcConverter
};
