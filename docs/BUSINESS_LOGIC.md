# Business Logic Documentation

## Overview
This section documents the business rules, calculations, state transitions, and validations implemented in the Sorting Visualizer application. Since this is a learning/demo project, the business logic is primarily educational and focused on algorithm visualization.

## Core Business Rules

### 1. Merge Sort Algorithm
**Reference**: `src/Sortingalgorithms.js` - `getMergeSortAnimations()` function

**Description**: Implements the classic merge sort divide-and-conquer algorithm. The array is recursively split into halves until single elements remain, then merged back together in sorted order.

**Key Rules**:
- **Divide**: Split array at middle index: `middleIdx = Math.floor((startIdx + endIdx) / 2)`
- **Conquer**: Recursively sort left and right halves
- **Combine**: Merge two sorted halves into one sorted array

**Algorithm Steps** (as documented in animations):
- `mergeSortHelper()` recursively splits the array
- `doMerge()` combines two sorted subarrays
- Each comparison and swap generates animation steps

**Edge Cases**:
- Empty array (length 0): Returns array as-is (line 3: `if (array.length <= 1) return array`)
- Single element array (length 1): Returns array as-is (base case in `mergeSortHelper`)

**Correctness Guarantee**: Merge sort is guaranteed O(n log n) and stable (preserves relative order of equal elements).

### 2. Random Array Generation
**Reference**: `src/Sortingvisuals.jsx` - `randomIntFromInterval()` and `resetArray()`

**Description**: Generates a new array of 60 random integers for visualization.

**Key Rules**:
- **Count**: Always exactly 60 bars (`NUMBER_OF_ARRAY_BARS = 60`)
- **Range**: Each value between 5 and 730 pixels inclusive (`randomIntFromInterval(5, 730)`)
- **Inclusive**: Both minimum (5) and maximum (730) values can be generated
- **Distribution**: Uniform random distribution across the range

**Function**:
```javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

### 3. Animation Step Cycle
**Reference**: `src/Sortingvisuals.jsx` - `mergeSort()` method

**Description**: The 3-step color/height cycle that provides visual feedback during merge sort.

**Key Rules**:
- **Step pattern** (index `i` modulo 3):
  - `i % 3 === 0`: Color change to `SECONDARY_COLOR` (red) - "this is being compared"
  - `i % 3 === 1`: Color change back to `PRIMARY_COLOR` (cyan) - "comparison complete"
  - `i % 3 === 2`: Height update - "value moved to this position"
- **Two color-change entries per comparison**: The animations array pushes two entries for each comparison (lines 35-36 in Sortingalgorithms.js):
  ```
  animations.push([i, j]);  // First entry
  animations.push([i, j]);  // Second entry (same indices)
  ```
  This appears to be a quirk/bug where each comparison generates duplicate animation steps.

- **Animation delay**: Each step `i` is delayed by `i * ANIMATION_SPEED_MS` (10ms per step)
  - Step 0: 0ms delay
  - Step 1: 10ms delay
  - Step 2: 20ms delay
  - ...
  - Step n: n * 10ms delay

### 4. Color Coding During Sort
**Reference**: `src/Sortingvisuals.jsx` - `mergeSort()` method, lines 35-44

**Key Rules**:
- **`SECONDARY_COLOR`**: `'red'` - used when bars are being compared/selected
- **`PRIMARY_COLOR`**: `'cyan'` - default bar color, used when not being compared
- **Color determination logic**:
  ```javascript
  const isColorChange = i % 3 !== 2;
  const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
  ```
- **Color change applies to both bars**: Both `barOneStyle` and `barTwoStyle` are updated simultaneously

### 5. Height Update Logic
**Reference**: `src/Sortingvisuals.jsx` - `mergeSort()` method, lines 45-51

**Key Rules**:
- **Only every third animation step** (`i % 3 === 2`) updates bar heights
- **Height value from animation**: Each height-update step is `[barIndex, newHeight]`
- **DOM manipulation**: `barOneStyle.height = \`${newHeight}px\``
- **Timing**: `setTimeout(() => {...}, i * ANIMATION_SPEED_MS)`

### 6. Sort Completion
**Reference**: `src/Sortingvisuals.jsx` - `mergeSort()` method

**Key Rules**:
- After all animation steps complete, the bars should be in sorted order (ascending)
- The algorithm sorts by modifying bar heights to reflect the merge sort process
- No explicit "sort complete" event or state change
- Bars remain in whatever order the algorithm ended with

## State Transitions

| From State | Trigger | To State | Description |
|------------|---------|----------|-------------|
| Initial state | `componentDidMount()` | Array state populated | `resetArray()` generates 60 random values |
| Array state | User clicks "Generate New Array" | New array state | `resetArray()` regenerates random values |
| Array state | User clicks "Merge Sort" | Same array state | Bars animate; `state.array` unchanged |
| Any state | Page refresh / navigation | Initial state | React re-mounts, new random array |

## Calculations and Formulas

### Random Integer Generation
```
randomIntFromInterval(min, max) = Math.floor(Math.random() * (max - min + 1) + min)
```
- For this app: `randomIntFromInterval(5, 730)`
- Result: Integer in [5, 730] inclusive
- Formula: `floor(random() * (730 - 5 + 1) + 5)` = `floor(random() * 726 + 5)`

### Animation Delay
```
delayMs = i * ANIMATION_SPEED_MS
```
- Where `i` = animation step index (0, 1, 2, ...)
- `ANIMATION_SPEED_MS` = 10
- Total animation time = `animations.length * 10ms`

### Array Height Rendering
```
DOM element height = `${array[i]}px`
```
- Where `array[i]` is the i-th element of the state array
- Minimum rendered height: 5px
- Maximum rendered height: 730px

## Edge Cases and Invalid Inputs

### Known Edge Cases in Code

1. **Empty array in merge sort**:
   ```javascript
   if (array.length <= 1) return array;
   ```
   - If called with empty array `[]`, returns `[]`
   - If called with single element `[5]`, returns `[5]`

2. **Array of 60 elements with many equal values**:
   - Merge sort is stable, so equal values maintain relative order
   - Visual may show many bars at same height

3. **User clicks "Merge Sort" multiple times**:
   - No debouncing or prevention
   - Each click starts a new animation sequence
   - May cause overlapping animations

4. **Rapid clicking "Generate New Array"**:
   - Each click generates new random values
   - No rate limiting
   - State updates are batched by React

### Invalid Inputs (Not Handled)
- Non-array input to `getMergeSortAnimations()`
- Arrays with non-numeric values
- Negative array lengths
- These would cause runtime errors but are not guarded against

## Known Business Logic Issues

### Issue: Duplicate Animation Steps
**Location**: `src/Sortingalgorithms.js`, lines 35-36
```javascript
animations.push([i, j]);
animations.push([i, j]);
```
**Description**: Each comparison pushes the same indices twice to the animations array. This causes the color-change animation to run twice as many steps as intended, potentially making the sort appear faster or the color cycling irregular.

**Impact**: Visual artifact - the red/color cycling may appear doubled. The sort still works correctly for the height updates, but the color animation is affected.

**Confidence**: High - clearly intentional duplicate pushes with same values

### Issue: state.array Not Updated After Sort
**Location**: `src/Sortingvisuals.jsx`, `mergeSort()` method
**Description**: The `mergeSort()` method animates the bars but does not update `this.state.array` to reflect the sorted order. The array state remains as the original unsorted values.

**Impact**: After running merge sort, if user clicks "Generate New Array", they get a new random array (not the sorted version). The visualized sort is not persisted in state.

**Confidence**: High - `this.state.array` is only set in `resetArray()`, never in `mergeSort()`

### Issue: testSortingAlgorithms Not Exposed to UI
**Location**: `src/Sortingvisuals.jsx`, method `testSortingAlgorithms()` (line 56-67)
**Description**: A comprehensive test method exists that runs 100 iterations comparing merge sort output against JavaScript's native `array.sort()`, but it is never called from the UI or any event handler.

**Impact**: No automated test coverage for the merge sort implementation during normal use. The method exists but is dead code from a user perspective.

**Confidence**: High - method exists but has no UI bindings

## Summary of Business Rules

| Rule | Reference | Priority |
|------|-----------|----------|
| Generate 60 random bars (5-730px) | `resetArray()` | Critical |
| Merge sort with animation steps | `getMergeSortAnimations()` | Critical |
| Color cycle: red/red/cyan pattern | `mergeSort()` method | Important |
| Height updates every 3rd step | `mergeSort()` method | Important |
| state.array not modified by mergeSort | Implementation detail | Medium |
| testSortingAlgorithms() exists but UI-unused | Method exists | Low |
| Duplicate animation steps (lines 35-36) | `Sortingalgorithms.js` | Medium |