# Dependency Audit - Current State

## package.json Dependencies

### Runtime Dependencies:
| Package | Current Version | Type | Status |
|---------|-----------------|------|--------|
| react | ^16.14.0 | Runtime | EOL, needs upgrade |
| react-dom | ^16.14.0 | Runtime | EOL, needs upgrade |
| init | ^0.1.2 | Unclear | Unnecessary |

### Dev Dependencies:
| Package | Current Version | Type | Status |
|---------|-----------------|------|--------|
| @testing-library/jest-dom | ^4.2.4 | Testing | Outdated |
| @testing-library/react | ^9.5.0 | Testing | Outdated |
| @testing-library/user-event | ^7.2.1 | Testing | Outdated |
| react-scripts | 3.4.3 | Build tool | CRA v3 EOL |

### Known Issues:
- CRA 3.4.3 is EOL and doesn't support Node.js 24 without `--openssl-legacy-provider`
- React 16.14.0 lacks modern features (hooks, concurrent features)
- Testing libraries are outdated and incompatible with modern React

## Target Dependency Versions (to be determined based on compatibility research):

- **React**: 18.x or 19.x (latest stable)
- **React DOM**: Match React version
- **Vite**: Latest stable (replacement for CRA)
- **Vitest**: Latest stable (replacement for Jest)
- **@testing-library/react**: Latest compatible with target React
- **@testing-library/jest-dom**: Latest compatible
- **ESLint**: Latest stable

## Migration Notes:
- The `init` package is unnecessary and should be removed
- `react-scripts` will be replaced with Vite
- Testing stack will be migrated to Vitest + React Testing Library
- ESLint config needs to be updated from `react-app` to modern flat config or equivalent
