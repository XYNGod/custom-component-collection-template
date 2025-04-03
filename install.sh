#!/bin/bash

echo "===== MIDI to ABC Converter Installation ====="
echo

# Clean installation
echo "Cleaning previous installation..."
rm -rf node_modules
rm -f package-lock.json

# Install with legacy peer deps to avoid TypeScript conflicts
echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "Installation successful!"
    echo
    echo "You can now run:"
    echo "  ./retool-setup.sh   - To set up Retool integration"
    echo "  npm start           - To start development mode"
    echo "  npm run build       - To build and deploy to Retool"
else
    echo "Installation failed. Please check the error messages above."
    exit 1
fi

# Make it executable
chmod +x install.sh
