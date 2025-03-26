import React from 'react'
import { usePokemon } from '../../hooks/usePokemon'
import OptimizedImage from '../OptimizedImage'
import TypeBadge from '../TypeBadge'
import LoadingSpinner from '../LoadingSpinner'
import ErrorMessage from '../ErrorMessage'
import { StatsChart } from './StatsChart'
import { EvolutionChain } from './EvolutionChain'

export function DetailView({ pokemonName }) {
  const { pokemon, loading, error } = usePokemon(pokemonName)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Failed to load Pokemon details" />
  if (!pokemon) return null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Pokemon Image */}
          <div className="w-96 h-96 flex items-center justify-center bg-gray-50 rounded-lg p-4">
            <OptimizedImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Pokemon Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
            <div className="text-gray-500 text-xl mb-4">#{pokemon.id.toString().padStart(3, '0')}</div>
            <div className="flex gap-2 mb-6">
              {pokemon.types.map(type => (
                <TypeBadge key={type.type.name} type={type.type.name} />
              ))}
            </div>
            <StatsChart stats={pokemon.stats} />
          </div>
        </div>
      </div>

      {/* Evolution Chain */}
      <EvolutionChain pokemonId={pokemon.id} />
    </div>
  )
} 