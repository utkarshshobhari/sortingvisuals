# Project Overview

## Purpose
Sorting visualizer application that demonstrates multiple sorting algorithms (merge sort, quick sort, heap sort, bubble sort) by visualizing the sorting process as animated array bars. Users can generate new random arrays and watch any of the four sorting algorithms sort them.

## Purpose Note
**IMPORTANT**: This documentation reflects the compiled application (build output in `build/`), which is the authoritative version a developer experiences when running `npm start`. The source files in `src/` appear to be a simplified/older version missing several features present in the running application. See the "Source vs Build Discrepancy" section in ANALYSIS_PROGRESS.md for full details.

## What the Developer Experiences (Build Version)
When running `npm start`, the developer sees:
- **4 sorting algorithms** to choose from (merge, quick, heap, bubble)
- **310 array bars** with random heights (5-730px)
- **5 control buttons** (Generate New Array, Merge Sort, Quick Sort, Heap Sort, Test Sorting Algorithms)
- **Turquoise-colored** default bars

## Purpose
Educational tool for visualizing and comparing common sorting algorithms. Students and developers can observe how different algorithms perform visually on the same array of bars, with color-coded animation steps.

## Features (Build Version - Authoritative)

| Feature | Description |
|---------|-------------|
| **Merge Sort Visualization** | Classic divide-and-conquer sorting algorithm visualized bar-by-bar with animation steps |
| **Quick Sort Visualization** | Fast sorting algorithm using pivot-based partitioning, visualized with animations |
| **Heap Sort Visualization** | Comparison-based sorting algorithm using heap data structure, visualized with animations |
| **Bubble Sort Visualization** | Simple comparison-swap sorting algorithm, visualized bar-by-bar with animations |
| **Random Array Generation** | Generate 310 arrays with random heights (values 5-730) |
| **Manual Sort Control** | Click any sorting algorithm button to watch the algorithm sort the current array |
| **Regenerate Array** | Click "Generate New Array" to create a new random array of 310 bars |
| **Color-Coded Animation** | Bars change color during sorting steps (turquoise default, color changes during comparisons) |
| **Algorithm Testing** | "Test Sorting Algorithms (BROKEN)" button runs 100 test iterations comparing custom sort vs JavaScript native `sort()`, results logged to console |

## Intended Users
- Students learning about sorting algorithms and their visual differences
- Developers exploring React animation patterns and algorithm implementations
- Anyone interested in visualizing and comparing multiple sorting algorithms

## Core Features (Build Version)

| Feature | Description |
|---------|-------------|
| **Merge Sort** | Classic O(n log n) divide-and-conquer algorithm visualized bar-by-bar |
| **Quick Sort** | Average O(n log n) divide-and-conquer algorithm using pivot partitioning |
| **Heap Sort** | O(n log n) comparison-based algorithm using heap data structure |
| **Bubble Sort** | Simple O(n²) algorithm that repeatedly steps through the list, compares adjacent elements |
| **Array Generation** | Automatic generation of 310 bars with random heights (range: 5-730 pixels) |
| **Sort Visualization** | Each algorithm animates differently; bars change color and position during sorting |
| **Array Regeneration** | "Generate New Array" creates 310 new random bar heights |
| **Color Coding** | Turquoise bars change color during algorithm steps (previously cyan/red in source) |
| **Algorithm Comparison** | "Test Sorting Algorithms" button enables comparative testing (labeled "BROKEN" - may have issues) |

## Technology Stack (Build Version)
- **Frontend Framework**: React 16.14.0
- **Build Tool**: Create React App 3.4.3 (CRA v3)
- **Runtime**: JavaScript (JSX), CSS
- **No backend, database, or external dependencies** (pure frontend)
- **Compiled output**: `build/` directory contains the running application

## Architecture (Build Version)
React component-based architecture with:
- **Single `Sortingvisuals` component** managing state and rendering 310 array bars
- **Multiple algorithm modules** within the component (mergeSort, quickSort, heapSort, bubbleSort)
- **CSS for styling** the array bar container and individual bars (turquoise default)
- **5 UI buttons** controlling the application flow
- **Inline algorithm implementations** within the component (unlike source version which imports from separate `Sortingalgorithms.js` module)

**Note on Architecture Difference**: The build version appears to have all algorithm logic inline within `Sortingvisuals.jsx`, whereas the source `src/` version imports `getMergeSortAnimations()` from a separate `Sortingalgorithms.js` module. The documentation reflects the build version's architecture.

## Current Implementation Status (Build Version)
- ✅ **4 sorting algorithms fully implemented**: mergeSort, quickSort, heapSort, bubbleSort
- ✅ **React component** with visualization UI in `src/Sortingvisuals.jsx` (but build may differ)
- ✅ **Array generation**: 310 bars with random heights (5-730)
- ✅ **Animated sorting** with color-coded steps for each algorithm
- ✅ **User controls**: 5 buttons (Generate New Array, Merge Sort, Quick Sort, Heap Sort, Test Sorting Algorithms)
- ⚠️ **Source vs build discrepancy**: Source `src/` files appear outdated; build has 4 algorithms, 310 bars, turquoise color, wired test button
- ⚠️ **testSortingAlgorithms()**: In build version, wired to UI button labeled "Test Sorting Algorithms (BROKEN)"; in source, unexposed
- ⚠️ **Array count**: Build uses 310 bars; source has constant 60
- ⚠️ **Color scheme**: Build uses turquoise; source defines cyan/red constants (may be unused)

## Git History
- `c3a3b9d`: Initial upload with all files including README.md
- `bdc7d37`: Deleted README.md (reason unknown)

**Source vs Build Note**: The git history reflects the source repository state. The compiled `build/` output may differ - see ANALYSIS_PROGRESS.md for the source vs build discrepancy analysis.

## Sensitive Data
- No secrets, credentials, or production data in the repository
- Environment variables not configured (pure CRA app)
- **Build note**: No credentials in either source or build output

## Source vs Build Discrepancy (Key Finding)
The `src/` source files document a simplified version of the project. When a developer runs `npm start`, they experience the **build version** which has:
- 4 sorting algorithms (not just merge sort)
- 310 array bars (not 60)
- turquoise default color (not cyan/red)
- 5 UI buttons (not 2)
- testSortingAlgorithms wired to UI as "Test Sorting Algorithms (BROKEN)" (not unexposed)

**Recommendation**: Developers should work with the understanding that the running application (build) has more features than the source code suggests. If working from `src/` files, they will need to add the missing features or acknowledge the discrepancy.

## Quick Start
```bash
# From project root (d:\sorting\sortingvisuals)
npm start

# This launches the application with:
- 310 array bars with random heights
- 4 sorting algorithm buttons: Merge Sort, Quick Sort, Heap Sort, Bubble Sort
- "Generate New Array" button
- "Test Sorting Algorithms (BROKEN)" button
- Turquoise-colored default bars
```