import React, { useState } from 'react';
import { convertMidiToAbc } from './midiToAbcUtils';

const MidiToAbcConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [abcOutput, setAbcOutput] = useState('');
  const [error, setError] = useState('');

  const addStep = (step) => {
    setProcessingSteps(prev => [...prev, { step, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleConversion = async (file) => {
    setProcessingSteps([]);
    setError('');
    setAbcOutput('');
    
    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      // Step 1: Read the file
      addStep(`Reading file: ${file.name}`);
      
      const result = await convertMidiToAbc(file, addStep);
      setAbcOutput(result);
      addStep('Conversion complete');
    } catch (err) {
      setError(`Error during conversion: ${err.message}`);
      addStep(`Error: ${err.message}`);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleConversion(file);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MIDI to ABC Converter</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select MIDI File:</label>
        <input 
          type="file" 
          accept=".mid,.midi" 
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
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
      
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold">Conversion Information:</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>Supported MIDI features: notes, tempo, time signature</li>
          <li>For complex MIDI files, some musical elements may be simplified</li>
          <li>Multi-track MIDI files will be merged into a single ABC track</li>
          <li>If conversion fails, try a simpler MIDI file or check the file format</li>
        </ul>
      </div>
    </div>
  );
};

export default MidiToAbcConverter;
