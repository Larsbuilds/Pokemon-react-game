import React from 'react'

export function VersionBadges({ versions }) {
  if (!versions) return null;

  return (
    <div className="flex gap-2">
      {versions.map(version => (
        <div 
          key={version.name}
          className="relative group"
        >
          {/* Version Badge */}
          <div className={`
            w-10 h-10 rounded-full border-4 border-white shadow-md 
            flex items-center justify-center transition-transform duration-300
            ${version.name.includes('red') 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
            }
            group-hover:scale-110
          `}>
            {/* Version Icon */}
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>

          {/* Version Name Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 
            bg-gray-800 text-white text-xs rounded px-2 py-1 
            pointer-events-none whitespace-nowrap z-10"
          >
            {version.name.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
            {/* Tooltip arrow */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
              w-2 h-2 bg-gray-800 rotate-45"
            />
          </div>
        </div>
      ))}
    </div>
  )
} 