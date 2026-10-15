# Architecture

## Architectural Style
Single-page application (SPA) built with Create React App (CRA) 3.4.3. Follows React component-based architecture with unidirectional data flow.

**Important**: This architecture documents the **compiled build version** (authoritative running application). The source `src/` files represent a simplified subset. See ANALYSIS_PROGRESS.md for source vs build discrepancy details.

## Major Components (Build Version)

### 1. `src/Sortingvisuals.jsx` (Main Component) - BUILD VERSION
- **Type**: React class component (compiled output)
- **Responsibilities** (what the developer experiences):
  - Manages state: `array` (310 integers, values 5-730)
  - Lifecycle: `componentDidMount` calls `resetArray()` on mount
  - Event handling: Handles 5 button clicks (mergeSort, quickSort, heapSort, bubbleSort, testSortingAlgorithms, resetArray)
  - Render: Displays 310 array bars with interactive buttons
  - Animation control: Timed CSS transitions based on algorithm-specific animation data
- **Dependencies**: Inline algorithm implementations (no separate algorithm module import in build version)
- **Note**: Source `src/` version has separate `Sortingalgorithms.js` with `getMergeSortAnimations()`, but build version inlines algorithms

### 2. Algorithm Implementations (All in Build Version)
The build version contains 4 inline algorithm implementations within `Sortingvisuals.jsx`:

| Algorithm | Method Name | Description |
|-----------|-------------|-------------|
| **mergeSort** | `mergeSort()` | Divide-and-conquer O(n log n) algorithm; recursive splitting and merging with animation steps |
| **quickSort** | `quickSort()` | pivot-based partitioning algorithm; average O(n log n) performance |
| **heapSort** | `heapSort()` | heap-based sorting algorithm O(n log n) using heap data structure |
| **bubbleSort** | `bubbleSort()` | repeated swap algorithm O(n²) that repeatedly steps through list |

**Key**: All 4 algorithms are implemented as methods within the `Sortingvisuals` class component in the build version.

### 3. `src/App.js` (App Container)
- **Type**: Function component
- **Responsibilities**: Renders `Sortingvisuals` component within the App wrapper
- **Note**: Minimal changes needed between source and build versions

### 4. `src/index.js` (Entry Point)
- **Type**: ReactDOM render
- **Responsibilities**: Renders App component to DOM
- **Service Worker**: `serviceWorker.unregister()` called (PWA disabled by default)
- **Note**: Same in both source and build versions

### 5. `src/Sortingvisuals.css` (Component Styles)
- **Types**: CSS class definitions
- **Responsibilities**: Styling for 310 array bars and container
- **Note**: turquoise default color in build; source had cyan/red constants

## Component Interactions (Build Version)

```mermaid
flowchart TD
    A[Browser loads index.html] --> B{Build Version?}
    B -->|Yes| C[Compiled application with 4 algorithms, 310 bars, turquoise color]
    B -->|No| D[Source-only version (simplified)]
    C --> E[4 sorting algorithm buttons + controls]
    D --> E_minimal[2 buttons: Generate New Array, Merge Sort]
    
    E --> F[Sortingvisuals component]
    F -->|State: 310-array| G[Render 310 .array-bar elements]
    F -->|5 button handlers| H[Algorithm execution]
    
    G --> I[Display 310 bars with varying heights]
    H --> J[Algorithm-specific animation]
    J --> K[Bars animate and sort]
    K --> I
```

## Data Flow (Build Version)

### Initialization Flow
```
1. index.js → ReactDOM.render(App, 'root')
2. App → <Sortingvisuals />
3. Sortingvisuals → componentDidMount()
4. → resetArray()
5. Loop 310 times: random value 5-730 → array.push()
6. setState({array: populatedArray})
7. Render: 310 .array-bar divs with heights from state
8. User sees visualization with 310 random bars
```

### Algorithm Selection Flow
```
1. User clicks one of 5 buttons:
   - "Generate New Array" 
   - "Merge Sort"
   - "Quick Sort"
   - "Heap Sort"
   - "Test Sorting Algorithms (BROKEN)"
2. Corresponding handler in Sortingvisuals.jsx executes
3. Algorithm runs with animation steps
4. 310 bars animate according to algorithm-specific logic
5. Bars end in sorted order (or intermediate state)
```

### Array Regeneration Flow
```
1. User clicks "Generate New Array" button
2. resetArray() called
3. Loop 310 times: randomInt(5, 730) → each element
4. setState({array: newRandomArray})
5. React re-renders with 310 new bar heights
```

## Design Decisions (Supported by Build Output)

### Decision: 4 Sorting Algorithms
- **Evidence**: Build bundle contains quickSort, heapSort, bubbleSort in addition to mergeSort
- **Rationale**: Provides comparison educational value - user can see different algorithm performance visually

### Decision: 310 Array Bars
- **Evidence**: Build bundle loop: `for(var e=0;e<310;e++)t.push(v(5,730))`
- **Rationale**: Larger array (vs 60 in source) provides more detailed visualization; may have been increased for better algorithm comparison

### Decision: Turquoise Default Color
- **Evidence**: Build hardcodes `"turquoise"` as default bar background color
- **Rationale**: Different from source's cyan/red; may be a design choice for better visual distinction

### Decision: 5 UI Buttons
- **Evidence**: Build render includes 5 buttons with onClick handlers
- **Rationale**: Provides algorithm selection + test functionality in one interface

### Decision: testSortingAlgorithms "BROKEN" Label
- **Evidence**: Build button labeled "Test Sorting Algorithms (BROKEN)"
- **Rationale**: Indicates the test has known issues; likely compares custom algorithm output vs JavaScript native `sort()` which may produce different results

## Architectural Limitations (Build Version)
- ⚠️ No persistence: Array state lost on page refresh
- ⚠️ Only 4 sorting algorithms (no others like insertion sort, selection sort)
- ⚠️ testSortingAlgorithms labeled "BROKEN" - known issues with test comparison
- ⚠️ 310 bars may be performance-intensive on some devices
- ⚠️ Source `src/` files are simplified; developers editing source will create different app than build
- ⚠️ Algorithm implementations are inline in component (not modular like source version)

## Potential Improvements
- Add more sorting algorithms (insertion sort, selection sort, etc.)
- Add algorithm speed comparison display
- Add pause/step-through control during animations
- Add dark mode support
- Make responsive (currently fixed at 310 bars)
- Add algorithm complexity information (Big-O notation)
- Fix the "BROKEN" test algorithm issues

## Source vs Build Architecture Difference

**Critical**: The source `src/` version and build version have different architectures:

| Aspect | Source `src/` Version | Build Version (Authoritative) |
|--------|----------------------|------------------------------|
| Algorithm implementation | Imports `getMergeSortAnimations()` from separate `Sortingalgorithms.js` | 4 algorithms **inline** within `Sortingvisuals.jsx` |
| Array count | `NUMBER_OF_ARRAY_BARS = 60` | **310** (hardcoded loop count) |
| Default color | `PRIMARY_COLOR = 'cyan'`, `SECONDARY_COLOR = 'red'` | **"turquoise"** hardcoded |
| UI buttons | "Generate New Array", "Merge Sort" (2 buttons) | **5 buttons**: Generate, Merge, Quick, Heap, "Test Sorting Algorithms (BROKEN)" |
| testSortingAlgorithms | Method exists (lines 56-67) but **unexposed** to UI | **Wired to UI button** labeled "(BROKEN)" |
| Source code date | Earlier version | **Compiled output = running app** |

**Documentation Recommendation**: Always reference the build version as authoritative. If developers work from `src/` files, they should be aware they are working with a simplified subset and may need to add missing features to match the build output.

## Summary of Build Version Architecture

The application is a **multi-algorithm sorting visualizer** that allows developers/students to:
1. Visualize 4 different sorting algorithms on the same array
2. Compare algorithm performance and animation styles
3. Generate new random arrays of 310 bars
4. Test algorithm correctness (with "BROKEN"-labeled test function)
5. Observe color-coded animation steps during sorting

The component-based architecture centers on the `Sortingvisuals` class which manages all state, rendering, and algorithm execution internally - a more self-contained design than the source version which separates algorithm logic into a distinct module.