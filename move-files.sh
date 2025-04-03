#!/bin/bash

# Create src directory if it doesn't exist
mkdir -p src

# Move original files to a backup directory
mkdir -p backup
mv MidiToAbcConverter.jsx backup/
mv midiToAbcUtils.js backup/
mv index.js backup/

# Make the script executable
chmod +x move-files.sh

echo "Files moved to appropriate directories."
echo "Run './move-files.sh' to organize files."
