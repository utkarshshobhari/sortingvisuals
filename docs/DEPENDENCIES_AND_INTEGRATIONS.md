# Dependencies and Integrations

## Project Dependencies

### Core Dependencies (from package.json)

| Package | Version | Purpose | Usage in Project |
|---------|---------|---------|------------------|
| `react` | `^16.14.0` | UI library | Core React framework for building the component interface |
| `react-dom` | `^16.14.0` | DOM rendering | Renders React components to the DOM |
| `react-scripts` | `3.4.3` | CRA build toolchain | Complete development, build, and test toolchain |

### Testing Dependencies

| Package | Version | Purpose | Usage in Project |
|---------|---------|---------|------------------|
| `@testing-library/jest-dom` | `^4.2.4` | Custom Jest matchers | Provides custom matchers like `toBeInTheDocument()` |
| `@testing-library/react` | `^9.5.0` | React testing | Test utilities for rendering React components |
| `@testing-library/user-event` | `^7.2.1` | User interaction simulation | Simulates user interactions in tests |

### Development Dependencies

| Package | Version | Purpose | Usage in Project |
|---------|---------|---------|------------------|
| `package-lock.json` | Auto-generated | Dependency lock file | Ensures consistent installs across environments |

## Framework and Build Tool Integration

### Create React App (CRA) v3.4.3

**Integration Level**: Deep - entire project structure is managed by CRA

**Key Integrations**:
- **Webpack**: Bundles all JavaScript and CSS
- **Babel**: Transpiles JSX and modern JavaScript
- **ESLint**: Lints code against `react-app` extended config
- **Jest**: Runs test suite (included with CRA)
- **Service Worker Workbox**: PWA support (configured but disabled)

**CRA Scripts Used**:
- `npm start` → `react-scripts start` (development server)
- `npm run build` → `react-scripts build` (production build)
- `npm test` → `react-scripts test` (Jest test runner)
- `npm run eject` → eject from CRA (one-way operation)

## External API Integrations

### Zero External APIs

This project has **no external API integrations**. All functionality is self-contained within the React component.

**Verification**:
- No `fetch()` calls in source code
- No `axios` or other HTTP client imports
- No API key environment variables
- No backend server dependencies
- No WebSocket connections
- No third-party service integrations

## Peer Dependencies

None - this is a self-contained React application.

## Transitive Dependencies

The following major transitive dependencies are pulled in by the core packages:

| Dependency | Brought By | Purpose |
|------------|------------|---------|
| `scheduler` | `react` | React's scheduling library for HMR |
| `promise` | `react-scripts` | Promise-based operations |
| `strip-ansi` | `jest` | ANSI escape code stripping for test output |
| `svg-react-parser` | `@testing-library/react` | SVG parsing in tests |
| `dom-helpers` | `@testing-library/react` | DOM manipulation utilities for tests |

## Dependency Versions Status

| Dependency | Version | Status | Last Commit in History |
|------------|---------|--------|----------------------|
| `react` | 16.14.0 | ✅ Current for CRA v3 | Initial commit |
| `react-dom` | 16.14.0 | ✅ Current for CRA v3 | Initial commit |
| `react-scripts` | 3.4.3 | ⚠️ **Old/EOL** | CRA v3 is no longer actively maintained |
| `@testing-library/jest-dom` | 4.2.4 | ⚠️ **Old** | Latest v4 is 5.x+ |
| `@testing-library/react` | 9.5.0 | ⚠️ **Old** | Latest v9 is 13.x+ (React 18) |
| `@testing-library/user-event` | 7.2.1 | ⚠️ **Old** | Latest v7 is 7.6.0+ |

### Version Assessment

**react 16.14.0 / react-dom 16.14.0**: 
- Stable, well-supported
- Part of CRA v3 LTS window
- No known critical vulnerabilities

**react-scripts 3.4.3**:
- Create React App v3 reached end-of-life
- CRA v4 uses react-scripts 4.0.0+
- CRA v5 uses react-scripts 5.0.0+
- **Recommendation**: Consider upgrading if needing React 18 features or modern tooling

**Testing libraries (v4/v9/v7)**:
- Slightly old but functional
- Still compatible with React 16
- Consider upgrading when migrating to React 18+

## Known Vulnerabilities

Running `npm audit` would likely report some low-severity findings due to the older dependency versions, but no critical security vulnerabilities are present for this simple application.

**Suggested command** (run from project root):
```bash
npm audit
```

## Integration Points Summary

| Integration Type | Status | Details |
|------------------|--------|---------|
| Backend API | None | No server communication |
| Database | None | In-memory only |
| Authentication | None | Public application |
| File System | None | Client-side only |
| Cloud Services | None | Static frontend |
| PWA/Service Worker | Configured but disabled | Workbox setup in `src/serviceWorker.js`, but `unregister()` called in `index.js` |
| Local Storage | Not implemented | Would need to add |
| WebSockets | Not implemented | Not needed for this project |
| Webhooks | Not implemented | Not needed for this project |