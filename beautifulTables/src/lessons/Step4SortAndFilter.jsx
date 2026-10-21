import { useState } from 'react'
import { TEAM_MEMBERS } from '../data/mockData'

// LESSON 4: Integrated Toolbar, Filter Pills & Sortable Column Headers
//
// Great tables attach their search & filter controls directly to the top of the card
// and let users sort columns by clicking headers.
//
// TODO 1 (Search & Status Filter Logic):
//   Filter `TEAM_MEMBERS` so a member matches if:
//   - `statusFilter === 'ALL'` OR `member.status === statusFilter`
//   - `member.name` or `member.role` (case-insensitive) includes `search`
//
// TODO 2 (Sorting Logic):
//   Sort the filtered list by `sortConfig.key` ('name' or 'salary'):
//   - If `sortConfig.direction === 'asc'`, sort ascending.
//   - If `sortConfig.direction === 'desc'`, sort descending.
//
// TODO 3 (Sortable Header UI):
//   Make the "Member" and "Salary" `<th>` headers clickable (`onClick={() => handleSort('name')}`):
//   - Add `cursor-pointer select-none hover:text-slate-200 transition-colors`
//   - Display a sort indicator next to the label:
//     `sortConfig.key === 'salary' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'`

export default function Step4SortAndFilter() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortConfig, setSortConfig] = useState({ key: 'salary', direction: 'desc' })

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // TODO 1 & TODO 2: Filter TEAM_MEMBERS by search + statusFilter, then sort by sortConfig!
  const processedMembers = TEAM_MEMBERS

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      {/* Integrated Card Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
        <div className="relative flex-1 min-w-[220px] max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or role..."
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5">
          {['ALL', 'Active', 'Invited', 'Offline'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              {/* TODO 3a: Make Member header sortable on click */}
              <th scope="col" className="px-6 py-3.5">
                Member
              </th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              {/* TODO 3b: Make Salary header sortable on click */}
              <th scope="col" className="px-6 py-3.5 text-right">
                Salary
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {processedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-100">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                  {member.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums text-slate-200">
                  ${member.salary.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
