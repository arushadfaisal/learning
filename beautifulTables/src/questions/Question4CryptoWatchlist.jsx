import { useCryptoTable } from './useCryptoTable'

// QUESTION 4 - UI: Sortable & Filterable Crypto Market Watchlist
//
// Rule: Keep filtering & sorting state inside `useCryptoTable.js`!
//
// TODO 1: Consume `useCryptoTable()` to get `{ assets, search, setSearch, category, setCategory, sortConfig, handleSort }`.
//
// TODO 2: Render the integrated Card Toolbar:
//   - Search input bound to `search` / `setSearch`
//   - Category filter buttons: `['ALL', 'Layer 1', 'Layer 2', 'DeFi']`
//
// TODO 3: Render Sortable Column Headers:
//   - Columns: `#` (rank), `Asset` (name + symbol badge), `Category`, `Price` (sortable), `24h Change` (sortable), `Market Cap` (sortable).
//   - Clicking `Price` ('price'), `24h Change` ('change24h'), or `Market Cap` ('marketCapBillions') calls `handleSort(key)` and displays `↑` / `↓` / `↕`.
//
// TODO 4: Render Numeric & Delta Cells:
//   - Right-align `Price`, `24h Change`, and `Market Cap` with `font-mono tabular-nums`.
//   - Format `change24h` as a colored pill or text:
//     Positive (`> 0`): `+4.82%` in `text-emerald-400 bg-emerald-500/10`
//     Negative (`< 0`): `-1.64%` in `text-rose-400 bg-rose-500/10`
//   - If `assets.length === 0`, render a clean `<td colSpan={6}>` empty state with a "Reset filters" button!

export default function Question4CryptoWatchlist() {
  const {
    assets,
    search,
    setSearch,
    category,
    setCategory,
    sortConfig,
    handleSort,
  } = useCryptoTable()

  return (
    <div>
      {/* Build your Sortable Crypto Market Watchlist here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/useCryptoTable.js</code> and <code>src/questions/Question4CryptoWatchlist.jsx</code>!
      </p>
    </div>
  )
}
