import { useState, useEffect } from 'react'
import axios from 'axios'

export function usePokemon(name) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setPokemon(response.data)
      } catch (error) {
        setError(error)
        console.error('Error fetching pokemon:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [name])

  return { pokemon, loading, error }
}

export function usePokemonList(page = 1, itemsPerPage = 12) {
  const [pokemon, setPokemon] = useState([])
  const [allPokemon, setAllPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingAll, setIsLoadingAll] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const totalPokemon = 151 // First generation Pokemon count

  // Initial load of first page
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=0`)
        setPokemon(res.data.results)
        setCurrentOffset(itemsPerPage)
        setHasMore(currentOffset < totalPokemon)
      } catch (error) {
        setError(error)
        console.error('Error fetching initial pokemon list:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [itemsPerPage])

  // Background loading of all Pokemon
  useEffect(() => {
    let isMounted = true

    const fetchAllPokemon = async () => {
      if (isLoadingAll || allPokemon.length > 0) return
      
      try {
        setIsLoadingAll(true)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}&offset=0`)
        if (isMounted) {
          setAllPokemon(res.data.results)
        }
      } catch (error) {
        console.error('Error fetching all pokemon:', error)
      } finally {
        if (isMounted) {
          setIsLoadingAll(false)
        }
      }
    }
    fetchAllPokemon()

    return () => {
      isMounted = false
    }
  }, [])

  // Load more when scrolling
  useEffect(() => {
    const fetchMoreData = async () => {
      if (page === 1 || loading || !hasMore || currentOffset >= totalPokemon) return

      try {
        setLoading(true)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${currentOffset}`)
        setPokemon(prev => [...prev, ...res.data.results])
        setCurrentOffset(prev => prev + itemsPerPage)
        setHasMore(currentOffset + itemsPerPage < totalPokemon)
      } catch (error) {
        setError(error)
        console.error('Error fetching more pokemon:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMoreData()
  }, [page, itemsPerPage, loading, hasMore, currentOffset])

  return { 
    pokemon: allPokemon.length > 0 ? allPokemon : pokemon, 
    loading, 
    error, 
    hasMore,
    isLoadingAll,
    currentOffset,
    totalPokemon
  }
} 