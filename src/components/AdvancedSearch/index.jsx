import { useState } from 'react';
import TypeFilter from './TypeFilter';

export default function AdvancedSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    types: {},
    ability: '',
    height: null,
    weight: null,
    numberRange: null
  });

  const handleTypeFilterChange = (typeStates) => {
    setFilters(prev => ({
      ...prev,
      types: typeStates
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Advanced Search</h2>
      
      {/* Type & Weakness Filter */}
      <TypeFilter onFilterChange={handleTypeFilterChange} />

      {/* Placeholder for other filters */}
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

      {/* Search Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setFilters({
            types: {},
            ability: '',
            height: null,
            weight: null,
            numberRange: null
          })}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
} 