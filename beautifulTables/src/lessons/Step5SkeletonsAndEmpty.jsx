import { useState } from 'react'
import { TEAM_MEMBERS } from '../data/mockData'

// LESSON 5: Shimmer Row Skeletons, Empty States & Pagination Footer
//
// Never replace a table with plain `<p>Loading...</p>`! That causes jarring layout shift.
// Instead, keep the `<table>` and `<thead>` mounted, and render skeleton rows inside `<tbody>`!
//
// TODO 1 (Shimmer Skeleton Rows):
//   When `viewMode === 'loading'`, render 4 skeleton `<tr>` rows inside `<tbody>`.
//   Inside each `<td>`, put gray bars with `animate-pulse rounded bg-slate-800`:
//   - Col 1 (Member): a circle (`h-9 w-9 rounded-full bg-slate-800 animate-pulse`) + two stacked bars (`h-3.5 w-28` and `h-2.5 w-36`)
//   - Col 2 (Role): `h-3.5 w-32 rounded bg-slate-800 animate-pulse`
//   - Col 3 (Status): `h-5 w-16 rounded-full bg-slate-800 animate-pulse`
//   - Col 4 (Salary): `ml-auto h-3.5 w-20 rounded bg-slate-800 animate-pulse`
//
// TODO 2 (Rich Empty State inside `<td colSpan={4}>`):
//   When `viewMode === 'empty'` (or `rows.length === 0`), render a single `<tr>` with `<td colSpan={4} className="px-6 py-12 text-center">`:
//   - Show a subtle title ("No team members found"), helper text, and a button that switches `setViewMode('data')`.
//
// TODO 3 (Pagination Footer):
//   At the bottom of the card (below `</table>`), add a footer bar:
//   `flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-6 py-3 text-xs text-slate-400`
//   Show "Showing X to Y of Z results" on the left, and "Previous" / "Next" buttons on the right.

const PAGE_SIZE = 3

export default function Step5SkeletonsAndEmpty() {
  const [viewMode, setViewMode] = useState('data') // 'data' | 'loading' | 'empty'
  const [page, setPage] = useState(1)

  const totalItems = TEAM_MEMBERS.length
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)
  const startIndex = (page - 1) * PAGE_SIZE
  const paginatedRows = viewMode === 'empty' ? [] : TEAM_MEMBERS.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <div className="space-y-4">
      {/* Simulator Controls to test all 3 states */}
      <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-xs">
        <span className="px-2 font-medium text-slate-400">Simulate State:</span>
        {[
          { id: 'data', label: '✅ Loaded Data' },
          { id: 'loading', label: '⏳ Loading Skeleton' },
          { id: 'empty', label: '🔍 Empty State' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            className={`rounded-md px-3 py-1.5 font-medium cursor-pointer ${viewMode === tab.id
              ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
              : 'text-slate-400 hover:bg-slate-800'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3.5">Member</th>
                <th scope="col" className="px-6 py-3.5">Role</th>
                <th scope="col" className="px-6 py-3.5">Status</th>
                <th scope="col" className="px-6 py-3.5 text-right">Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
              {/* TODO 1: Replace this ugly Loading text with 3 shimmer skeleton rows! */}
              {viewMode === 'loading' && (
                Array.from({ length: 3 }).map((_value, index) => (
                  <tr key={index}>
                    <td scope="col" className="px-6 py-4">
                      <div className='flex items-center gap-3'>
                        <div className="h-9 w-9 rounded-full bg-slate-800 animate-pulse"></div>
                        <div className="flex flex-col gap-1">
                          <div className="h-3.5 w-28 rounded bg-slate-800 animate-pulse"></div>
                          <div className="h-2.5 w-36 rounded bg-slate-800 animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td scope="col" className="px-6 py-4">
                      <div className="h-3.5 w-32 rounded bg-slate-800 animate-pulse"></div>
                    </td>
                    <td scope="col" className="px-6 py-4">
                      <div className="h-5 w-16 rounded-full bg-slate-800 animate-pulse"></div>
                    </td>
                    <td scope="col" className="px-6 py-4">
                      <div className="ml-auto h-3.5 w-20 rounded bg-slate-800 animate-pulse"></div>
                    </td>
                  </tr>
                ))
              )}

              {/* TODO 2: Upgrade this Empty State with centered layout, description, and Reset button */}
              {viewMode !== 'loading' && paginatedRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <h3 className="text-base font-semibold text-white">No team members found</h3>
                    <p className="mt-1 text-sm text-slate-400">Get started by adding a new team member.</p>
                    <button
                      onClick={() => setViewMode('data')}
                      className="mt-4 rounded-md bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-500/30 cursor-pointer"
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              )}

              {/* Loaded Data Rows */}
              {viewMode !== 'loading' &&
                paginatedRows.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}>
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">{member.name}</div>
                          <div className="text-xs text-slate-400">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
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

        {/* TODO 3: Add a clean Pagination Footer bar here with Previous / Next buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-6 py-3 text-xs text-slate-400">
          <span>Showing {startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, totalItems)} of {totalItems} results</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="rounded-md bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="rounded-md bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
