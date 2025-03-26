import { memo } from 'react';

const heightCategories = [
  { id: 'small', label: 'Small', maxHeight: 0.5 },
  { id: 'medium', label: 'Medium', maxHeight: 1.5 },
  { id: 'large', label: 'Large', maxHeight: Infinity }
];

const weightCategories = [
  { id: 'light', label: 'Light', maxWeight: 10 },    // Up to 10kg
  { id: 'medium', label: 'Medium', maxWeight: 50 },  // 10-50kg
  { id: 'heavy', label: 'Heavy', maxWeight: Infinity } // Over 50kg
];

function PhysicalCharacteristics({ 
  selectedHeight, 
  selectedWeight, 
  onHeightChange, 
  onWeightChange 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Height Filter */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Height</h3>
        <div className="grid grid-cols-3 gap-4">
          {heightCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onHeightChange(category.id)}
              className={`aspect-square bg-white rounded-lg p-4 transition-all duration-200
                ${selectedHeight === category.id 
                  ? 'ring-2 ring-pokemon-blue shadow-lg' 
                  : 'hover:ring-2 hover:ring-pokemon-blue/50'}`}
              aria-pressed={selectedHeight === category.id}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-8 h-8 mb-2">
                  {/* Height silhouette SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`w-full h-full ${
                      selectedHeight === category.id ? 'text-pokemon-blue' : 'text-gray-600'
                    }`}
                  >
                    <path
                      d="M12 2L12 22M8 6L12 2L16 6M8 18L12 22L16 18"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${
                  selectedHeight === category.id ? 'text-pokemon-blue' : 'text-gray-600'
                }`}>
                  {category.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Weight Filter */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Weight</h3>
        <div className="grid grid-cols-3 gap-4">
          {weightCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onWeightChange(category.id)}
              className={`aspect-square bg-white rounded-lg p-4 transition-all duration-200
                ${selectedWeight === category.id 
                  ? 'ring-2 ring-pokemon-blue shadow-lg' 
                  : 'hover:ring-2 hover:ring-pokemon-blue/50'}`}
              aria-pressed={selectedWeight === category.id}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-8 h-8 mb-2">
                  {/* Weight dots SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`w-full h-full ${
                      selectedWeight === category.id ? 'text-pokemon-blue' : 'text-gray-600'
                    }`}
                  >
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${
                  selectedWeight === category.id ? 'text-pokemon-blue' : 'text-gray-600'
                }`}>
                  {category.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PhysicalCharacteristics); 