import React from 'react'

const STAT_COLORS = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-purple-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-blue-500'
}

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed'
}

export function StatsChart({ stats }) {
  if (!stats) return null

  const maxStat = Math.max(...stats.map(stat => stat.base_stat))

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Base Stats</h2>
      <div className="space-y-4">
        {stats.map(stat => {
          const percentage = (stat.base_stat / maxStat) * 100
          return (
            <div key={stat.stat.name} className="flex items-center">
              <div className="w-24 text-sm font-medium capitalize">
                {STAT_LABELS[stat.stat.name]}
              </div>
              <div className="flex-1 ml-4">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${STAT_COLORS[stat.stat.name]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {stat.base_stat}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 