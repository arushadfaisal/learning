import { useState, useMemo } from 'react'
import { INVENTORY, formatUSD } from './tableData'

// CHALLENGE 5 - UI: Filterable & Sortable Inventory with Stock Progress Bars
//
// Build an interactive hardware inventory table from `INVENTORY`.
//
// TODO 1 (Filter & Sort State):
//   - Keep state for:
//     - `search` (string, `''`)
//     - `category` (`'All'`, `'Hardware'`, `'Audio'`, or `'Accessories'`)
//     - `sortBy` (`{ key: 'price', dir: 'desc' }`)
//   - Use `useMemo` to filter `INVENTORY` by `category` and `search` (matching `name` or `sku`),
//     then sort by `sortBy.key` and `sortBy.dir`.
//
// TODO 2 (Filter Toolbar & Sortable Column Headers):
//   - Above the table, render category pill buttons (`['All', 'Hardware', 'Audio', 'Accessories']`)
//     and a search `<input>`.
//   - Make the "Stock" and "Price" `<th>` headers clickable buttons that toggle sorting and display `↑` / `↓`.
//
// TODO 3 (Visual Stock Level Bar Cell):
//   - In the "Stock" column, render:
//     1) The numeric ratio (`{item.stock} / {item.maxStock}`) in `font-mono text-xs tabular-nums`
//     2) A progress bar track (`h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700`)
//        with a fill bar (`style={{ width: `${(item.stock / item.maxStock) * 100}%` }}`) colored:
//        - `bg-rose-500` if `item.stock < 10` (Low Stock!)
//        - `bg-emerald-500` otherwise.
//
// TODO 4 (Empty State Row):
//   - When no products match the filter, render a single `<tr>` with `<td colSpan={5}>`
//     displaying "No products match your filter" and a button to reset `search` and `category`.

export default function Question5SortableInventory() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 5: Search, Sort, Stock Progress Bars &amp; Empty State
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: Category pills, sortable headers, in-cell stock level bars, and <code>colSpan</code> empty state.
        </p>
      </div>

      {/* Build your filter bar and sortable inventory table here! */}
    </div>
  )
}
