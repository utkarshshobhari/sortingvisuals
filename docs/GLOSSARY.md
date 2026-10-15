# Glossary

## Project-Specific Terms (Build Version - Authoritative)

| Term | Definition |
|------|------------|
| `array-bar` | A single visual bar in the sorting visualization. The build version displays **310** bars; the source `src/` version displays **60** bars. |
| `v` | Compact random integer function in the build version: `function v(t,e){return Math.floor(Math.random*(e-t+1)+t)}`. Source version uses `randomIntFromInterval(min, max)`. |
| `ANIMATION_SPEED_MS` | Constant defined as **10** - the delay in milliseconds between each animation step. Applies to all 4 algorithms in the build version. |
| `NUMBER_OF_ARRAY_BARS` | In the **source** version: constant defined as **60**. In the **build** version: loop runs **310** times (no constant named NUMBER_OF_ARRAY_BARS visible in build output). |
| `PRIMARY_COLOR` | Defined in **source** version as `'cyan'`. Not explicitly visible in the **build** version, which hardcodes **"turquoise"** as the default bar color. |
| `SECONDARY_COLOR` | Defined in **source** version as `'red'`. Not explicitly used in the **build** version's color scheme. |
| `mergeSort()` | Build version: **inline method** within `Sortingvisuals.jsx` class. Source version: imports `getMergeSortAnimations()` from separate `Sortingalgorithms.js` module. |
| `quickSort()` | **Build version only**: inline method within `Sortingvisuals.jsx` class. Not present in source version. |
| `heapSort()` | **Build version only**: inline method within `Sortingvisuals.jsx` class. Not present in source version. |
| `bubbleSort()` | **Build version only**: inline method within `Sortingvisuals.jsx` class. Not present in source version. |
| `testSortingAlgorithms()` | **Build version**: method wired to UI button labeled "Test Sorting Algorithms (BROKEN)". Source version: method exists at lines 56-67 but **unexposed** to UI. |
| `BROKEN` | Label appended to "Test Sorting Algorithms" button in the **build version**, indicating the test has known issues with comparing custom algorithm output vs JavaScript native `sort()`. |
| `turquoise` | **Build version** default bar color (hardcoded). Source version uses `PRIMARY_COLOR = 'cyan'` and `SECONDARY_COLOR = 'red'` constants. |
| `quickSort()` | **Build version only**: pivot-based partitioning sorting algorithm visualized with animations. Not in source version. |
| `heapSort()` | **Build version only**: heap-based sorting algorithm O(n log n) visualized with animations. Not in source version. |
| `bubbleSort()` | **Build version only**: repeated swap algorithm O(n²) visualized with animations. Not in source version. |
| `Generate New Array` | **Build version**: generates **310** random bars (5-730px). Source version: generates **60** random bars. |
| `Merge Sort` | **Both versions**: divide-and-conquer O(n log n) sorting algorithm visualized with animations. Implementation differs (inline build vs module import source). |
| `Algorithm Testing` | **Build version**: "Test Sorting Algorithms (BROKEN)" button runs 100 iterations, console.log results. Source version: method exists but unexposed; no UI button. |

## General Terms (Same in Both Versions)

| Term | Standard Definition |
|------|-------------------|
| SPA | Single Page Application - a web app that interacts with the user by dynamically rewriting the current page rather than loading new pages from a server. |
| React | A JavaScript library for building user interfaces, maintained by Facebook/Meta. |
| Merge Sort | An O(n log n) sorting algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves back together. |
| NodeList | A collection of nodes (as returned by `document.getElementsByClassName()`), live or static depending on the method used. |
| setTimeout | A browser API that executes a function after a specified number of milliseconds. |
| React State | The built-in data mechanism in React components that triggers re-renders when updated. |
| CRA | Create React App - the build toolchain used for this project (version 3.4.3). |
| jsdom | The test environment used by Jest for running React component tests in a simulated DOM. |

## Source vs Build Disambiguation

**Important**: This glossary primarily documents the **build version** (authoritative running application experienced when running `npm start`). 

**If working from source `src/` files**, note these disambiguation points:

| Term | Build Version | Source `src/` Version |
|------|---------------|----------------------|
| Algorithm count | 4 (merge, quick, heap, bubble) | 1 (merge sort only) |
| Array bar count | 310 | 60 |
| Default color | turquoise | cyan/red constants |
| UI button count | 5 | 2 |
| testSortingAlgorithms | Wired to UI as "(BROKEN)" | Unexposed to UI |
| Algorithm implementation | Inline within Sortingvisuals.jsx | Import from Sortingalgorithms.js |
| randomInt function | `v(t,e)` compact function | `randomIntFromInterval(min, max)` |

**Examples in this glossary**: Unless noted otherwise, examples and definitions reflect the build version. When source version differences are significant, they are noted in the table above.

## Version Notes

- **Build version**: Experienced by running `npm start`; includes all 4 algorithms, 310 bars, turquoise color, 5 buttons, "BROKEN" test label
- **Source `src/` version**: Simplified subset; 1 algorithm (merge), 60 bars, cyan/red, 2 buttons, test method unexposed
- **Documentation version**: This glossary reflects the build version unless otherwise noted