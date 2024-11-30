import { create } from 'zustand'
import { TransformedGame } from '../types/api/games'

interface SearchState {
  query: string
  results: TransformedGame[]
  isLoading: boolean
  isOpen: boolean
  error: string | null
  setQuery: (query: string) => void
  setResults: (results: TransformedGame[]) => void
  setIsLoading: (isLoading: boolean) => void
  setIsOpen: (isOpen: boolean) => void
  setError: (error: string | null) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isLoading: false,
  isOpen: false,
  error: null,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setError: (error) => set({ error }),
  clearSearch: () => set({ query: '', results: [], isOpen: false, error: null }),
}))