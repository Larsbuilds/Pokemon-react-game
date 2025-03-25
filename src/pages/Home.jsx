import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import { usePokemonList } from '../hooks/usePokemon'
import ErrorMessage from '../components/ErrorMessage'

export default function Home() {
  const [page, setPage] = useState(1)
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const { pokemon, loading, error, hasMore, isLoadingAll, currentOffset, totalPokemon } = usePokemonList(page)
  const observer = useRef()
  const lastPokemonRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // Load more when we're 80% through the current list
        if (currentOffset < totalPokemon * 0.8) {
          setPage(prev => prev + 1)
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, currentOffset, totalPokemon])

  // Initialize filtered Pokemon list when main Pokemon list changes
  useEffect(() => {
    setFilteredPokemon(pokemon)
  }, [pokemon])

  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPokemon(pokemon)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = pokemon.filter((p) => {
      const pokemonNumber = p.url.split('/').slice(-2, -1)[0]
      
      // If search term is a number, do exact match
      if (/^\d+$/.test(searchTerm)) {
        return pokemonNumber === searchTerm
      }
      
      // For text search, match name
      return p.name.toLowerCase().includes(searchTermLower)
    })
    setFilteredPokemon(filtered)
  }, [pokemon])

  // Memoize the search handler to prevent unnecessary re-renders
  const memoizedSearchHandler = useCallback((value) => {
    handleSearch(value)
  }, [handleSearch])

  const renderContent = () => {
    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ErrorMessage error={error} onRetry={() => window.location.reload()} />
        </div>
      )
    }

    return (
      <>
        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((p, index) => (
              <Link 
                key={p.name} 
                to={`/pokemon/${p.name}`}
                className="block h-full"
                ref={index === filteredPokemon.length - 1 ? lastPokemonRef : null}
              >
                <PokemonCard name={p.name} />
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredPokemon.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No Pokémon found. Try a different search term.
          </div>
        )}

        {/* Loading More */}
        {loading && pokemon.length > 0 && (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="medium" color="blue" />
          </div>
        )}

        {/* End of List */}
        {!hasMore && !loading && filteredPokemon.length > 0 && (
          <div className="text-center py-8 text-gray-600">
            You've caught them all! No more Pokémon to load.
          </div>
        )}
      </>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section - Always visible */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokédex</h1>
          <p className="text-lg text-gray-600">Search for Pokémon by name or number</p>
        </div>

        {/* Search Section - Always visible */}
        <div className="mb-12">
          <SearchBar 
            onSearch={memoizedSearchHandler}
            placeholder="Enter a Pokemon name or number (e.g., 'Pikachu' or '25')"
          />
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  )
} 