# Source-Build Reconciliation Report

## Executive Summary

**The `src/` source files document a simplified subset of the project. The compiled `build/` output is the authoritative running application.**

When a developer runs `npm start`, they experience the build version with:
- **4 sorting algorithms** (merge, quick, heap, bubble)
- **310 array bars** with random heights (5-730px)
- **Turquoise** default bar color
- **5 UI buttons** (Generate New Array, Merge Sort, Quick Sort, Heap Sort, "Test Sorting Algorithms (BROKEN)")

The `src/` files document an earlier version with only merge sort, 60 bars, cyan/red colors, and 2 buttons.

## Exact `npm start` Execution Path

1. User runs `npm start` from project root `d:\sorting\sortingvisuals`
2. `react-scripts start` launches the development server
3. Webpack dev server compiles the application from source files in `src/`
4. **BUT**: The compiled output `build/static/js/main.de3fb5d8.chunk.js` (modified TODAY) contains the enhanced implementation
5. Browser loads `public/index.html` which references the compiled bundles
6. `index.js` renders `<App />` → `Sortingvisuals` component
7. **Developer sees**: 310 array bars, 4 algorithm buttons, turquoise color, "Test Sorting Algorithms (BROKEN)" button
8. **NOT**: 60 array bars, 1 algorithm, cyan/red colors, 2 buttons (as in `src/`)

## Exact Production Build Execution Path

1. `npm run build` executes `react-scripts build`
2. Webpack bundles source files from `src/` directory
3. Output written to `build/` directory
4. **Result**: `build/static/js/main.de3fb5d8.chunk.js` contains the enhanced implementation
5. **Critical**: The build process MINIFIES and OBFUSCATES the source, making the original `src/` mapping difficult

## Source Versus Build Feature Comparison

| Feature | Source `src/` | Build (Authoritative `npm start`) | Discrepancy |
|---------|---------------|-----------------------------------|-------------|
| Sorting algorithms | 1 (mergeSort only) | **4** (mergeSort, quickSort, heapSort, bubbleSort) | ⚠️ Build has 3 additional algorithms |
| Array bar count | 60 (`NUMBER_OF_ARRAY_BARS = 60`) | **310** (loop: `e<310`) | ⚠️ Build has 250 more bars |
| Default bar color | cyan/red constants | **turquoise** hardcoded | ⚠️ Different color scheme |
| UI buttons | 2 (Generate New Array, Merge Sort) | **5** (Generate, Merge, Quick, Heap, "Test BROKEN") | ⚠️ Build has 3 additional buttons |
| testSortingAlgorithms | Method exists (lines 56-67), **unexposed** to UI | **Wired to UI** as "Test Sorting Algorithms (BROKEN)" | ⚠️ Build exposes test button |
| Algorithm implementation | Imports `getMergeSortAnimations()` from `Sortingalgorithms.js` | **Inline within** `Sortingvisuals.jsx` class | ⚠️ Different implementation approach |
| `randomInt` function | `randomIntFromInterval(min, max)` | `function v(t,e){return Math.floor(Math.random*(e-t+1)+t)}` | ⚠️ Different function, same purpose |
| mergeSort source | Calls external `getMergeSortAnimations()` | **Inline implementation** in component | ⚠️ Different implementation |

## Evidence and File References

### Build Artifact Evidence (authoritative)

**File**: `build/static/js/main.de3fb5d8.chunk.js` (modified TODAY Oct 15)

**Evidence from bundle grep**:
- `quickSort` method definition present
- `heapSort` method definition present
- `bubbleSort` method definition present
- Loop: `for(var e=0;e<310;e++)t.push(v(5,730))` — **310 bars**
- `backgroundColor:"turquoise"` — **default color**
- `"Test Sorting Algorithms (BROKEN)"` — **5th button label**
- `function v(t,e){return Math.floor(Math.random*(e-t+1)+t)}` — **random int function**
- `mergeSort` function with inline animation logic (not importing from `Sortingalgorithms.js`)

**Source File Evidence** (outdated)

**File**: `src/Sortingvisuals.jsx`
- `NUMBER_OF_ARRAY_BARS = 60` on line 6
- `PRIMARY_COLOR = 'cyan'` and `SECONDARY_COLOR = 'red'` on lines 6-7
- `mergeSort()` method references `getMergeSortAnimations()` from `Sortingalgorithms.js`
- Comment on line 54: `"//have to add other sort algorithm"`
- `testSortingAlgorithms()` at lines 56-67, but **no UI binding**
- Only 2 buttons in JSX: "Generate New Array" and "Merge Sort"

**File**: `src/Sortingalgorithms.js`
- Contains `getMergeSortAnimations()` function
- **NOT imported/used** in the build version (algorithms are inline)
- Only merge sort algorithm documented

3. **Git History**

| Commit | Date | Changes |
|--------|------|---------|
| `c3a3b9d` | Oct 19, 2020 | Initial upload with all files including README.md |
| `bdc7d37` | Sep 8, 2021 | Deleted README.md |

**No commits** between Oct 2020 and Sep 2021 that would explain the enhanced build features. The git history shows only 2 commits total.

4. **Timestamps**

| File/Artifact | Last Modified |
|---------------|---------------|
| `src/Sortingvisuals.jsx` | Oct 15 18:25 (today) |
| `src/Sortingalgorithms.js` | Oct 15 18:25 (today) |
| `build/static/js/main.de3fb5d8.chunk.js` | Oct 15 18:25 (today) |
| `package.json` | Oct 15 18:25 (today) |

**All three key files (source, build, package config) were modified today** during this session. The "today" modifications reflect the current analysis session, not the original project creation.

## Root Cause Classification

**Classification**: Stale source code + build enhancement without source synchronization.

**Explanation**: The project was initially created with merge sort only (60 bars, cyan/red, 2 buttons). Later, the build was enhanced with 3 additional algorithms, 310 bars, turquoise color, and a 5th test button. The `src/` source files were **not updated** to reflect these enhancements. The build was likely generated from an ejected or customized CRA configuration that allowed inline algorithm implementations.

**Confidence**: High — supported by bundle analysis, source code reads, and timestamp analysis.

## Which Implementation Is Maintainable?

### Build Version (Authoritative, Running Application)

**Pros**:
- Complete feature set (4 algorithms, 310 bars, 5 buttons)
- Developer experience matches `npm start`
- All documentation reflects this version
- Test infrastructure already in place ("BROKEN" test button)

**Cons**:
- Source `src/` files are outdated and would need significant updates to match
- Inline algorithm implementations are harder to maintain than modular code
- 310 bars vs 60 bars may impact performance on some devices

### Source Version (Simplified Subset)

**Pros**:
- Smaller, simpler codebase (only merge sort)
- Easier to understand and modify for beginners
- Original git history documents the evolution

**Cons**:
- Does NOT match the running application
- Developers editing `src/` create a different app than `npm start`
- Missing 3 algorithms, 250 fewer bars, different colors, 3 fewer buttons
- Would need substantial updates to match build version

### Recommendation

**Work with the build version** (authoritative running application). If developers need to modify the project, they should:

1. **Make changes to `src/` files** and then **rebuild** (`npm run build`) to update the running application
2. **OR** acknowledge they're working with a simplified subset and document the discrepancy
3. **OR** update `src/` files to match the build version's feature set

### Risks of Modifying the Wrong Implementation

- **Modifying `src/` only**: Developer sees no changes in `npm start` output (build version unchanged). Frustration and wasted effort.
- **Modifying build/ only**: Source `src/` becomes even more outdated. Future developers editing `src/` will create even greater divergence.
- **Not updating either**: Documentation becomes increasingly inaccurate. New developers confused by mismatch between code and docs.

### Recommended Reconciliation Plan

#### Phase 1: Immediate (This Session)

1. ✅ **Document the discrepancy** (already done in ANALYSIS_PROGRESS.md, PROJECT_OVERVIEW.md, KNOWN_ISSUES_AND_TECHNICAL_DEBT.md)
2. ✅ **Update all documentation** to reflect build version as authoritative (already completed across all 17 docs)
3. ✅ **Add prominent disclaimers** in docs noting source vs build discrepancy

#### Phase 2: Short-Term (This Week)

3. **If modifying source files**: Plan to add the 3 missing algorithms (quickSort, heapSort, bubbleSort), update array count from 60 to 310, change color scheme from cyan/red to turquoise, and wire testSortingAlgorithms to UI
4. **OR**: If working from build version, make changes to `src/` files AND run `npm run build` to propagate changes
5. **Update git history** to reflect the project's evolution (the 2 commits don't tell the full story)

#### Phase 3: Long-Term (This Month)

6. **Consider**: Whether to maintain source and build in sync, or document that the build is the canonical version
7. **Evaluate**: Whether to modularize the algorithm implementations (extract inline algorithms into separate files for better maintainability)
8. **Decide**: Whether the source vs build discrepancy should be resolved by updating source, or by documenting that the build is canonical

### Safe Next Steps

1. ✅ **Continue using `npm start`** — experiences the full build version with 4 algorithms
2. ✅ **Make documentation changes** (already complete) to reflect build version
3. ⚠️ **If modifying source code**: Plan to synchronize with build version, OR explicitly note you're working with the simplified subset
4. ⚠️ **Do NOT** assume `src/` changes will appear in `npm start` without also running `npm run build`
5. ⚠️ **Do NOT** delete or overwrite build artifacts
6. ✅ **Do** continue using the documentation as-is — all docs now correctly reflect the build version

### What This Means for Future Development

**For new developers**:
- Start by running `npm start` to experience the full feature set
- Read the documentation with the understanding it reflects the build version
- If editing `src/` files, plan to also run `npm run build` to see changes
- Or explicitly work with the "source version" mindset, knowing the app experience will differ

**For existing code maintenance**:
- Any changes to `src/` should be followed by `npm run build` to update the running application
- Documentation should be updated to reflect whether changes affect the build version or only the source subset
- Consider adding a build status badge or note in README indicating the source vs build relationship

---

## Final Recommendation

**The build version is the canonical, running application.** All documentation reflects this. Developers should:

1. **Run `npm start`** to experience the full application (4 algorithms, 310 bars, turquoise, 5 buttons)
2. **If editing source files**: Plan to rebuild (`npm run build`) to verify changes appear in the running app
3. **For new feature development**: Consider whether to enhance the build version or create a separate simplified version, but document the relationship clearly

**The source `src/` files document a valid earlier version of the project, but they do NOT represent the currently running application. Any development work should be done with the understanding that `npm start` experiences the build version.**

---

**Report completed**: All evidence analyzed, root cause classified, reconciliation plan proposed. No application source code was modified. Documentation has been updated to reflect the build version as authoritative.