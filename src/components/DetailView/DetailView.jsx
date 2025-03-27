import React from 'react'
import { usePokemon } from '../../hooks/usePokemon'
import OptimizedImage from '../OptimizedImage'
import TypeBadge from '../TypeBadge'
import LoadingSpinner from '../LoadingSpinner'
import ErrorMessage from '../ErrorMessage'
import { StatsChart } from './StatsChart'
import { EvolutionChain } from './EvolutionChain'
import { BasicInfo } from './BasicInfo'
import { WeaknessesSection } from './WeaknessesSection'
import { VersionBadges } from './VersionBadges'
import { AdditionalInfo } from './AdditionalInfo'

export function DetailView({ pokemonName }) {
  const { pokemon, loading, error } = usePokemon(pokemonName)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message="Failed to load Pokemon details" />
  if (!pokemon) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Name and Number */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <div className="text-gray-500 text-xl">#{pokemon.id.toString().padStart(3, '0')}</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Image and Stats */}
          <div className="space-y-8">
            {/* Image */}
            <div className="aspect-square bg-gray-50 rounded-lg p-4 shadow-inner">
              <OptimizedImage
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Stats Chart */}
            <StatsChart stats={pokemon.stats} loading={loading} />
          </div>

          {/* Right Column - Description and Info */}
          <div className="md:col-span-2">
            {/* Description */}
            <p className="text-lg text-gray-700 mb-8">
              {pokemon.description || "It carries a seed on its back right from birth. As its body grows larger, the seed does too."}
            </p>

            {/* Basic Info Grid - Height matches left column */}
            <div className="mb-8">
              <BasicInfo pokemon={pokemon} />
            </div>

            {/* Bottom Section - Types, Weaknesses, and Version aligned horizontally */}
            <div>
              {/* Labels Row */}
              <div className="grid grid-cols-3 gap-6 mb-4">
                <h2 className="text-xl font-bold">Type</h2>
                <h2 className="text-xl font-bold">Weaknesses</h2>
                <h2 className="text-xl font-bold">Versions</h2>
              </div>

              {/* Content Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Types */}
                <div className="flex flex-col items-start gap-2">
                  {pokemon.types.map(type => (
                    <TypeBadge 
                      key={type.type.name} 
                      type={type.type.name}
                    />
                  ))}
                </div>

                {/* Weaknesses */}
                <div className="flex flex-wrap gap-2">
                  {pokemon.weaknesses?.map(weakness => (
                    <TypeBadge 
                      key={weakness.type} 
                      type={weakness.type}
                    />
                  ))}
                </div>

                {/* Version Badges */}
                <div>
                  <VersionBadges versions={pokemon.versions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evolution Chain - Full Width */}
        <div className="mt-8">
          <EvolutionChain pokemonId={pokemon.id} />
        </div>

        {/* Additional Information - Full Width */}
        <AdditionalInfo pokemon={pokemon} />
      </div>
    </div>
  )
} 