import { useState, useMemo } from 'react'

// STEP 4: Sorting, Filtering & CSS `:has(:checked)` Row Highlighting
//
// TODO 1 (CSS `has-[:checked]` Row Highlight):
//   In Tailwind v4, you don't even need a ternary class on `<tr>` to highlight checked rows!
//   Add `has-[:checked]:bg-indigo-50/70 dark:has-[:checked]:bg-indigo-950/30` to each `<tr>`.
//
// TODO 2 (Sortable Header Button):
//   Wire up `handleSort(key)` on the "Customer" and "MRR" column header buttons,
//   and display an arrow indicator (`↑` or `↓`) when `sortConfig.key === key`.
//
// TODO 3 (Empty State with `colSpan={5}`):
//   When `filteredAndSorted.length === 0`, render a single `<tr>` with `<td colSpan={5}>`
//   centered with padding ("px-4 py-12 text-center text-slate-500") and a "Clear search" button.

const SUBSCRIPTIONS = [
  { id: 'SUB-1', customer: 'Linear', tier: 'Enterprise', seats: 140, mrr: 4200 },
  { id: 'SUB-2', customer: 'Raycast', tier: 'Pro', seats: 28, mrr: 840 },
  { id: 'SUB-3', customer: 'Vercel', tier: 'Enterprise', seats: 310, mrr: 9300 },
  { id: 'SUB-4', customer: 'Loom', tier: 'Starter', seats: 12, mrr: 240 },
  { id: 'SUB-5', customer: 'Retool', tier: 'Enterprise', seats: 95, mrr: 2850 },
]

export default function Step4SortFilterAndSelect() {
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'mrr', dir: 'desc' })
  const [selectedIds, setSelectedIds] = useState(['SUB-1'])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredAndSorted = useMemo(() => {
    return SUBSCRIPTIONS.filter((s) =>
      s.customer.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      const valA = a[sortConfig.key]
      const valB = b[sortConfig.key]
      const cmp =
        typeof valA === 'number'
          ? valA - valB
          : String(valA).localeCompare(String(valB))
      return sortConfig.dir === 'asc' ? cmp : -cmp
    })
  }, [search, sortConfig])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Step 4: Sort, Search &amp; <code>has-[:checked]</code> Selection
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open <code>src/lessons/Step4SortFilterAndSelect.jsx</code> and complete TODOs 1–3.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter customers..."
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Selected: {selectedIds.length} row(s)
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th scope="col" className="w-10 px-4 py-3">
                <span className="sr-only">Select</span>
              </th>
              <th scope="col" className="px-4 py-3">
                {/* TODO 2: Make Customer header a sortable button calling handleSort('customer') */}
                Customer
              </th>
              <th scope="col" className="px-4 py-3">Tier</th>
              <th scope="col" className="px-4 py-3 text-right">Seats</th>
              <th scope="col" className="px-4 py-3 text-right">
                {/* TODO 2: Make MRR header a sortable button calling handleSort('mrr') */}
                MRR
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {/* TODO 3: Handle empty state when filteredAndSorted.length === 0 */}
            {filteredAndSorted.map((sub) => (
              // TODO 1: Add has-[:checked]:bg-indigo-50/70 dark:has-[:checked]:bg-indigo-950/30
              <tr
                key={sub.id}
                className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
              >
                <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(sub.id)}
                    onChange={() => toggleRow(sub.id)}
                    className="rounded border-slate-300 accent-indigo-600 cursor-pointer"
                  />
                </td>
                <th scope="row" className="px-4 py-3.5 font-medium text-slate-900 dark:text-slate-100">
                  {sub.customer}
                </th>
                <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">{sub.tier}</td>
                <td className="px-4 py-3.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                  {sub.seats}
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-medium tabular-nums text-slate-900 dark:text-slate-100">
                  ${sub.mrr.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
