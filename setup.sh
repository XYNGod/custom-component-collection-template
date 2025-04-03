#!/bin/bash

echo "MIDI to ABC Converter Setup"
echo "=========================="
echo

# Check Node version
echo "Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Found Node.js $NODE_VERSION"

# Verify package.json exists
echo "Checking for package.json..."
if [ -f "package.json" ]; then
    echo "Found package.json!"
else
    echo "ERROR: package.json not found in current directory!"
    echo "Current directory: $(pwd)"
    exit 1
fi

# Clean installation
echo "Performing clean installation..."
echo "Removing node_modules (if exists)..."
rm -rf node_modules
echo "Removing package-lock.json (if exists)..."
rm -f package-lock.json
echo "Installing dependencies..."
npm install

# Verify npm scripts
echo "Verifying npm scripts..."
if npm run verify; then
    echo "Verification successful!"
else
    echo "ERROR: Verification failed. Check npm configuration."
    exit 1
fi

echo
echo "Setup completed successfully!"
echo "You can now run:"
echo "  npm start    - To start the development server"
echo "  npm run build - To build for production"
echo
