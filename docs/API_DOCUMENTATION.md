# API Documentation

## Overview
This is a pure frontend application with **no backend API**. All functionality runs client-side in the browser. There are no HTTP endpoints, no server-side routes, and no external API integrations.

## Application Entry Points

### HTML Entry
- **File**: `public/index.html` (development), `build/index.html` (production)
- **Purpose**: Serves the React application
- **Method**: HTTP GET
- **Authentication**: None
- **Response**: HTML document with embedded React app

### JavaScript Entry
- **File**: `src/index.js`
- **Purpose**: Renders React component to DOM
- **Method**: Called automatically on page load
- **Authentication**: N/A

## Internal Module Contracts

### `getMergeSortAnimations(array)`
- **File**: `src/Sortingalgorithms.js`
- **Export**: `getMergeSortAnimations`
- **Purpose**: Generate animation steps for merge sort visualization
- **Input**: `array` - Array of integers to sort
- **Returns**: Array of animation steps, each step is either:
  - `[i, j]` - Two indices to highlight (color change)
  - `[k, value]` - Index and value to update (height change)
- **Algorithm**: Classic merge sort with auxiliary array
- **Complexity**: O(n log n) time, O(n) space
- **Validation**: Returns input array as-is if length ≤ 1

### `mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations)`
- **File**: `src/Sortingalgorithms.js`
- **Internal**: Not exported
- **Purpose**: Recursive helper for merge sort
- **Parameters**:
  - `mainArray`: Array being sorted
  - `startIdx`: Start index of subarray
  - `endIdx`: End index of subarray
  - `auxiliaryArray`: Temporary array for merging
  - `animations`: Array to collect animation steps
- **Base Case**: Returns when `startIdx === endIdx`

### `doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)`
- **File**: `src/Sortingalgorithms.js`
- **Internal**: Not exported
- **Purpose**: Merge two sorted subarrays
- **Parameters**:
  - `mainArray`: Target array
  - `startIdx`: Start of left subarray
  - `middleIdx`: End of left subarray
  - `endIdx`: End of right subarray
  - `auxiliaryArray`: Source array for merge
  - `animations`: Animation steps collector

### `resetArray()`
- **File**: `src/Sortingvisuals.jsx`
- **Method**: Instance method of Sortingvisuals component
- **Purpose**: Generate new random array and update state
- **Input**: None
- **Output**: Updates `this.state.array` with 60 random integers (range 5-730)

### `mergeSort()`
- **File**: `src/Sortingvisuals.jsx`
- **Method**: Instance method of Sortingvisuals component
- **Purpose**: Sort current array with animated visualization
- **Input**: None (uses `this.state.array`)
- **Output**: Animated DOM updates (no state change after sort)
- **Side Effects**: Modifies DOM elements directly (heights, colors)

### `testSortingAlgorithms()`
- **File**: `src/Sortingvisuals.jsx`
- **Method**: Instance method of Sortingvisuals component
- **Purpose**: Test merge sort correctness (debug only)
- **Input**: None
- **Output**: Console.log results (100 test iterations)
- **Note**: Not wired to UI

## Component Props and State

### Sortingvisuals Component
- **Props**: None (no props passed)
- **State**: `{array: number[]}` - 60 integers

### App Component
- **Props**: None
- **Renders**: `<Sortingvisuals />`

## Event Handling

| Element | Event | Handler | File |
|---------|-------|---------|------|
| `.array-bar` (rendered) | None | N/A | `Sortingvisuals.jsx` |
| "Generate New Array" button | `onClick` | `resetArray()` | `Sortingvisuals.jsx` |
| "Merge Sort" button | `onClick` | `mergeSort()` | `Sortingvisuals.jsx` |

## Animation Protocol

The merge sort animation uses a 3-step cycle:
1. **Step 0** (`i % 3 === 0`): Set two bars to `SECONDARY_COLOR` (red) - indicating comparison
2. **Step 1** (`i % 3 === 1`): Set two bars back to `PRIMARY_COLOR` (cyan) - reset colors
3. **Step 2** (`i % 3 === 2`): Update one bar's height - indicating value placement

Each step is scheduled with `setTimeout` at `i * ANIMATION_SPEED_MS` (10ms per step).

## Error Handling
- No HTTP error responses (no backend)
- No API error handling (no external calls)
- No try/catch blocks in application code
- No error boundaries in React components

## Request/Response Examples
Not applicable - no HTTP APIs exist in this project.