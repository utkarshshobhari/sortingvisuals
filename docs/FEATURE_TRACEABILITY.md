# Feature Traceability Map

## Overview
This document maps every major feature in the Sorting Visualizer project to its implementation artifacts: user interface components, routes, controllers, services, database models, external integrations, and tests.

## Merge Sort Visualization Feature

| Traceability Field | Details |
|-------------------|---------|
| **Feature Name** | Merge Sort Visualization |
| **UI Components** | `src/Sortingvisuals.jsx` - Main component rendering 60 `.array-bar` elements |
| **Routes / Entry Points** | N/A - Single page application, no routing |
| **Controllers / Handlers** | `src/Sortingvisuals.jsx` - `mergeSort()` method triggered by button click |
| **Services** | `src/Sortingalgorithms.js` - `getMergeSortAnimations()` function |
| **Database Models** | N/A - In-memory React state only (`this.state.array`) |
| **External Integrations** | None |
| **Tests** | `src/App.test.js` (generic CRA test only) - no tests for sorting functionality |
| **Related Documentation** | `docs/WORKFLOW_DOCUMENT.md` (Feature 3), `docs/BUSINESS_LOGIC.md` (Rule 1), `docs/API_DOCUMENTATION.md` (internal contracts) |

### UI Component Details
- **File**: `src/Sortingvisuals.jsx`
- **Component Class**: `Sortingvisuals` (extends `React.Component`)
- **Rendered Elements**: 60 `<div className="array-bar">` elements
- **State Variable**: `this.state.array` (60 integers, 5-730 range)
- **Buttons**: "Generate New Array" (`resetArray()`), "Merge Sort" (`mergeSort()`)

### Route/Entry Point Details
- **No routes exist** - This is a SPA with no React Router or custom routing
- **Primary entry**: `public/index.html` → `src/index.js` → `ReactDOM.render(<App />, ...)`
- **App component**: `src/App.js` renders `<Sortingvisuals />`
- **Initial load**: `componentDidMount()` → `resetArray()` auto-generates array

### Controller/Handler Details
- **mergeSort() handler** (in `Sortingvisuals.jsx`):
  - Trigger: User clicks "Merge Sort" button
  - Input: `this.state.array` (60 integers)
  - Process: Calls `getMergeSortAnimations(this.state.array)` from algorithm module
  - Output: Animated DOM updates (heights and colors change over time via setTimeout)
  - State change: None - `this.state.array` remains unchanged after sort

- **resetArray() handler** (in `Sortingvisuals.jsx`):
  - Trigger: User clicks "Generate New Array" button
  - Input: None
  - Process: Generates 60 random integers via `randomIntFromInterval(5, 730)`
  - Output: `this.setState({array: newArray})` triggers re-render with new bar heights
  - State change: `this.state.array` updated with new random values

### Service Details
- **getMergeSortAnimations(array)** (in `Sortingalgorithms.js`):
  - **Export**: Yes (only exported function)
  - **Input**: `array` - array of numbers to sort
  - **Output**: `animations` - array of animation step pairs
  - **Step types**:
    - `[i, j]` - Two indices to highlight (color change)
    - `[k, value]` - Index and value for height update
  - **Algorithm**: Classic merge sort with auxiliary array
  - **Helper functions** (not exported):
    - `mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations)`
    - `doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)`

### Database Model Details
- **No database** - This project has no persistent storage
- **Data source**: `this.state.array` in `Sortingvisuals` component state
- **Array properties**:
  - Length: Always 60 (`NUMBER_OF_ARRAY_BARS`)
  - Value range: 5-730 pixels (`randomIntFromInterval(5, 730)`)
  - Persistence: None - lost on page refresh or component unmount
- **Individual bar mapping**: Bar at index `i` corresponds to `array[i]` pixels height

### External Integration Details
- **Zero external integrations** - This is a completely self-contained frontend application
- **No API calls** - No `fetch()`, `axios`, or other HTTP requests
- **No third-party services** - No authentication, no analytics, no storage
- **No WebSockets** - Real-time communication not used
- **No localStorage** - Not implemented (would need to be added)

### Test Coverage Details
- **Test file**: `src/App.test.js`
- **Test content**: Verifies App component renders "learn react" text
- **Test coverage for sorting**: 0%
- **Missing test files**: 
  - No `Sortingalgorithms.test.js`
  - No `Sortingvisuals.test.js`
  - No integration tests for button clicks
  - No algorithm correctness tests

## Generate New Array Feature

| Traceability Field | Details |
|-------------------|---------|
| **Feature Name** | Generate New Array |
| **UI Components** | `src/Sortingvisuals.jsx` - "Generate New Array" button + `resetArray()` method |
| **Routes / Entry Points** | N/A - Same SPA entry as all features |
| **Controllers / Handlers** | `src/Sortingvisuals.jsx` - `resetArray()` method |
| **Services** | N/A - Pure client-side random generation |
| **Database Models** | N/A - In-memory state only |
| **External Integrations** | None |
| **Tests** | None exist |
| **Related Documentation** | `docs/WORKFLOW_DOCUMENT.md` (Feature 2), `docs/BUSINESS_LOGIC.md` (Rule 2) |

### UI Component Details
- **Button element**: `<button onClick={() => this.resetArray()}>Generate New Array</button>`
- **Render location**: Inside `Sortingvisuals.jsx` `render()` method, within `.array-container`
- **Label**: "Generate New Array" (visible text)

### Controller/Handler Details
- **resetArray() method** (in `Sortingvisuals.jsx`):
  - Trigger: Button click event
  - Input: None (uses internal constants)
  - Process:
    1. Creates empty `array = []`
    2. Loops 60 times (`NUMBER_OF_ARRAY_BARS`)
    3. Each iteration: `array.push(randomIntFromInterval(5, 730))`
    4. `this.setState({array})` triggers React re-render
  - Output: New 60-element array with random heights in state
  - State change: `this.state.array` fully replaced with new random values

## Algorithm Testing Feature

| Traceability Field | Details |
|-------------------|---------|
| **Feature Name** | Algorithm Testing (debug/test mode) |
| **UI Components** | `src/Sortingvisuals.jsx` - `testSortingAlgorithms()` method (not wired to UI) |
| **Routes / Entry Points** | N/A - Not accessible via UI |
| **Controllers / Handlers** | `src/Sortingvisuals.jsx` - `testSortingAlgorithms()` method (dead code from UI perspective) |
| **Services** | `src/Sortingalgorithms.js` - Used for comparison against JavaScript native `sort()` |
| **Database Models** | N/A |
| **External Integrations** | None |
| **Tests** | None - method exists but is untested itself |
| **Related Documentation** | `docs/BUSINESS_LOGIC.md` (Issue 3), `docs/TESTING_GUIDE.md` |

### Method Details
- **testSortingAlgorithms()** (in `Sortingvisuals.jsx`, lines 56-67):
  ```javascript
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  ```
  - **Loop**: 100 iterations
  - **Array length**: Random 1-1000 elements per iteration
  - **Array values**: -1000 to 1000 range
  - **Comparison**: Merge sort output vs JavaScript native `sort()`
  - **Result**: `console.log()` of boolean equality
  - **Helper**: `arraysAreEqual()` function (lines 95-103)

- **Note**: This method is **not wired to any UI element**. There is no button, menu item, or event handler that calls it. It exists as internal/debug code.

## Color Coding Feature

| Traceability Field | Details |
|-------------------|---------|
| **Feature Name** | Color-Coded Animation Feedback |
| **UI Components** | `src/Sortingvisuals.jsx` - Color logic in `mergeSort()` method |
| **Routes / Entry Points** | N/A |
| **Controllers / Handlers** | `src/Sortingvisuals.jsx` - Color determination based on animation step index |
| **Services** | N/A - Pure client-side color logic |
| **Database Models** | N/A |
| **External Integrations** | None |
| **Tests** | None |
| **Related Documentation** | `docs/WORKFLOW_DOCUMENT.md` (Animation cycle), `docs/BUSINESS_LOGIC.md` (Rule 3) |

### Color Logic Details
- **Determinant**: Animation step index `i` modulo 3 (`i % 3`)
- **Color patterns**:
  - `i % 3 === 0`: `SECONDARY_COLOR` (red) - bars being compared
  - `i % 3 === 1`: `PRIMARY_COLOR` (cyan) - reset after comparison
  - `i % 3 === 2`: Height update (no color change)
- **Two bars affected per color step**: Both `barOneStyle` and `barTwoStyle` are updated simultaneously
- **Animation cycle**: The 3-step pattern repeats for the duration of the sort

### Color Constants
- **PRIMARY_COLOR**: `'cyan'` - default bar color (defined as constant at top of `Sortingvisuals.jsx`)
- **SECONDARY_COLOR**: `'red'` - comparison color (defined as constant at top of `Sortingvisuals.jsx`)

## Summary of Feature Coverage

| Feature | UI Mapped | Service Mapped | DB Mapped | Tests Mapped | Documentation |
|---------|-----------|----------------|-----------|--------------|---------------|
| Merge Sort Visualization | ✅ | ✅ | ❌ | ❌ | ✅ |
| Generate New Array | ✅ | ❌ | ❌ | ❌ | ✅ |
| Algorithm Testing | ⚠️ (dead code) | ⚠️ (internal use) | ❌ | ❌ | ✅ |
| Color Coding | ✅ | ❌ | ❌ | ❌ | ✅ |
| Random Generation | ✅ | ❌ | ❌ | ❌ | ✅ |

✅ = Fully mapped and documented
⚠️ = Partially mapped (dead code or internal only)
❌ = Not mapped (no implementation or coverage)