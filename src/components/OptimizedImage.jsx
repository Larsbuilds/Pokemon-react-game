import { useState, useEffect } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  fallbackSrc,
  className = '',
  containerClassName = ''
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      setIsLoading(false)
      setCurrentSrc(src)
    }

    img.onerror = () => {
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc)
      } else {
        setError(true)
      }
      setIsLoading(false)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, fallbackSrc])

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Main image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`
          ${className}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
        `}
        loading="lazy"
      />

      {/* Error state with icon */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg 
            className="w-8 h-8 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
      )}
    </div>
  )
} 