# Testing Guide

## Testing Framework
- **Framework**: Jest (via react-scripts 3.4.3)
- **Test Runner**: `react-scripts test`
- **Assertion Library**: Jest built-in + `@testing-library/jest-dom` custom matchers
- **Test Environment**: jsdom (simulated DOM)

## Test Configuration

### `package.json` Scripts
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Test Setup (`src/setupTests.js`)
- Imports `@testing-library/jest-dom/extend-expect`
- Adds custom matchers like `toBeInTheDocument()`
- Configures Jest-JSDOM environment

## Existing Test Coverage

### Current Tests (Build Version)

| Test File | What It Tests | Status |
|-----------|---------------|--------|
| `src/App.test.js` | Renders learn React link in App component | ✅ Passing (CRA default) |

### Test Coverage Summary (Build Version)
- **Total test files**: 1
- **Total tests**: 1 (individual `it` block in App.test.js)
- **Coverage percentage**: Not configured/measurement
- **Feature logic coverage**: 

#### Build Version Specifics
The build version introduces a new test feature:

**"Test Sorting Algorithms (BROKEN)" Button**
- **Location**: `src/Sortingvisuals.jsx` - 5th UI button
- **Function**: Runs 100 iterations comparing custom sort algorithms against JavaScript native `sort()`
- **Results**: `console.log()` output of boolean equality for each iteration
- **Label**: "(BROKEN)" - indicates known issues with test comparison
- **Test Data**: 
  - Generates random arrays per iteration
  - Length: random 1-1000 items per iteration
  - Values: -1000 to 1000 range per iteration
  - Comparison: custom algorithm output vs JavaScript's native `array.sort((a, b) => a - b)`
- **Expected Output**: `console.log` results for 100 iterations
- **Known Issues**: "(BROKEN)" label suggests test has problems; results may be inconsistent or incorrect for certain edge cases

**Note**: This test is **accessible via UI button only**, not via Jest test runner. It's a runtime debug tool, not an automated test.

### Build Version vs Source Version Test Differences

| Aspect | Source `src/` Version | Build Version |
|--------|----------------------|---------------|
| testSortingAlgorithms() exposure | Method exists at lines 56-67, **unexposed** to UI | **Wired to UI button** "Test Sorting Algorithms (BROKEN)" |
| Test access method | Jest test runner only (if added) | **UI button** in the running application |
| Test purpose | Unknown (not wired) | 100 iterations vs native sort, console.log results |
| Test label | N/A | "(BROKEN)" - known issues indicated |
| Test results | N/A | Logged to browser console |

## How to Run Tests

### Run Test Suite Once (CI mode)
```bash
npm test -- --watchAll=false
```

### Run Tests in Watch Mode (default)
```bash
npm test
```
- Launches Jest in watch mode
- Re-runs on file changes
- Press `a` to run all tests, `u` to update snapshots

### Run Specific Test File
```bash
npm test -- --testPathPattern=App.test.js
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```
- Generates coverage report in `coverage/` directory
- Shows percentage of code covered by tests

## Important Test Scenarios

### Currently Missing Tests (High Priority)

1. **Sorting algorithm correctness** (Build Version)
   - The build version has "Test Sorting Algorithms (BROKEN)" button
   - No automated Jest tests for algorithm correctness
   - The "(BROKEN)" label indicates the test has known issues
   - **Suggestion**: Debug the test comparison logic; may need to fix before relying on results

2. **Component state management (Build Version)**
   - Test `resetArray()` produces 310-element array (not 60 as in source)
   - Test state updates after button clicks (all 5 buttons)
   - Test initial render shows 310 bars on mount

3. **Algorithm animation format validation (Build Version)**
   - Verify each algorithm's animation steps have valid structure
   - 4 algorithms each have different step patterns
   - No tests for step format across any algorithm

4. **Button click handlers (Build Version)**
   - Test all 5 buttons fire correct methods
   - "Generate New Array" → resetArray → 310 new random values
   - "Merge Sort" → mergeSort → animation
   - "Quick Sort" → quickSort → animation
   - "Heap Sort" → heapSort → animation
   - "Bubble Sort" → bubbleSort → animation
   - "Test Sorting Algorithms (BROKEN)" → testSortingAlgorithms → console.log

5. **Color coding logic (Build Version)**
   - Verify turquoise bar color changes at correct steps
   - Build version may have different color scheme than source (turquoise vs cyan/red)
   - No tests for color cycle across any algorithm

### Low Priority Tests
- UI styling/CSS class applications (310 bars vs 60 bars)
- Service worker registration (already tested by CRA)
- Build output validation

## Critical Missing Test Cases (Build Version)

| Test Scenario | Why It's Missing | Risk if Not Tested |
|---------------|------------------|-------------------|
| Merge sort algorithm correctness | "BROKEN" label on test button | Sorting could be broken without automated detection |
| Quick sort algorithm correctness | No automated tests for any algorithm | Same risk; all 4 algorithms unverified |
| Heap sort algorithm correctness | Same as above | Same risk |
| Bubble sort algorithm correctness | Same as above | Same risk |
| Animation step format | No tests for any algorithm's steps | UI rendering could fail silently |
| Color cycle logic | No tests for color changes | Visual feedback could be broken |
| All 5 button functionality | No event handler tests | UI interactions unverified |
| 310-bar array initial load | Source has 60; build has 310 | Wrong bar count could go unnoticed |

## Running the "Test Sorting Algorithms (BROKEN)" Feature

### Via User Interface (Build Version Only)
1. Start the app: `npm start`
2. Observe 310 array bars with turquoise default color
3. Click the **"Test Sorting Algorithms (BROKEN)"** button
4. Open browser DevTools → Console
5. View 100 test iteration results logged to console
6. Note: Results may vary; "(BROKEN)" label indicates known issues

### Via Jest Test Runner (Not Recommended)
The "Test Sorting Algorithms (BROKEN)" functionality is **not designed for Jest testing**. It's a runtime UI feature. Attempting to test it with Jest would require:
- Simulating button clicks
- Capturing console.log output
- Replicating the 100-iteration loop
- But this would be an artificial test - the feature is meant for manual debugging via the UI

## Recommended Test Additions (Build Version)

To adequately test the sorting visualization (build version with 4 algorithms, 310 bars), add these test files:

1. **`src/Sortingvisuals.test.js`**
   - Test `resetArray()` produces 310-element array
   - Test all 5 button click handlers fire correct methods
   - Test render output matches expected structure (310 .array-bar elements)

2. **`src/Sortingalgorithms.test.js`** (if needed)
   - Test individual algorithm correctness (if not "BROKEN")
   - Note: Build version's testSortingAlgorithms() is labeled BROKEN, suggesting issues

3. **Integration test** (if using Cypress/Playwright)
   - End-to-end button click verification
   - Verify 310 bars animate during each algorithm
   - Verify "Generate New Array" produces new 310 bars

## Test Commands Summary

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm test` | Run tests in watch mode | Development, active testing |
| `npm test -- --watchAll=false` | Run tests once | CI/CD, final verification |
| `npm test -- --coverage` | Run tests with coverage | Measuring test coverage |
| `npm test -- --testPathPattern=App.test.js` | Run specific test file | Quick verification |

## Notes
- No test environment variables need configuration
- Tests run in Jest's DOM environment (jsdom)
- All tests are client-side (no Node.js specific tests)
- The "BROKEN" test feature is UI-only; not automatable via Jest in a meaningful way
- Build version has 310 bars; source version documentation should note 60 if working from source

## Final Testing Guidance

**For developers working with the build version**:
- Start with `npm start` and manually verify the 5 buttons work
- Click "Test Sorting Algorithms (BROKEN)" and check console output
- Note the "(BROKEN)" label - results may not be reliable
- Consider the 4 algorithms unverified without automated test coverage

**For developers working from source `src/` files**:
- You have 60 bars, not 310
- You have 2 buttons, not 5
- testSortingAlgorithms() is unexposed to UI
- cyan/red color scheme, not turquoise
- Only merge sort algorithm (no quick/heap/bubble)
- Documentation marked "build version" does not apply directly

**SUCCESS**: A developer can run `npm start`, click the "Test Sorting Algorithms (BROKEN)" button, and see 100 test iteration results in the console, understanding that the "(BROKEN)" label indicates the test has known issues that may affect result reliability.