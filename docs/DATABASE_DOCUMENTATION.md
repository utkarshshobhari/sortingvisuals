# Database Documentation

## Technology and Configuration
- **Database Technology**: None (pure frontend application)
- **Storage Type**: In-memory React component state only
- **Persistence**: None - data lost on page refresh or closure
- **Configuration**: None required

## Data Model

### `state.array` (React State)
| Field | Type | Description |
|-------|------|-------------|
| `array` | `number[]` | Array of 60 integers representing bar heights |
| Range | Each integer: 5-730 | Randomly generated on array reset |
| Length | Always 60 | Fixed number of array bars |

### Individual Bar Data
| Attribute | Source | Description |
|-----------|--------|-------------|
| `height` | Calculated from array value | `style.height = \`${value}px\`` |
| `key` | Array index | React `key={idx}` |
| `className` | Always "array-bar" | CSS styling |
| `backgroundColor` | Initially PRIMARY_COLOR (cyan) | Changed during animation |

## Data Flow

### Creation (Initial Load)
```
componentDidMount() → resetArray()
  ↓
Loop 60 times:
  randomIntFromInterval(5, 730) → each element
  setState({array})
  ↓
Render: 60 .array-bar divs with heights from state
```

### Modification (Regenerate)
```
User clicks "Generate New Array"
  ↓
resetArray()
  ↓
Loop 60 times:
  randomIntFromInterval(5, 730)
  setState({array})
  ↓
React re-renders with new bar heights
```

### Modification (Merge Sort)
```
User clicks "Merge Sort"
  ↓
mergeSort() → getMergeSortAnimations(array)
  ↓
Iterate animations with setTimeout
  ↓
DOM manipulation: update heights and colors
  ↓
Note: state.array NOT modified after initial generation
  ↓
Bars animate and eventually show sorted order
```

## Data Operations

### Read Operations
- **Get array values**: `this.state.array` (60 integers)
- **Get individual bar height**: `array[i]` → rendered as `${array[i]}px`
- **Count of bars**: `array.length` (always 60)

### Write Operations
- **Update array**: `setState({array})` - only in `resetArray()`
- **Update DOM**: Direct `style.backgroundColor` and `style.height` manipulation
- **No persistent writes**: DOM changes lost on re-render

### Delete Operations
- None - application doesn't delete data, only regenerates

## Data Relationships
- **`state.array` → `.array-bar` elements**: 1:1 mapping (60 bars → 60 array elements)
- **Index correlation**: Bar at index `i` corresponds to `array[i]`
- **Height correlation**: Bar height = `array[i]` pixels (with minimum 5px, maximum 730px)

## Indexes and Constraints
- No database indexes
- No SQL or NoSQL constraints
- Array length is effectively constrained to 60 by `NUMBER_OF_ARRAY_BARS` constant
- Values constrained to 5-730 by `randomIntFromInterval(5, 730)`

## Data Lifecycle
1. **Generated**: On component mount or "Generate New Array" click
2. **Displayed**: Renders 60 bars with corresponding heights
3. **Animated**: Merge sort modifies DOM styles temporarily
4. **Lost**: On page refresh, component unmount, or state reset
5. **No persistence mechanism**: No localStorage, no sessionStorage, no cookies

## Sensitive Data Handling
- No sensitive data in the application
- No personal information collected or stored
- No authentication data (app is completely public)
- All values are random integers (5-730)

## Migration and Schema Changes
- N/A - No database schema exists
- Application structure is fixed at runtime
- Can only change by modifying React component code
- To add persistence: would need to integrate localStorage or backend