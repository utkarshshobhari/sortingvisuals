# Setup and Runbook

## Prerequisites

### Required Runtime and Tool Versions

| Requirement | Minimum Version | Recommended Version |
|-------------|-----------------|---------------------|
| Node.js | 12.x (for npm/yarn) | 14.x or 16.x |
| npm | 6.x (comes with Node 12) | 7.x+ (comes with Node 14+) |
| Git | 2.x | Latest |
| Text Editor/IDE | Any | VS Code, WebStorm, etc. |

### Operating System
- Windows 10 or later (verified on Windows 11)
- macOS 10.15+
- Linux (any modern distribution)

## Required Runtime and Tool Versions

The project was built with Create React App and requires:

```
Node: v14.x or later (recommended)
npm: 6.x or later (comes with Node)
```

## Dependency Installation

### From Project Root

```bash
# Install dependencies (one-time setup)
npm install
```

This will install:
- `react`: ^16.14.0
- `react-dom`: ^16.14.0
- `react-scripts`: 3.4.3
- Testing libraries: `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`

### Verifying Installation

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check if project node_modules exists
ls -la node_modules/ | head -5
```

## Environment Variables

### Configure Environment

This project uses **Create React App** with no custom environment configuration. All CRA environment variables are optional.

| Variable Name | Purpose | Default | Required? |
|---------------|---------|---------|-----------|
| `NODE_ENV` | App environment (development/production) | Set by npm scripts | No |
| `PUBLIC_URL` | Base URL for static assets | Auto-detected by CRA | No |

### Using Environment Variables

```bash
# Set NODE_ENV for development
set NODE_ENV=development  # Windows PowerShell
# or
$env:NODE_ENV='development'  # PowerShell

# Set PUBLIC_URL if needed
set PUBLIC_URL=/my-app  # Windows PowerShell
```

### Placeholder Values
> **Note**: No secrets or credentials need to be configured. This is a pure frontend project.

## Local Development Setup

### Step 1: Clone/Verify Repository

```bash
# Navigate to project directory
cd d:\sorting\sortingvisuals

# Verify git status
git status

# Check current branch
git branch
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm start
```

### Step 4: Verify Application

Open browser to `http://localhost:3000`

Expected behavior:
- 60 array bars with random heights display automatically
- Two buttons visible: "Generate New Array" and "Merge Sort"
- Clicking "Generate New Array" produces new random values
- Clicking "Merge Sort" animates the merge sort visualization

## Application Startup and Shutdown

### Startup

```bash
npm start
```

This runs:
- `react-scripts start`
- Starts development server at `http://localhost:3000`
- Enables Hot Module Replacement (HMR)
- Watches for file changes and recompiles

### Shutdown

```bash
# Press Ctrl+C in the terminal where npm start is running
```

Or close the terminal window.

### Build for Production

```bash
npm run build
```

This runs:
- `react-scripts build`
- Creates production build in `build/` directory
- Minifies CSS and JavaScript
- Generates source maps
- Outputs asset manifest

### Test Suite

```bash
npm test
```

This runs:
- `react-scripts test`
- Launches Jest test runner
- Watches for file changes (default mode)
- Runs tests once if `--watchAll=false` is passed

### Eject (One-Way Operation)

> **Warning**: This is a one-way operation. Once you `eject`, you can't go back!

```bash
npm run eject
```

This copies all configuration files and dependencies into your project:
- Webpack config
- Babel config
- ESLint config
- All CRA scripts

> **Recommendation**: Do not eject for this project. The default CRA configuration is sufficient.

## Database Initialization and Migrations

### N/A - No Database

This is a pure frontend application with no database. No migration commands are needed.

### If You Need to Add Persistence

To add localStorage persistence:

1. Modify `src/Sortingvisuals.jsx` `resetArray()` to save to `localStorage`
2. Add a `componentWillUnmount()` or `useEffect` cleanup
3. On load, check `localStorage.getItem('sortedArray')` and use it

**Example pattern** (would need to adapt for class components):
```javascript
// On resetArray:
localStorage.setItem('array', JSON.stringify(this.state.array))

// On component mount:
const saved = JSON.parse(localStorage.getItem('array'))
if (saved) this.setState({array: saved})
```

## Common Errors and Troubleshooting

| Error Symptom | Likely Cause | Solution |
|---------------|--------------|----------|
| `npm start` fails with `EACCES` | Permission issue | Run `npm config set prefix ~/npm-global` or use `sudo` (not recommended) |
| Browser shows blank white screen | Build error, syntax error | Check terminal for error messages; run `npm run build` to see full output |
| `Cannot find module` errors | Missing dependencies | Run `npm install` again |
| Service worker not registering | `serviceWorker.unregister()` in index.js | This is expected - SW is disabled by default |
| Bars not appearing | CSS issue | Verify `Sortingvisuals.css` is imported in `Sortingvisuals.jsx` |
| Merge sort does nothing | User error | Ensure "Merge Sort" button is clicked, not "Generate New Array" |
| Tests failing | Jest configuration | Run `npm test -- --watchAll=false` to run once |

### Troubleshooting Guide

1. **Check the terminal** - Most errors are reported there
2. **Run `npm run build`** - Often shows clearer error messages than `npm start`
3. **Check Node version** - Ensure you have Node 12+ (Node 14+ recommended)
4. **Clear node_modules and reinstall** - `rm -rf node_modules && npm install` (Linux/Mac) or `rmdir /s node_modules && npm install` (Windows)

## Build and Deployment Steps

### Build Locally

```bash
npm run build
```

Output location: `./build/` directory

### Deployment

This project can be deployed to any static hosting service:

| Service | Command |
|---------|---------|
| Netlify | Drag and drop `build/` folder, or connect repo |
| Vercel | `vercel` from project root, or connect repo |
| GitHub Pages | `npm run build && gh-pages -d build` |
| Surge | `npm run build` then `surge build/` |
| AWS S3 | Upload `build/` contents to bucket |

### Post-Build Verification

After `npm run build`:

1. Check `build/index.html` exists and is valid HTML
2. Check `build/static/js/` contains minified bundles
3. Check `build/static/css/` contains minified styles
4. Check `build/manifest.json` and `build/service-worker.js` exist

## Known Issues

- Service worker is disabled by default (`serviceWorker.unregister()` in `src/index.js`)
- No persistence - array state lost on page refresh
- Only merge sort algorithm implemented
- Duplicate animation steps in merge sort implementation
- No dark mode support
- Not responsive (fixed positioning at left: 300px)