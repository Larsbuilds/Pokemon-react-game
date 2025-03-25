import { useCallback } from 'react'
import TypeFilter from './AdvancedSearch/TypeFilter'

const allTypes = Object.keys({
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
});

const initialFilters = {
  types: allTypes.reduce((acc, type) => ({
    ...acc,
    [type]: { isType: false, isWeakness: false }
  }), {}),
  ability: '',
  height: null,
  weight: null,
  numberRange: { min: '', max: '' }
};

export default function AdvancedSearchPanel({ 
  onFilterChange,
  isExpanded = false,
  onToggleExpand,
  filters = initialFilters
}) {
  const handleTypeToggle = useCallback((type, filterType) => {
    onFilterChange({
      ...filters,
      types: {
        ...filters.types,
        [type]: {
          ...filters.types[type],
          [filterType]: !filters.types[type][filterType]
        }
      }
    });
  }, [filters, onFilterChange]);

  const handleNumberRangeChange = useCallback((field, value) => {
    onFilterChange({
      ...filters,
      numberRange: {
        ...filters.numberRange,
        [field]: value
      }
    });
  }, [filters, onFilterChange]);

  const handleReset = useCallback(() => {
    onFilterChange(initialFilters);
  }, [onFilterChange]);

  if (!isExpanded) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Type & Weakness Filter */}
        <TypeFilter 
          typeStates={filters.types}
          onTypeToggle={handleTypeToggle}
        />

        {/* Number Range Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pokédex Number Range</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min
              </label>
              <input
                type="number"
                min="1"
                max="1010"
                value={filters.numberRange.min}
                onChange={(e) => handleNumberRangeChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
                placeholder="1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max
              </label>
              <input
                type="number"
                min="1"
                max="1010"
                value={filters.numberRange.max}
                onChange={(e) => handleNumberRangeChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
                placeholder="1010"
              />
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700">Ability Filter</h4>
              <p className="text-sm text-gray-500">Select Pokemon by ability</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700">Physical Characteristics</h4>
              <p className="text-sm text-gray-500">Filter by height and weight</p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pokemon-blue"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
} 