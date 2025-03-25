import TypeBadge from '../TypeBadge';

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

const allTypes = Object.keys(typeColors);

export default function TypeFilter({ typeStates, onTypeToggle }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Type & Weakness</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {allTypes.map(type => (
          <div key={type} className="flex flex-col items-center space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => onTypeToggle(type, 'isType')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors
                  ${typeStates[type]?.isType 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                T
              </button>
              <button
                onClick={() => onTypeToggle(type, 'isWeakness')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors
                  ${typeStates[type]?.isWeakness 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                W
              </button>
            </div>
            <TypeBadge type={type} />
          </div>
        ))}
      </div>
    </div>
  );
} 