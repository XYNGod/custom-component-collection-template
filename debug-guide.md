# Debugging the MIDI to ABC Converter Component

If your component is only showing "Hello !" instead of the full converter interface, follow these steps to troubleshoot.

## Common Issues and Solutions

### 1. Component Not Fully Rendering

**Symptoms**: 
- Only part of the component appears 
- "Hello World" or similar text shows, but no full UI

**Solutions**:
1. Check the JavaScript console for errors:
   - In Retool, press F12 to open developer tools
   - Look for errors in the Console tab

2. Try a clean reinstall:
   ```bash
   ./install.sh
   ```

3. Make sure all component files are in the correct location:
   ```bash
   # Verify src directory structure
   ls -la src
   ```

### 2. TypeScript Type Errors

**Symptoms**:
- Component fails to build or deploy 
- Console shows type errors

**Solutions**:
1. Fix TypeScript versions:
   ```bash
   npm install typescript@5.3.3 --legacy-peer-deps
   ```

2. Ensure tsconfig.json is correct

### 3. Retool Integration Issues

**Symptoms**:
- Component appears but doesn't interact with Retool 
- Properties don't show in Inspector

**Solutions**:
1. Check if the component is exported correctly in src/index.tsx
2. Make sure you're using the right Retool hooks:
   ```typescript
   const [name, setName] = Retool.useStateString({
     name: "name",
     defaultValue: "Default value"
   });
   ```

3. Deploy a fresh version and select it in Retool:
   ```bash
   npm run build
   ```

## Testing a Minimal Component

To isolate issues, you can temporarily replace your component with a minimal version:

```typescript
export const MidiToAbcConverter: FC = () => {
  const [name, setName] = Retool.useStateString({
    name: "name",
    defaultValue: "World"
  });

  return (
    <div style={{padding: '20px', border: '1px solid #ccc'}}>
      <h2>Hello {name}!</h2>
      <p>This is a test component.</p>
    </div>
  );
};

export default {
  MidiToAbcConverter
};
```

Once this works, gradually add back your component's functionality.
