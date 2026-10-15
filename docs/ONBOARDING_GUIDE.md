# Onboarding Guide

## What to Read First

### 1. Start with the Project Overview
- **File**: `docs/PROJECT_OVERVIEW.md`
- **Purpose**: Understand what the project does, who it's for, and its core features
- **Time to read**: ~5 minutes

### 2. Check the Architecture
- **File**: `docs/ARCHITECTURE.md`
- **Purpose**: Understand the component structure, data flow, and design decisions
- **Time to read**: ~10 minutes

### 3. Set Up the Project
- **File**: `docs/SETUP_AND_RUNBOOK.md`
- **Purpose**: Get the project running on your local machine
- **Time to read**: ~10 minutes, then ~2 minutes to run `npm start`

## How to Run the Project

### Prerequisites
- Node.js 14+ (or 12+ with npm)
- npm (comes with Node)
- Git (optional, for version control)

### Installation Steps

```bash
# 1. Clone or navigate to the project
cd d:\sorting\sortingvisuals

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

### Expected Result
- Browser opens at `http://localhost:3000`
- 60 array bars with random heights display automatically
- Two buttons appear: "Generate New Array" and "Merge Sort"
- Clicking "Generate New Array" creates a new random array
- Clicking "Merge Sort" animates the merge sort visualization

### Troubleshooting Setup

| Issue | Solution |
|-------|----------|
| `npm start` won't start | Check Node version (`node --version`), ensure Node 12+ |
| Blank white screen | Run `npm run build` to see error messages |
| "Cannot find module" errors | Run `npm install` again |
| Service worker errors | Expected - SW is disabled by default (`unregister()` in `src/index.js`) |

### Key Files for New Developers

| Purpose | File | What to Look For |
|---------|------|------------------|
| Entry point | `src/index.js` | `ReactDOM.render()` call |
| App wrapper | `src/App.js` | `<Sortingvisuals />` render |
| Main component | `src/Sortingvisuals.jsx` | State, `componentDidMount`, `render`, button handlers |
| Algorithm logic | `src/Sortingalgorithms.js` | `getMergeSortAnimations()`, `mergeSortHelper()`, `doMerge()` |
| Visual styling | `src/Sortingvisuals.css` | `.array-container`, `.array-bar` classes |
| Project config | `package.json` | Dependencies, scripts, React version |

## The Most Important Modules

### 1. `src/Sortingvisuals.jsx` (Most Critical)
- **Role**: The entire application's UI and interaction logic
- **State managed**: `this.state.array` (60 integers)
- **Methods to know**:
  - `constructor()` - Initializes state with empty array
  - `componentDidMount()` - Calls `resetArray()` on load
  - `resetArray()` - Generates 60 random values (key method)
  - `mergeSort()` - Triggers animated sort (key method)
  - `render()` - Maps array to 60 bar divs with interactive buttons

### 2. `src/Sortingalgorithms.js` (Algorithm Module)
- **Role**: Pure merge sort implementation
- **Exported function**: `getMergeSortAnimations(array)`
- **Internal functions**:
  - `mergeSortHelper()` - Recursive divide step
  - `doMerge()` - Combine step
- **Output**: Animation step array (not sorted array directly)

### 3. `src/App.js` (App Container)
- **Role**: Wrapper component
- **Renders**: `<Sortingvisuals />`
- **No state management** - delegates all logic to `Sortingvisuals`

### 4. `src/index.js` (Entry Point)
- **Role**: ReactDOM render to DOM
- **Line**: `ReactDOM.render(<App />, document.getElementById('root'))`
- **Service worker**: `import * as serviceWorker from './serviceWorker'`; `serviceWorker.unregister()` (disabled)

### 5. `src/Sortingvisuals.css` (Component Styles)
- **Role**: Visual appearance of array bars
- **Key classes**:
  - `.array-container`: Positioned container (left: 300px)
  - `.array-bar`: Individual bar (width: 5px, inline-block, margin: 0 2px)

## How to Trace a Feature

### Tracing "Merge Sort" Feature End-to-End

1. **Start at the UI**: Look at `src/Sortingvisuals.jsx` render method
   - Find the "Merge Sort" button: `<button onClick={() => this.mergeSort()}>`
   
2. **Follow the event handler**: Go to `mergeSort()` method
   - Line: `mergeSort() {`
   - First call: `const animations = getMergeSortAnimations(this.state.array);`
   - Uses algorithm module: `Sortingalgorithms.js`

3. **Check the algorithm**: Read `src/Sortingalgorithms.js`
   - Function: `getMergeSortAnimations(array)`
   - Returns: `animations` array with `[index, index]` and `[index, value]` steps

4. **Understand the animation loop**: Back in `mergeSort()`
   - `for (let i = 0; i < animations.length; i++)`
   - Uses `setTimeout()` with `i * ANIMATION_SPEED_MS` delay
   - Accesses DOM: `document.getElementsByClassName('array-bar')`
   - Updates styles: `backgroundColor` or `height`

5. **See the result**: The 60 bars animate through merge sort steps
   - Color changes every 3 steps (red/cyan cycle)
   - Height updates every 3rd step

### Tracing "Generate New Array" Feature

1. **UI**: Button `onClick={() => this.resetArray()}`
2. **Handler**: `resetArray()` method
   - Generates 60 random integers (5-730)
   - `this.setState({array})`
3. **Result**: React re-renders with new bar heights

### Using the Feature Traceability Map
- Reference `docs/FEATURE_TRACEABILITY.md` for complete mapping
- Each feature has: UI components, controllers, services, database, tests
- Useful for finding where to add new functionality or debug issues

## How to Debug a Request

### Debugging Merge Sort Visualization

1. **Check if animations fire**:
   - Open browser DevTools → Console
   - Look for any JavaScript errors
   - Verify `npm start` is running without errors

2. **Verify array is loaded**:
   - In DevTools Console: `document.querySelectorAll('.array-bar').length`
   - Should be 60 if array loaded correctly
   - Or in React DevTools: Check `this.state.array` length

3. **Check animation timing**:
   - `ANIMATION_SPEED_MS` is 10ms
   - Total time = `animations.length * 10ms`
   - For 60-element array, merge sort generates ~1000+ animation steps

4. **Debug color cycling**:
   - Pattern: `i % 3 === 0` → red, `i % 3 === 1` → cyan, `i % 3 === 2` → height update
   - If colors seem off, check the modulo logic in `mergeSort()` method

5. **Check for duplicate steps**:
   - Known issue: Lines 35-36 in `Sortingalgorithms.js` push same indices twice
   - This may make color cycling appear faster than expected

### Debugging Button Clicks

1. **Button doesn't respond**:
   - Verify you're clicking the right button ("Merge Sort" vs "Generate New Array")
   - Check console for errors
   - Ensure `npm start` is running (hot reload may need refresh)

2. **New array doesn't appear**:
   - Check `this.state.array` in React DevTools
   - Verify `resetArray()` is generating values (5-730 range)
   - Look for errors in `randomIntFromInterval()`

3. **Sort seems slow/fast**:
   - Delay is `i * 10ms` where `i` is step index
   - Later steps have longer delays
   - Total duration depends on number of animation steps generated

## How to Add a New Feature Safely

### Adding a New Sorting Algorithm

1. **Create algorithm function** in `src/Sortingalgorithms.js`:
   - Follow existing pattern: export function with array input, animation output
   - Example: `getBubbleSortAnimations(array)`

2. **Add UI controls** in `src/Sortingvisuals.jsx`:
   - Add button or dropdown to select algorithm
   - State variable to track which algorithm is active
   - Modify `render()` to conditionally render controls

3. **Modify mergeSort() method** (or create new method):
   - Based on active algorithm state variable
   - Call appropriate animation function
   - Handle color coding consistently

4. **Test manually**:
   - Click new button/dropdown
   - Verify animation runs correctly
   - Check no regressions on existing merge sort

### Adding a New Feature Example (Conceptual)

```javascript
// 1. In Sortingalgorithms.js - add new algorithm
export function getBubbleSortAnimations(array) {
  // Generate animation steps for bubble sort
  const animations = [];
  // ... bubble sort logic pushing animation steps
  return animations;
}

// 2. In Sortingvisuals.jsx - add state and UI
this.state = {
  array: [],
  activeAlgorithm: 'merge',  // or 'bubble'
};

render() {
  return (
    <div className="array-container">
      {/* ... existing bars ... */}
      <button onClick={() => this.mergeSort()}>Merge Sort</button>
      <button onClick={() => this.setState({activeAlgorithm: 'bubble')}>
        Bubble Sort
      </button>
    </div>
  );
}

// 3. Modify mergeSort() to use active algorithm
mergeSort() {
  const animator = this.state.activeAlgorithm === 'bubble'
    ? getBubbleSortAnimations
    : getMergeSortAnimations;
  const animations = animator(this.state.array);
  // ... rest of existing animation code
}
```

### Checklist for Safe Changes

- [ ] Read the relevant source files
- [ ] Understand the current feature flow
- [ ] Make changes in isolation (one file at a time)
- [ ] Run `npm start` to verify no build errors
- [ ] Test the feature manually in browser
- [ ] Check for regressions (existing features still work)
- [ ] Update documentation if needed (`docs/` files)
- [ ] Run `npm test` to verify existing tests still pass

## How to Test and Validate a Change

### Running the Test Suite

```bash
# Run all tests once (CI mode)
npm test -- --watchAll=false

# Run with coverage report
npm test -- --coverage
```

### Adding a Test for Merge Sort

1. **Create test file**: `src/Sortingalgorithms.test.js`
2. **Write test cases**:
   ```javascript
   import { getMergeSortAnimations } from './Sortingalgorithms';
   
   test('getMergeSortAnimations returns array', () => {
     const result = getMergeSortAnimations([3, 1, 2]);
     expect(Array.isArray(result)).toBe(true);
   });
   
   test('getMergeSortAnimations handles single element', () => {
     const result = getMergeSortAnimations([1]);
     expect(result).toEqual([[]]); // or whatever the base case returns
   });
   
   test('getMergeSortAnimations handles empty array', () => {
     const result = getMergeSortAnimations([]);
     expect(result).toEqual([]);
   });
   ```

3. **Run tests**: `npm test -- --watchAll=false --testPathPattern=Sortingalgorithms`

### Manual Validation Steps

1. **Start the app**: `npm start`
2. **Observe behavior**:
   - Array bars appear with random heights
   - "Generate New Array" produces new values
   - "Merge Sort" animates the sort
3. **Verify expected outcomes**:
   - 60 bars always displayed
   - Heights vary between 5-730 pixels
   - Merge sort animation runs (bars move/change color)
   - After sort completes, bars remain visible
4. **Check for errors**:
   - No JavaScript errors in console
   - No React warnings
   - Animation completes without crashing

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Start development server | `npm start` |
| Build for production | `npm run build` |
| Run tests once | `npm test -- --watchAll=false` |
| Run tests in watch mode | `npm test` |
| Install dependencies | `npm install` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |

## Directory Structure Quick Reference

```
src/              # Main source code (focus all changes here)
  App.css         # App component styles
  App.js          # App wrapper component
  App.test.js     # Existing test (CRA default)
  index.js        # Entry point
  index.css       # Global styles
  logo.svg        # Logo asset
  serviceWorker.js# SW config (disabled)
  setupTests.js   # Test setup
  Sortingalgorithms.js  # Algorithm module ⭐ key for new features
  Sortingvisuals.css  # Visual component styles ⭐ key for styling
  Sortingvisuals.jsx  # Main component ⭐ key for UI changes

public/           # Static assets (generally don't modify)
  index.html      # HTML template
  favicon.ico     # Favicon
  logo192.png     # PWA icon
  logo512.png     # PWA icon
  manifest.json   # PWA manifest
  robots.txt      # SEO

docs/             # Documentation (update when code changes)
  *.md            # All documentation files

package.json      # Project config (update versions/deps carefully)
```