# Advanced Search Implementation

## Overview
The advanced search feature provides users with comprehensive filtering capabilities for the Pokédex, including type filtering, ability selection, physical characteristics, and number range filtering.

## Components Structure

### Search Components Hierarchy
```
src/
├── components/
│   ├── Search/
│   │   ├── SearchBar.jsx           // Main search with advanced toggle
│   │   ├── AdvancedSearch/
│   │   │   ├── index.jsx           // Container component
│   │   │   ├── TypeFilter.jsx      // Type & Weakness grid
│   │   │   ├── AbilitySelect.jsx   // Ability dropdown
│   │   │   ├── HeightFilter.jsx    // Height selection
│   │   │   ├── WeightFilter.jsx    // Weight selection
│   │   │   ├── NumberRange.jsx     // Pokédex range
│   │   │   └── SearchActions.jsx   // Reset & Search buttons
│   │   └── TypeBadge.jsx          // Reusable type badge
```

## Filter Specifications

### Type & Weakness Filter
- 18 Pokémon types with toggle buttons for Type (T) and Weakness (W)
- Types: Bug, Dragon, Fairy, Fire, Ghost, Ground, Normal, Psychic, Steel, Dark, Electric, Fighting, Flying, Grass, Ice, Poison, Rock, Water
- Each type has distinct color coding
- Toggle buttons for filtering by type and weakness

### Ability Filter
- Dropdown component with "All" as default
- Fetches available abilities from API
- Custom styled select with Pokéball icon

### Physical Characteristics
#### Height Filter
- Three categories with visual indicators
- Small, Medium, Large options
- White background selection boxes

#### Weight Filter
- Three categories with dot-stack indicators
- Light, Medium, Heavy options
- White background selection boxes

### Number Range Filter
- Min-Max input fields (1-1025 range)
- Numeric validation
- Hyphen separator between fields

## State Management

### Filter State Interface
```typescript
interface FilterState {
  search: string;
  types: Record<string, { 
    isType: boolean; 
    isWeakness: boolean 
  }>;
  ability: string;
  height: 'small' | 'medium' | 'large' | null;
  weight: 'light' | 'medium' | 'heavy' | null;
  numberRange: { 
    min: number; 
    max: number 
  } | null;
}
```

## Type Colors
```javascript
const typeColors = {
  bug: '#92BC2C',
  dragon: '#0C69C8',
  fairy: '#EE90E6',
  fire: '#FBA54C',
  ghost: '#5F6DBC',
  ground: '#E0C068',
  normal: '#A8A878',
  psychic: '#F85888',
  steel: '#B8B8D0',
  dark: '#705848',
  electric: '#F8D030',
  fighting: '#C03028',
  flying: '#A890F0',
  grass: '#78C850',
  ice: '#98D8D8',
  poison: '#A040A0',
  rock: '#B8A038',
  water: '#6890F0'
};
```

## Implementation Phases

### Phase 1: Core Structure
1. Advanced Search container with expand/collapse
2. Filter state management setup
3. SearchBar integration with advanced toggle

### Phase 2: Filter Components
4. TypeFilter with toggle buttons
5. NumberRange filter implementation
6. Height/Weight filter components
7. Ability dropdown integration

### Phase 3: Integration
8. API connection
9. Filter combination logic
10. Reset functionality
11. Loading states

### Phase 4: Polish
12. Type badge styling
13. Responsive design
14. Error handling
15. Filter state persistence 