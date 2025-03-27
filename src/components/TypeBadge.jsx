const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#98D850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#F0B6BC'
};

export default function TypeBadge({ type }) {
  const backgroundColor = typeColors[type] || '#777';
  
  return (
    <span
      style={{ backgroundColor }}
      className="inline-block px-3 py-1 rounded-full text-sm text-white font-medium capitalize
        transform transition-all duration-200 hover:scale-105 hover:shadow-md
        cursor-default select-none"
    >
      {type}
    </span>
  );
} 