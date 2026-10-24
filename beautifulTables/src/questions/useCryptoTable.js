import { useState, useMemo } from 'react'
import { CRYPTO_ASSETS } from '../data/mockData'

// QUESTION 4 - CUSTOM HOOK: useCryptoTable
//
// Just like in dataFetching, separating state logic (filtering + sorting) into
// a custom hook keeps your Table UI component clean and readable!
//
// TODO 1: Maintain state for:
//   - `search` (initial: '')
//   - `category` (initial: 'ALL') -> options: 'ALL', 'Layer 1', 'Layer 2', 'DeFi'
//   - `sortConfig` (initial: `{ key: 'marketCapBillions', direction: 'desc' }`)
//
// TODO 2: Create a `handleSort(key)` function that:
//   - Toggles `direction` between 'desc' and 'asc' if clicking the same column `key`
//   - Defaults to 'desc' when clicking a new numeric column
//
// TODO 3: Compute `assets` (using `useMemo` or derived array):
//   - Filter `CRYPTO_ASSETS` by `category` and `search` (matching `name` or `symbol` case-insensitively)
//   - Sort a copy (`[...filtered]`) by `sortConfig.key` and `sortConfig.direction`
//
// TODO 4: Return `{ assets, search, setSearch, category, setCategory, sortConfig, handleSort }`

export function useCryptoTable() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCapBillions',
    direction: 'desc',
  })

  const handleSort = (key) => {
    // TODO 2: Implement column sort toggling
  }

  const assets = useMemo(() => {
    // TODO 3: Filter by category + search, then sort by sortConfig
    return CRYPTO_ASSETS
  }, [search, category, sortConfig])

  return {
    assets,
    search,
    setSearch,
    category,
    setCategory,
    sortConfig,
    handleSort,
  }
}
