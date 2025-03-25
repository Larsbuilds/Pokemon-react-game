# Advanced Search Implementation Plan

## Phase 1: Type & Weakness System
1. Create TypeToggleButton component
   ```jsx
   <TypeToggleButton
     type="fire"
     isTypeSelected={false}
     isWeaknessSelected={true}
     onToggle={(type, isType) => {}}
   />
   ```
2. Implement type colors from spec:
   ```javascript
   const typeColors = {
     bug: '#92BC2C',
     dragon: '#0C69C8',
     fairy: '#EE90E6',
     // ... (as specified in ADVANCED_SEARCH.md)
   }
   ```
3. Update state management to handle both type and weakness:
   ```typescript
   interface TypeState {
     [type: string]: {
       isType: boolean;
       isWeakness: boolean;
     }
   }
   ```

## Phase 2: Ability Filter
1. Create AbilitySelect component
   - Fetch abilities from PokeAPI
   - Implement custom dropdown with Pokéball icon
   - Add loading state for abilities fetch
2. Update filter state to include ability
3. Integrate with main filter system

## Phase 3: Physical Characteristics
1. Create HeightFilter component
   - Implement silhouette icons
   - Add three-state selection
   - Handle size category filtering
2. Create WeightFilter component
   - Implement dot-stack indicators
   - Add three-state selection
   - Handle weight category filtering
3. Update Pokemon fetching to include height/weight data

## Phase 4: UI Polish
1. Update NumberRange component
   - Add hyphen separator
   - Improve input styling
   - Add validation for min/max values
2. Create SearchActions component
   - Add Reset and Search buttons
   - Implement proper button styling
   - Add hover and focus states
3. Implement expand/collapse animation
4. Add responsive design adjustments

## Phase 5: Integration & Testing
1. Update filter combination logic
2. Add filter persistence
3. Implement error handling
4. Add loading states
5. Test filter combinations
6. Test edge cases
7. Performance optimization

## Component Structure Update
```
src/
├── components/
│   ├── Search/
│   │   ├── Advanced/
│   │   │   ├── TypeToggleButton.jsx
│   │   │   ├── AbilitySelect.jsx
│   │   │   ├── HeightFilter.jsx
│   │   │   ├── WeightFilter.jsx
│   │   │   ├── NumberRange.jsx
│   │   │   └── SearchActions.jsx
│   │   ├── AdvancedSearchPanel.jsx
│   │   └── SearchBar.jsx
```

## Styling Guidelines
1. Type Buttons:
   - Height: 40px
   - Border Radius: 8px
   - Background: Type-specific colors
   - Text: White, semi-bold

2. Toggle Buttons (T/W):
   - Size: 24px
   - Border: 2px solid
   - Border Radius: 50%
   - Active State: Filled
   - Inactive State: Outlined

3. Physical Characteristic Boxes:
   - Background: White
   - Border Radius: 8px
   - Shadow: light
   - Selected State: Blue border/highlight

4. Action Buttons:
   - Reset: Gray background
   - Search: Orange background
   - Text: White for Search, Dark for Reset
   - Border Radius: 8px
   - Padding: 12px 24px

## Data Management
1. Update filter state interface:
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

2. Add new API calls:
   - Fetch abilities list
   - Get Pokemon physical characteristics
   - Type weakness calculations

## Testing Checklist
- [ ] Type/Weakness toggle functionality
- [ ] Ability filter accuracy
- [ ] Height/Weight filter combinations
- [ ] Number range validation
- [ ] Filter persistence
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile responsiveness
- [ ] Performance with large datasets
- [ ] Accessibility compliance 