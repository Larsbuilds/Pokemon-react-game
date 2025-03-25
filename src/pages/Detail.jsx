import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TypeBadge from '../components/TypeBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import OptimizedImage from '../components/OptimizedImage'
import { usePokemonCache } from '../hooks/usePokemonCache'
import ErrorMessage from '../components/ErrorMessage'

export default function Detail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { getPokemon } = usePokemonCache()

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPokemon(name)
        setPokemon(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [name, getPokemon])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pokemon-red"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorMessage error={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorMessage error={{ message: 'Pokemon not found' }} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-pokemon-blue hover:text-pokemon-red mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Pokédex
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-48 h-48">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Types</h2>
                <div className="flex space-x-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`px-3 py-1 rounded-full text-white capitalize ${
                        type.type.name === 'fire'
                          ? 'bg-red-500'
                          : type.type.name === 'water'
                          ? 'bg-blue-500'
                          : type.type.name === 'grass'
                          ? 'bg-green-500'
                          : type.type.name === 'electric'
                          ? 'bg-yellow-500'
                          : type.type.name === 'psychic'
                          ? 'bg-purple-500'
                          : type.type.name === 'ice'
                          ? 'bg-cyan-500'
                          : type.type.name === 'dragon'
                          ? 'bg-indigo-500'
                          : type.type.name === 'dark'
                          ? 'bg-gray-800'
                          : type.type.name === 'fairy'
                          ? 'bg-pink-500'
                          : type.type.name === 'normal'
                          ? 'bg-gray-500'
                          : type.type.name === 'fighting'
                          ? 'bg-orange-500'
                          : type.type.name === 'flying'
                          ? 'bg-sky-500'
                          : type.type.name === 'poison'
                          ? 'bg-purple-500'
                          : type.type.name === 'ground'
                          ? 'bg-yellow-600'
                          : type.type.name === 'rock'
                          ? 'bg-yellow-700'
                          : type.type.name === 'bug'
                          ? 'bg-green-600'
                          : type.type.name === 'ghost'
                          ? 'bg-indigo-600'
                          : 'bg-gray-500'
                      }`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center">
                      <span className="w-24 capitalize">{stat.stat.name}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-pokemon-red rounded-full"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-right">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 