import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export default function SearchBar({ 
  onSearch, 
  placeholder = "Enter a Pokemon name or number (e.g., 'Pikachu' or '25')"
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-pokemon-blue' : 'text-gray-400'}`}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <input
          type="search"
          id="pokemon-search"
          name="pokemon-search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:border-transparent 
            transition-all duration-200 shadow-sm hover:shadow-md
            [&::-webkit-search-cancel-button]:appearance-none 
            [&::-webkit-search-decoration]:appearance-none 
            [&::-webkit-search-results-button]:appearance-none 
            [&::-webkit-search-results-decoration]:appearance-none
            bg-white/80 backdrop-blur-sm"
          aria-label="Search Pokemon"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {searchTerm && (
            <button
              onClick={() => handleSearch('')}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg 
                className="h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 