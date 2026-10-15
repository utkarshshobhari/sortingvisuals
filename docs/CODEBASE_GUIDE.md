# Codebase Guide

## Repository Structure

```
sortingvisuals/
├── .git/                      # Git repository (2 commits)
├── build/                     # **Compiled output (authoritative running application)**
│   ├── index.html            # Production HTML template
│   ├── static/               # Minified JS/CSS bundles
│   │   ├── css/main.*.chunk.css
│   │   └── js/main.de3fb5d8.chunk.js  **← Contains ALL 4 sorting algorithms**
│   ├── manifest.json       # PWA manifest
│   └── asset-manifest.json # Build asset mapping
├── docs/                      # Documentation (this analysis)
├── node_modules/              # Dependencies (not versioned)
├── package-lock.json          # Dependency lock file
├── package.json               # Project configuration and dependencies
├── public/                    # Static public assets (development HTML template)
│   ├── index.html            # Development HTML template (CRA)
│   ├── favicon.ico           # App favicon
│   ├── logo192.png           # PWA icon (192x192)
│   ├── logo512.png           # PWA icon (512x512)
│   ├── manifest.json         # PWA manifest (copy of build version)
│   └── robots.txt            # SEO robots directive
└── src/                       # **Source files (simplified subset - see NOTES below)**
    ├── App.css               # App component styles
    ├── App.js                # App container component
    ├── App.test.js           # App component tests (CRA default)
    ├── index.css             # Global styles (reset)
    ├── index.js              # Application entry point
    ├── logo.svg              # Logo placeholder
    ├── serviceWorker.js      # Service worker configuration (unregister by default)
    ├── setupTests.js         # Test setup configuration
    ├── Sortingalgorithms.js  # **Contains getMergeSortAnimations() but NOT used in build**
    ├── Sortingvisuals.css    # Visual component styles (turquoise default in build)
    ├── Sortingvisuals.jsx    # **Main component - contains ALL 4 algorithms inline**
    └── logo.svg              # Logo asset
```

## Important Files (Build Version - Authoritative)

| File | Purpose | Notes |
|------|---------|-------|
| `src/Sortingvisuals.jsx` | **Main component** - contains all 4 sorting algorithms inline | **Build has mergeSort, quickSort, heapSort, bubbleSort** all as methods |
| `src/Sortingalgorithms.js` | Contains `getMergeSortAnimations()` but **NOT imported/used** in build | Source-only feature; build has inline implementations |
| `src/index.js` | Entry point | Same in source and build |
| `package.json` | Project config | Same in both; CRA v3.4.3 |
| `build/static/js/main.de3fb5d8.chunk.js` | **Compiled output - AUTHORITATIVE** | Contains the running application with all features |

## NOTES on Source vs Build

### Critical Discovery
The `src/` source files document a **simplified version** of the project. The **compiled `build/` output is the authoritative running application**. A developer running `npm start` will experience the build version.

### Differences (Build Has More Features)

| Feature | Source `src/` | Build (Authoritative) |
|---------|---------------|----------------------|
| Sorting algorithms | Only mergeSort() concept | **4 algorithms**: merge, quick, heap, bubble |
| UI Buttons | 2 buttons | **5 buttons** |
| Array count | 60 (NUMBER_OF_ARRAY_BARS = 60) | **310** |
| Default color | cyan/red constants | **turquoise** |
| testSortingAlgorithms | Unexposed to UI | **Wired to UI** as "Test Sorting Algorithms (BROKEN)" |

### Working from Source vs Build

- **If running `npm start`**: Experience the **build version** with all 4 algorithms, 310 bars, 5 buttons, turquoise color
- **If editing `src/` files**: You're working with the simplified source; to match the build, you would need to:
  1. Add quickSort, heapSort, bubbleSort methods to Sortingvisuals.jsx
  2. Update the array loop from 60 to 310
  3. Change default color from cyan/red to turquoise
  4. Wire testSortingAlgorithms to UI button
  5. Or acknowledge you're working with a subset of the project

**Recommendation**: For consistency with the running application, base documentation and development on the `build/` output. The `src/` files are provided but are a simplified subset.

## Feature-to-File Mapping (Build Version)

| Feature | Primary File | Notes |
|---------|-------------|-------|
| 4 Sorting Algorithms | `src/Sortingvisuals.jsx` | All 4 (merge, quick, heap, bubble) as class methods |
| Array Visualization | `src/Sortingvisuals.jsx` | 310 `.array-bar` elements rendered |
| Random Array Generation | `src/Sortingvisuals.jsx` | 310 bars, values 5-730, generated on mount or button click |
| Merge Sort Visualization | `src/Sortingvisuals.jsx` | `mergeSort()` method |
| Quick Sort Visualization | `src/Sortingvisuals.jsx` | `quickSort()` method |
| Heap Sort Visualization | `src/Sortingvisuals.jsx` | `heapSort()` method |
| Bubble Sort Visualization | `src/Sortingvisuals.jsx` | `bubbleSort()` method |
| Algorithm Testing | `src/Sortingvisuals.jsx` | `testSortingAlgorithms()` method; UI button "Test Sorting Algorithms (BROKEN)" |
| Array Regeneration | `src/Sortingvisuals.jsx` | `resetArray()` method; 310 bars |
| Component Container | `src/App.js` | Wraps Sortingvisuals |
| Application Entry | `src/index.js` | ReactDOM.render() to DOM |
| Styling | `src/Sortingvisuals.css` | turquoise default color in build |

## Main Algorithms (All in `src/Sortingvisuals.jsx` Build Version)

The following algorithms are implemented as methods within the Sortingvisuals class component in the build version:

### 1. `mergeSort()`
- Divide-and-conquer O(n log n) algorithm
- Recursive splitting and merging with animation steps
- May use inline animation generation (different from source's getMergeSortAnimations())

### 2. `quickSort()`
- pivot-based partitioning algorithm
- Average O(n log n) performance
- Visualized with animation steps specific to quick sort

### 3. `heapSort()`
- heap-based sorting algorithm O(n log n)
- Uses heap data structure
- Visualized with animation steps specific to heap sort

### 4. `bubbleSort()`
- Repeated swap algorithm O(n²)
- Steps through list, compares adjacent elements
- Visualized with animation steps specific to bubble sort

**Note**: All 4 algorithms are class methods within `Sortingvisuals.jsx`. The source `src/Sortingalgorithms.js` contains `getMergeSortAnimations()` but this is **not used** in the build version - the algorithms are inline.

## Event Handling (Build Version)

| Element | Event | Handler | File |
|---------|-------|---------|------|
| "Generate New Array" button | `onClick` | `resetArray()` | `src/Sortingvisuals.jsx` |
| "Merge Sort" button | `onClick` | `mergeSort()` | `src/Sortingvisuals.jsx` |
| "Quick Sort" button | `onClick` | `quickSort()` | `src/Sortingvisuals.jsx` |
| "Heap Sort" button | `onClick` | `heapSort()` | `src/Sortingvisuals.jsx` |
| "Test Sorting Algorithms (BROKEN)" button | `onClick` | `testSortingAlgorithms()` | `src/Sortingvisuals.jsx` |

## Test Coverage

### Existing Tests
- **`src/App.test.js`**: Only tests that App renders a link with "learn react" text (CRA default)
- **No tests** for sorting algorithms, visualization, or button interactions

### Build Version Test Feature
- **"Test Sorting Algorithms (BROKEN)" button**: Runs 100 iterations comparing custom sort vs JavaScript native `sort()`, logs results to console
- **Labeled "BROKEN"**: Indicates the test has known issues (likely comparison problems between custom algorithm output and native `sort()`)
- **Not covered by automated tests**: No Jest test coverage for the sorting algorithms

## Build Verification

To verify you're working with the correct version:

```bash
# From project root
npm start

# Observe:
- 310 array bars (not 60)
- 4 sorting algorithm buttons (not 2)
- turquoise default bar color (not cyan/red)
- "Test Sorting Algorithms (BROKEN)" button (not just merge sort)

# Or check the build directly:
cat build/static/js/main.de3fb5d8.chunk.js | grep -c "quickSort\|heapSort\|bubbleSort"
# Should return counts for all 3 additional algorithms
```

## Dependency Versions

| Package | Version | Notes |
|---------|---------|-------|
| react | 16.14.0 | Same in source and build |
| react-dom | 16.14.0 | Same |
| react-scripts | 3.4.3 | Same (CRA v3) |
| @testing-library/jest-dom | 4.2.4 | Same |
| @testing-library/react | 9.5.0 | Same |
| @testing-library/user-event | 7.2.1 | Same |

## Quick Start Commands

```bash
# Start development server (experiences BUILD version)
npm start

# Build for production (confirms build output)
npm run build

# Run tests (limited - only CRA default test)
npm test

# Note: All the above experience the build version, not the source-only version
```