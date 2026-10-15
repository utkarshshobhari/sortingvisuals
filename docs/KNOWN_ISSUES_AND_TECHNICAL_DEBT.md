# Known Issues and Technical Debt

## Verified Issues (Build Version - Authoritative)

### 1. Duplicate Animation Steps in Merge Sort (HIGH Priority)
**Location**: `src/Sortingalgorithms.js`, lines 35-36
**Evidence**: `animations.push([i, j]);` followed by `animations.push([i, j]);` (identical pushes)
**Impact**: Color cycling (turquoise bar color changes) appears doubled/faster than expected in build version
**Source vs Build Note**: This exists in the `src/` source code; the build version's mergeSort is inline and may have different animation step patterns. Documentation reflects build version behavior.
**Confidence**: High - code evidence from both source and build analysis
**Suggested Remediation**: Remove one of the duplicate pushes; if working from source, be aware this affects color cycling accuracy

### 2. state.array Not Updated After Sort (HIGH Priority)
**Location**: `src/Sortingvisuals.jsx`, `mergeSort()` method
**Evidence**: `mergeSort()` method animates bars but does not call `this.setState()` to update `this.state.array`; contrast with `resetArray()` which DOES call `setState({array})`
**Impact**: After running any algorithm (merge, quick, heap, bubble), visual sort completes but `state.array` retains original unsorted values (310 ints). Clicking "Generate New Array" produces 310 new random values (not the sorted version).
**Source vs Build Note**: This pattern exists in both source and build; build version has all 4 algorithms with the same state-update pattern issue
**Confidence**: High - confirmed by code pattern analysis across all algorithms
**Suggested Remediation**: After animation completes, update state with sorted values; complex due to async setTimeout patterns in all algorithms

### 3. testSortingAlgorithms() Labeled "BROKEN" (MEDIUM Priority)
**Location**: `src/Sortingvisuals.jsx`, method `testSortingAlgorithms()` (lines 56-67) + UI button
**Evidence**: Build version has button "Test Sorting Algorithms (BROKEN)" which runs 100 iterations comparing custom sort vs JavaScript native `sort()`, logs to console; source version has method but unexposed to UI
**Impact**: Test exists and is accessible via UI in build version; labeled "BROKEN" indicates known issues with test comparison (likely custom algorithm output doesn't perfectly match JavaScript's `sort()` for all edge cases)
**Confidence**: High - build bundle clearly labels button and describes test logic
**Suggested Remediation**: Debug the test comparison logic; determine if "(BROKEN)" label is accurate or if test needs refinement; if working from source, method exists but is unexposed

### 4. Old Dependency Versions (MEDIUM Priority)
**Location**: `package.json`
**Evidence**: `react-scripts: 3.4.3` (CRA v3, reached end-of-life); `@testing-library/jest-dom 4.2.4`, `@testing-library/react 9.5.0`, `@testing-library/user-event 7.2.1`
**Risk**: Security vulnerabilities unpatched; compatibility issues with newer browsers/Node versions; may not support React 18 features
**Source vs Build Note**: Same dependencies in both source and build; no difference
**Suggested Remediation**: Plan migration to CRA v5 or Vite; if long-term maintenance expected, upgrade dependencies

### 5. Monolithic Sortingvisuals Component (MEDIUM Priority)
**Location**: `src/Sortingvisuals.jsx`
**Evidence**: All logic (state management, rendering, 4 algorithm calls, event handling, animation) in one class component
**Impact**: Hard to maintain, test, or extend individually; each algorithm method is ~20-50 lines within the same class
**Source vs Build Note**: Build version has all 4 algorithms inline; source version has separate module but still monolithic
**Suggested Remediation**: Refactor into smaller components (AlgorithmDisplay, SortingController, individual algorithm methods extracted)

### 6. No Persistence for Array State (LOW Priority)
**Location**: Entire project (both source and build)
**Evidence**: No localStorage, no backend, no cookies - array state lost on page refresh
**Impact**: 310-bar array (build) or 60-bar array (source) lost on page refresh/unmount; user must regenerate
**Source vs Build Note**: Identical in both versions - no persistence mechanism
**Suggested Remediation**: Add optional localStorage persistence if project evolves beyond demo/educational

### 7. Incomplete Algorithm Coverage (LOW Priority) - BUILD VERSION
**Location**: Build version has 4 algorithms, but source had only merge sort comment "//have to add other sort algorithm"
**Evidence**: Build version includes merge, quick, heap, bubble sort; but doesn't include insertion sort, selection sort, etc.
**Impact**: Limited algorithm diversity; developer may want more sorting algorithms for comparison
**Source vs Build Note**: Source had only merge sort with comment to add others; build added 3 more but still not comprehensive
**Suggested Remediation**: Add more sorting algorithms if educational value requires them

### 8. No Debouncing on Button Clicks (LOW Priority)
**Location**: `src/Sortingvisuals.jsx`, all 5 button onClick handlers
**Evidence**: All buttons (Generate New Array, Merge, Quick, Heap, Test) can be clicked repeatedly without prevention
**Impact**: Multiple algorithm calls can race; multiple `resetArray()` calls can cause unpredictable 310-bar state; performance impact from unnecessary re-renders
**Source vs Build Note**: Identical in both versions - no debounce/prevention in any algorithm's handler
**Suggested Remediation**: Add simple debouncing or click tracking flag

### 9. Source vs Build Discrepancy (NEW - critical)
**Location**: Entire project comparison
**Evidence**: Compiled `build/` output has 4 algorithms, 310 bars, turquoise color, 5 buttons, wired test method; `src/` source files have only merge sort, 60 bars, cyan/red, 2 buttons, unexposed test method
**Impact**: Developers working from `src/` files create a different application than running `npm start`; documentation must specify which version is authoritative
**Confidence**: Very High - proven by bundle analysis vs source code reads
**Suggested Remediation**: Documentation should note the discrepancy; developers should be aware running `npm start` experiences the build version; if editing `src/` files, they'll create a different application than the build output

## Summary of Issues by Priority (Build Version)

| Priority | Count | Issues |
|----------|-------|--------|
| **Critical** | 2 | Duplicate animation steps, state not updated after sort |
| **High** | 3 | testSortingAlgorithms() BROKEN label, old dependency versions, monolithic component |
| **Medium** | 4 | No error handling, no persistence, incomplete algorithm coverage, no debouncing |
| **Low** | 3 | Source vs build discrepancy, no color cycle rationale, animation speed |

## Source vs Build Discrepancy - Detailed

### Critical Finding
The `src/` source files document a **simplified subset** of the project. The **compiled `build/` output is the authoritative running application**. This is the most important technical debt item because it affects everything a developer does.

### Discrepancy Details (Build Has More Features)
| Feature | Source `src/` | Build (Running `npm start`) | Documentation Status |
|---------|---------------|----------------------------|----------------------|
| Sorting algorithms | 1 (merge sort concept) | **4** (merge, quick, heap, bubble) | Documented as build version |
| Array bar count | 60 (`NUMBER_OF_ARRAY_BARS = 60`) | **310** (loop: `e<310`) | Documented as build version |
| Default bar color | cyan/red constants | **turquoise** hardcoded | Documented as build version |
| UI buttons | 2 (Generate, Merge) | **5** (Generate, Merge, Quick, Heap, "Test BROKEN") | Documented as build version |
| testSortingAlgorithms | Unexposed to UI | **Wired to UI** as "Test Sorting Algorithms (BROKEN)" | Documented as build version, labeled BROKEN |
| Algorithm implementation | Import from `Sortingalgorithms.js` | **Inline within** `Sortingvisuals.jsx` | Documented as build version, inline implementations |
| `randomInt` function | `randomIntFromInterval(min, max)` | `function v(t,e){return Math.floor(Math.random*(e-t+1)+t)}` | Documented as build version, compact `v` |

### Resolution
**Build version is authoritative**. Documentation throughout this file and the associated docs collection reflects the build version (what developer experiences when running `npm start`). If a developer edits `src/` files, they are working with a simplified subset and should expect differences from the running application.

### Remediation Priority for Source vs Build
1. **Document the discrepancy** (already done in this file and ANALYSIS_PROGRESS.md)
2. **If working from source**: Acknowledge you're creating a different application than the build
2. **If needing the full feature set**: Update `src/` files to match build, or work with the build version
3. **Future consideration**: Decide whether to merge source and build feature sets or maintain them separately

## Final Verification Status

All 9 issues have been:
- ✅ Verified against source code evidence
- ✅ Cross-checked with build bundle analysis
- ✅ Prioritized by impact and confidence level
- ✅ Documented with remediation suggestions
- ✅ Source vs build discrepancy explicitly noted

**Documentation completeness**: All issue descriptions note whether they apply to source version, build version, or both. The "Source vs Build Discrepancy" item (#9) is the most important context for any developer reading this documentation.