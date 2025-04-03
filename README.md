# MIDI to ABC Converter for Retool

A Retool custom component for converting MIDI files to ABC notation.

## Features

- Upload MIDI files and convert them to ABC notation
- View processing steps and debug information
- Configurable title and debugging display
- Triggers events on successful conversion or errors

## Component Properties

| Property | Type | Description |
|----------|------|-------------|
| title | String | The title displayed at the top of the component |
| showDebugInfo | Boolean | Whether to show debugging information |

## Events

| Event | Description | Data |
|-------|-------------|------|
| onConversionComplete | Triggered when conversion is successful | `{ abc: string, filename: string }` |
| onError | Triggered when an error occurs | `{ error: string }` |

## Values

| Value | Type | Description |
|-------|------|-------------|
| abcOutput | String | The generated ABC notation |

## Installation

This component has specific dependency requirements to work with Retool:

```bash
# Run the installation script with legacy peer dependencies
./install.sh
```

Or manually:

```bash
# Clean install with legacy peer dependencies
rm -rf node_modules
rm -f package-lock.json
npm install --legacy-peer-deps
```

## Development

1. Make sure you have Node.js version 20 or later installed:
   ```bash
   node --version
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Log in to Retool:
   ```bash
   npx retool-ccl login
   ```

4. Start development server:
   ```bash
   npm start
   ```
   Or:
   ```bash
   npx retool-ccl dev
   ```

5. Deploy to Retool:
   ```bash
   npm run build
   ```
   Or:
   ```bash
   npx retool-ccl deploy
   ```

## Retool-Specific Setup

To use this component in Retool:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the Retool setup script:
   ```bash
   ./retool-setup.sh
   ```

3. Follow the prompts to log in to Retool and initialize the component library

4. Start development mode:
   ```bash
   npm start
   ```

5. In your Retool app, refresh the page, then look for your component in the Components panel under your library name

6. Drag the component onto your canvas and configure it through the Inspector panel

7. When ready for production, deploy:
   ```bash
   npm run build
   ```
   
8. In your Retool app settings, switch from "dev" to the specific version you deployed

## Common Retool Issues

- **Component doesn't appear in Component Library**: Make sure you've correctly initialized and deployed the component, and refreshed the Retool page
- **Component not updating during development**: Check the console for errors and make sure the component is in dev mode
- **Cannot log in to Retool**: Make sure you have an API access token with read and write scopes for Custom Component Libraries

## Troubleshooting

- **"Missing script" errors**: Make sure you're in the correct directory and have installed dependencies
- **Component not showing in Retool**: Refresh the Retool page or check the console for errors
- **File conversion issues**: Check browser console for detailed error messages

### Dependency Conflicts

If you encounter TypeScript dependency conflicts, use the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

This is needed because:
- Retool's custom component support requires TypeScript 5.x
- Some React development tools expect TypeScript 4.x 
- Using `--legacy-peer-deps` allows npm to ignore these conflicts
