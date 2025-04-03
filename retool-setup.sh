#!/bin/bash

echo "===== MIDI to ABC Retool Setup ====="
echo

# Check if retool-ccl is installed
if ! command -v npx retool-ccl &> /dev/null; then
    echo "Installing Retool CCL..."
    npm install -g retool-ccl
fi

# Log in to Retool
echo "Logging in to Retool..."
echo "You will need to provide an API access token with read and write scopes for Custom Component Libraries."
npx retool-ccl login

# Initialize the component library
echo "Initializing component library..."
npx retool-ccl init

echo
echo "Setup complete! You can now:"
echo "1. Start development mode: npm start"
echo "2. Deploy to production: npm run build"
echo
echo "Don't forget to add your component from the Add Components panel in Retool."
echo "It will be listed under your library's name."
