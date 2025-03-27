import React from 'react'
import TypeBadge from '../TypeBadge'

export function WeaknessesSection({ weaknesses }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Weaknesses</h2>
      <div className="flex flex-wrap gap-2">
        {weaknesses.map(weakness => (
          <TypeBadge 
            key={weakness.type} 
            type={weakness.type}
            multiplier={weakness.multiplier}
          />
        ))}
      </div>
    </div>
  )
} 