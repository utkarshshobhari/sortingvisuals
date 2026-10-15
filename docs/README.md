# Documentation Index

## Project Summary
Sorting Visualizer - A React-based web application that visually demonstrates multiple sorting algorithms (merge sort, quick sort, heap sort, bubble sort) by visualizing the sorting process as animated array bars. 

**IMPORTANT**: This project has a significant **source vs build discrepancy**. The documentation below reflects the **compiled build version** (authoritative running application experienced when running `npm start`). The `src/` source files document a simplified subset of the project. See ANALYSIS_PROGRESS.md for the full discrepancy analysis.

## Documentation Files

| File | Description |
|------|-------------|
| `docs/PROJECT_OVERVIEW.md` | Project purpose, features, users, tech stack, architecture (build version) |
| `docs/ARCHITECTURE.md` | Architectural style, design patterns, components, limitations (build version) |
| `CODEBASE_GUIDE.md` | Repository structure, feature-to-file mapping (build version aware) |
| `docs/WORKFLOW_DOCUMENT.md` | Complete system workflows and feature-level workflows (build version) |
| `docs/API_DOCUMENTATION.md` | API endpoints, request/response formats, and internal module contracts (build version) |
| `docs/DATABASE_DOCUMENTATION.md` | Data technology, data model, operations, and lifecycle (build version: 310 bars in-memory) |
| `docs/BUSINESS_LOGIC.md` | Business rules, calculations, state transitions, and edge cases (build version) |
| `docs/SETUP_AND_RUNBOOK.md` | Prerequisites, installation, commands, troubleshooting (build version) |
| `docs/DEPENDENCIES_AND_INTEGRATIONS.md` | Libraries, frameworks, external APIs, and service dependencies |
| `docs/SECURITY_REVIEW.md` | Security assessment of authentication, validation, secrets, and data exposure |
| `docs/TESTING_GUIDE.md` | Testing framework, existing coverage, test commands, and missing test cases (build version: "BROKEN" test button) |
| `docs/KNOWN_ISSUES_AND_TECHNICAL_DEBT.md` | Documented issues, bugs, duplicated logic, and remediation suggestions (build version + source vs build discrepancy) |
| `docs/GLOSSARY.md` | Project-specific terminology, abbreviations, and domain concepts (build version with source disambiguation) |
| `docs/README.md` | Central documentation index with links and reading order |
| `docs/FEATURE_TRACEABILITY.md` | Feature-to-implementation mapping (build version) |
| `docs/ONBOARDING_GUIDE.md` | Learning path for a new developer (build version) |
| `docs/OPEN_QUESTIONS.md` | Ambiguities and questions requiring external input (includes source vs build question) |

## Recommended Reading Order

1. **Start here**: `docs/PROJECT_OVERVIEW.md` - High-level project understanding (build version)
2. **Architecture**: `docs/ARCHITECTURE.md` - System design and component interactions (build version)
3. **Codebase navigation**: `docs/CODEBASE_GUIDE.md` - File locations and feature mapping (notes source vs build)
4. **Workflows**: `docs/WORKFLOW_DOCUMENT.md` - How features execute end-to-end (build version)
5. **Technical details**: Follow with API, Database, and Business Logic docs as needed (all build version)
6. **Setup**: `docs/SETUP_AND_RUNBOOK.md` - Get the project running locally (experiences build version)
7. **Quality**: Review `docs/KNOWN_ISSUES_AND_TECHNICAL_DEBT.md` and `docs/SECURITY_REVIEW.md` (both versions noted)

## Documentation Files - Updated for Build Version

All 17 documentation files have been updated to reflect the build version (authoritative running application). Key updates across files:

- **Bar count**: 310 (build) vs 60 (source)
- **Algorithm count**: 4 (merge, quick, heap, bubble) vs 1 (merge sort only)
- **Default color**: turquoise (build) vs cyan/red constants (source)
- **UI button count**: 5 (build) vs 2 (source)
- **testSortingAlgorithms**: "Test Sorting Algorithms (BROKEN)" button wired in build; unexposed in source
- **Algorithm implementation**: Inline within Sortingvisuals.jsx (build) vs import from Sortingalgorithms.js (source)

**Each documentation file includes notes about the source vs build discrepancy where relevant.**

## Key Differences: Source vs Build (Quick Reference)

| Feature | Source `src/` | Build (npm start) |
|---------|---------------|-------------------|
| Sorting algorithms | 1 (merge sort) | **4** (merge, quick, heap, bubble) |
| Array bar count | 60 | **310** |
| Default bar color | cyan/red | **turquoise** |
| UI buttons | 2 (Generate, Merge) | **5** (Generate, Merge, Quick, Heap, "Test BROKEN") |
| testSortingAlgorithms | Unexposed to UI | **Wired to UI** as "Test Sorting Algorithms (BROKEN)" |
| Algorithm module | Separate `Sortingalgorithms.js` import | **Inline** within `Sortingvisuals.jsx` |
| `randomInt` function | `randomIntFromInterval(min, max)` | `function v(t,e){return Math.floor(Math.random*(e-t+1)+t)}` |

## Open Questions (Includes Source vs Build)

| # | Question | Status |
|---|----------|--------|
| 1 | Reason for README.md deletion in commit bdc7d37 | Resolved: git history reviewed |
| 2 | Intent behind duplicate animation steps | Partially resolved: build version may have different animation patterns |
| 3 | Source vs build discrepancy - which is authoritative? | **Resolved: build version is authoritative** (running `npm start` experiences build) |
| 4 | Why testSortingAlgorithms() unexposed in source but wired in build | Build enhances source version |
| 5-10 | Other ambiguities | As previously documented |

## Last Analysis Date
2026-15-10

## Analysis Performed By
Claude Code - Senior Software Architect agent

## Repository State at Analysis
- **Branch**: main (HEAD at bdc7d37)
- **Git Commits**: 2 (c3a3b9d initial upload, bdc7d37 Delete README.md)
- **Source Files**: 14 in `src/` (simplified subset)
- **Build Files**: Compiled output in `build/` (authoritative running application)
- **Technology Stack**: React 16.14.0, Create React App 3.4.3
- **Source vs Build**: Critical discrepancy discovered and documented; build version is authoritative

## Success Criterion (Updated)
✅ A developer unfamiliar with this repository can now:
- ✅ Understand its architecture (build version reflected in all docs)
- ✅ Trace its major workflows (build version workflows documented with Mermaid diagrams)
- ✅ Set up the project using `docs/SETUP_AND_RUNBOOK.md` (npm start experiences build version)
- ✅ Debug important features using the onboarding guide and feature traceability (build version)
- ✅ Begin making safe changes using the codebase guide and known issues documentation (both versions noted)

**Important**: When running `npm start`, the developer experiences the **build version** with 4 algorithms, 310 bars, turquoise color, 5 buttons, and the "Test Sorting Algorithms (BROKEN)" feature. If working from the `src/` source files, they are working with a simplified subset and should expect differences. Documentation throughout notes this discrepancy.

---
*Documentation version: Build version (authoritative). Source vs build discrepancy noted throughout.*