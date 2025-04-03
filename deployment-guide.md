# MIDI to ABC Converter Deployment Guide

This guide walks you through deploying the MIDI to ABC Converter custom component to Retool.

## Prerequisites

1. Node.js v20 or later installed
2. Admin permissions in Retool
3. API access token with read and write scopes for Custom Component Libraries

## Step-by-Step Deployment

### 1. Setup

First, ensure all files are properly set up in the project directory:

```bash
# Make sure you have the right directory structure
ls -la
# Should show package.json, src directory, etc.

# Make setup scripts executable
chmod +x retool-setup.sh 
chmod +x move-files.sh
```

### 2. Install Dependencies

```bash
# Install all required packages
npm install
```

### 3. Retool Setup

```bash
# Run the Retool setup script
./retool-setup.sh
```

This will:
- Log you into Retool (requires your API token)
- Initialize the component library in Retool

### 4. Development Mode (Optional)

If you want to test before deploying:

```bash
# Start development mode
npm start
```

In development mode, you can see changes to your component in real-time in Retool.

### 5. Deploy to Production

When ready for production:

```bash
# Deploy to Retool
npm run build
```

This creates an immutable version in Retool that can be used in production apps.

### 6. Using in Retool

1. Go to your Retool app
2. Look for your component in the Add Components panel (under your library name)
3. Drag the component onto your canvas
4. Configure using the Inspector panel
5. For production use, go to Custom Component settings and switch from "dev" to the specific version

### Troubleshooting

- **Deployment fails**: Check console output for specific errors
- **Component doesn't appear**: Refresh the Retool page and check that your component was properly deployed
- **Changes not showing**: In development, wait a few seconds or refresh; in production, redeploy

## Useful Commands

- Check component status: `npx retool-ccl status`
- List deployed versions: `npx retool-ccl list`
- Get help: `npx retool-ccl --help`
