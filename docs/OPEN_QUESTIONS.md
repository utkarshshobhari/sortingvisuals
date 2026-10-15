# Open Questions

## Ambiguities and Missing Context

### 1. Reason for README.md Deletion
**Question**: Why was README.md deleted in commit bdc7d37 (September 8, 2021)?
- **Current state**: Original README content is preserved in git history (commit c3a3b9d)
- **Impact**: Understanding why it was removed could inform whether documentation should be restored
- **Possible reasons**: 
  - Security concern (sensitive info in README)
  - Personal preference
  - Project reorganization
  - Response to user feedback
- **Suggested action**: Review git commit message or ask original developer

### 2. Intent Behind Duplicate Animation Steps
**Question**: Why does `Sortingalgorithms.js` push the same animation step `[i, j]` twice (lines 35-36)?
- **Current code**:
  ```javascript
  animations.push([i, j]);
  animations.push([i, j]);
  ```
- **Observed effect**: Color cycling appears doubled/faster than expected
- **Possible intents**:
  - Bug/oversight (accidental duplicate)
  - Intentional visual effect (double highlight for comparisons)
  - Compensation for some other aspect of the animation logic
- **Suggested action**: Code author consultation; experimentation to determine intended behavior

### 3. Why `state.array` Not Updated After Merge Sort
**Question**: Was the decision to not update `this.state.array` after `mergeSort()` intentional?
- **Current behavior**: 
  - `mergeSort()` animates bars but leaves `state.array` as original unsorted values
  - User must click "Generate New Array" to get new random values
  - Sorted result is not persisted
- **Possible reasons**:
  - Intentional: Animation is purely visual, state management separate
  - Oversight: Developer forgot to update state after animation
  - Design choice: State reflects input, visualization is ephemeral
- **Suggested action**: Review with original developer; consider whether persisting sorted state would improve UX

### 4. Why `testSortingAlgorithms()` Is Not Exposed to UI
**Question**: Why does the comprehensive test method exist but have no UI binding?
- **Current state**: Method runs 100 iterations comparing merge sort vs JavaScript `sort()`, logs to console
- **Possible reasons**:
  - Debug tool left in by mistake
  - Intended for future UI integration (never completed)
  - A/B testing framework placeholder
  - Development/quality assurance tool
- **Suggested action**: Determine if this should be removed, integrated, or kept as internal tool

### 5. Algorithm Selection for Future Features
**Question**: Which sorting algorithms should be added next, and in what order?
- **Current state**: Only merge sort implemented
- **Code hint**: Line 54 in `Sortingvisuals.jsx` says "//have to add other sort algorithm"
- **Considerations**:
  - Educational value (which algorithms are most useful to learn?)
  - Visual complexity (some algorithms animate more clearly than others)
  - Performance characteristics (different Big-O complexities)
  - User request data (if available)
- **Suggested priority**: 
  1. Bubble sort (simplest to understand, well-known)
  2. Quick sort (common, good average performance)
  3. Selection sort (simple, but rarely used practically)
  4. Insertion sort (useful for nearly-sorted data)

### 6. Persistence Strategy
**Question**: Should the application add data persistence (localStorage, backend)?
- **Current state**: No persistence; array state lost on page refresh
- **Trade-offs**:
  - **Pros**: User retains their arrays across sessions; better UX
  - **Cons**: Adds complexity, storage concerns, potential privacy issues
  - **Technical**: Would require modifying `Sortingvisuals.jsx` to use `localStorage` or adding backend
- **Suggested decision**: 
  - For educational/demo: No persistence needed (fresh start each time)
  - For production/useful tool: Add localStorage persistence
  - **Decision needed**: Should persistence be added? If so, what kind?

### 7. CRA Version Upgrade Path
**Question**: Should this project be migrated from CRA v3 to a newer stack?
- **Current state**: `react-scripts: 3.4.3` (CRA v3, reached end-of-life)
- **Risks**:
  - Security vulnerabilities unpatched
  - Compatibility issues with modern browsers/Node.js
  - Missing React 18 features (concurrent mode, suspense, etc.)
- **Upgrade options**:
  - **Option A**: Eject and customize (one-way, high effort)
  - **Option B**: Stay on CRA v3 with security monitoring (low effort, high risk)
  - **Option C**: Migrate to Vite + React 18 (medium effort, modern stack)
  - **Option D**: Use CRA v5 if available (depends on Create React App timeline)
- **Suggested action**: Evaluate project goals and timeline; if long-term maintenance expected, plan upgrade

### 8. Color Cycle Rationale
**Question**: What is the rationale behind the specific 3-step color cycle (red/red/cyan)?
- **Current implementation**:
  - `i % 3 === 0`: SECONDARY_COLOR (red)
  - `i % 3 === 1`: PRIMARY_COLOR (cyan) 
  - `i % 3 === 2`: Height update (no color change)
- **Possible rationales**:
  - Visual distinction: Red indicates "active comparison", cyan is "idle/background"
  - Three-state signaling: Comparison in progress, comparison complete, value placement
  - Aesthetic choice: Three colors provide enough variety without overwhelming
- **Suggested action**: If changing, ensure new color cycle makes intuitive sense for viewers

### 9. Animation Speed Justification
**Question**: Why was `ANIMATION_SPEED_MS = 10` chosen?
- **Current value**: 10 milliseconds per animation step
- **Observed behavior**: Sort completes in approximately `animations.length * 10ms`
- **For a 60-element array**: Merge sort generates ~1000+ steps, so total ~10+ seconds
- **Possible rationales**:
  - Fast enough to maintain viewer engagement
  - Slow enough to follow the algorithm logic
  - Empirical choice (developer preference)
  - Matching typical educational animation speeds
- **Suggested action**: Test with different speeds (5ms, 20ms) to determine optimal value

### 10. Container Positioning
**Question**: Why is the array container positioned with `left: 300px`?
- **Current CSS** (`Sortingvisuals.css`):
  ```css
  .array-container {
    position: absolute;
    left: 300px;
    /* top: 100px; */  /* commented out */
  }
  ```
- **Possible reasons**:
  - Layout offset to make room for something else on the page
  - Centering within a wider container
  - Developer preference/arbitrary choice
  - Response to a specific screen size or layout constraint
- **Suggested action**: 
  - If removing absolute positioning: would need responsive/reflow design
  - If changing value: test on different screen widths
  - **Decision**: Is this hardcoded position intentional or arbitrary?

## Questions Requiring Developer Input

| # | Question | Priority | Suggested Resolver |
|---|----------|----------|-------------------|
| 1 | Reason for README.md deletion | High | Original developer / git history review |
| 2 | Intent of duplicate animation steps | High | Code author consultation |
| 3 | Why state not updated after sort | Medium | Code author / design review |
| 4 | Why test method unexposed to UI | Medium | Code author |
| 5 | Which algorithms to add first | Low | Product/education stakeholder |
| 6 | Should persistence be added? | High | Product stakeholder |
| 7 | CRA upgrade path | High | Engineering lead |
| 8 | Color cycle rationale | Low | Design/education stakeholder |
| 9 | Animation speed justification | Medium | Code author / UX testing |
| 10 | Container positioning | Low | Code author / designer |

## External Dependencies That Cannot Be Inspected

| Dependency | Reason Cannot Inspect | Workaround |
|------------|----------------------|------------|
| Create React App internals | Build toolchain is opaque; only surface-level config visible | Run `npm run build` to see output; inspect `build/` directory |
| React internal behavior | React's reconcilation and DOM updates are abstracted | Use React DevTools browser extension for inspection |
| Node.js ecosystem | `node_modules` excluded from analysis (binary/generated) | Review `package.json` and `package-lock.json` for dependency versions |
| Browser JavaScript engine | Engine-specific behavior not inspectable from source | Test in multiple browsers if needed |

## Summary of Unknowns

**Total open questions**: 10
- **High priority**: 4 (README deletion reason, duplicate steps intent, state-after-sort decision, CRA upgrade)
- **Medium priority**: 4 (test method exposure, persistence decision, animation speed, test method exposure)
- **Low priority**: 2 (algorithm priority, container positioning)

**Most critical unknown**: Reason for README.md deletion and intent behind duplicate animation steps - these affect documentation accuracy and potential code fixes.

**Areas requiring manual verification**: 
- All business rule intentions (were confirmed by code review or are inferred)
- Design decisions (color cycle, animation speed, positioning)
- Historical decisions (README deletion, feature inclusions/exclusions)

**Next steps for resolution**:
1. Review git commit messages and history for context
2. If original developer is available, ask about design decisions
3. Experiment with animation variations to determine optimal patterns
4. Decide on persistence based on project goals
5. Plan CRA upgrade if long-term maintenance is intended