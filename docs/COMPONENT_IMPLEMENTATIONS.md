# Component Implementation Details

## Search Components

### Enhanced SearchBar
```jsx
// SearchBar.jsx
export default function SearchBar({ onSearch, onToggleAdvanced, isAdvancedVisible }) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Name or Number"
          className="w-full px-4 py-2 rounded-lg border"
        />
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={onToggleAdvanced}
        >
          {isAdvancedVisible ? 'Hide' : 'Show'} Advanced Search
        </button>
      </div>
    </div>
  );
}
```

### TypeFilter
```jsx
// TypeFilter.jsx
export default function TypeFilter({ onTypeChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(typeColors).map(([type, color]) => (
        <div key={type} className="flex items-center">
          <button
            style={{ backgroundColor: color }}
            className="px-4 py-2 rounded-lg text-white"
          >
            {type}
          </button>
          <div className="flex ml-2">
            <Toggle label="T" onChange={(val) => onTypeChange(type, 'type', val)} />
            <Toggle label="W" onChange={(val) => onTypeChange(type, 'weakness', val)} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### AbilitySelect
```jsx
// AbilitySelect.jsx
export default function AbilitySelect({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white appearance-none"
      >
        <option value="">All</option>
        {/* Abilities will be populated from API */}
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {/* Pokéball icon */}
      </div>
    </div>
  );
}
```

### HeightFilter & WeightFilter
```jsx
// HeightFilter.jsx
export default function HeightFilter({ value, onChange }) {
  return (
    <div className="flex space-x-4">
      {['small', 'medium', 'large'].map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`p-4 rounded-lg bg-white ${
            value === size ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          {/* Size icon */}
        </button>
      ))}
    </div>
  );
}

// WeightFilter.jsx - Similar structure with different icons
```

### NumberRange
```jsx
// NumberRange.jsx
export default function NumberRange({ value, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        min={1}
        max={1025}
        value={value.min}
        onChange={(e) => onChange({ ...value, min: e.target.value })}
        className="w-24 px-2 py-1 rounded border"
      />
      <span>-</span>
      <input
        type="number"
        min={1}
        max={1025}
        value={value.max}
        onChange={(e) => onChange({ ...value, max: e.target.value })}
        className="w-24 px-2 py-1 rounded border"
      />
    </div>
  );
}
```

## Hooks

### usePokemonFilters
```typescript
// hooks/usePokemonFilters.js
export function usePokemonFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const toggleAdvanced = () => setIsAdvancedVisible(prev => !prev);

  return {
    filters,
    isAdvancedVisible,
    updateFilter,
    resetFilters,
    toggleAdvanced
  };
}
```

## API Integration

### Pokemon API Utilities
```typescript
// utils/api.js
export const pokemonAPI = {
  searchPokemon: async (filters: FilterState) => {
    const params = new URLSearchParams();
    
    // Add search params
    if (filters.search) params.append('search', filters.search);
    
    // Add number range
    if (filters.numberRange) {
      params.append('min', String(filters.numberRange.min));
      params.append('max', String(filters.numberRange.max));
    }
    
    // Add type filters
    const activeTypes = Object.entries(filters.types)
      .filter(([_, status]) => status.isType)
      .map(([type]) => type);
    if (activeTypes.length) {
      params.append('types', activeTypes.join(','));
    }
    
    // Add other filters...
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${params}`);
    return response.json();
  },

  getAbilities: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/ability');
    return response.json();
  }
};
```

## Styling

### Tailwind Extensions
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pokemon: typeColors
      },
      animation: {
        'slide-down': 'slideDown 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-10px)', opacity: 0 },
        }
      }
    }
  }
} 