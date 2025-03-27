import React from 'react'

export function VersionBadges() {
  return (
    <div className="flex gap-2">
      {/* Blue Version */}
      <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      
      {/* Red Version */}
      <div className="w-10 h-10 rounded-full bg-red-400 border-4 border-white shadow-md flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
    </div>
  )
} 