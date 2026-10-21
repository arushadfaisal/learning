import { useState, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  TEAM_MEMBERS,
  INVOICES,
  INVENTORY_ITEMS,
  CRYPTO_ASSETS,
  CUSTOMER_ORDERS,
} from '../data/mockData'
import { PAGE_SIZE } from '../questions/useServerUsersTable'

const STATUS_BADGE = {
  Active: {
    pill: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  Invited: {
    pill: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
    dot: 'bg-amber-400',
  },
  Offline: {
    pill: 'bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20',
    dot: 'bg-slate-400',
  },
}

// ==========================================
// TARGET: Step 1 Foundation
// ==========================================
export function TargetStep1() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">Name</th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Department</th>
              <th scope="col" className="px-6 py-3.5">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {TEAM_MEMBERS.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-100">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">{member.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">{member.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Step 2 Cells & Badges
// ==========================================
export function TargetStep2() {
  return (
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
            {TEAM_MEMBERS.map((member) => {
              const style = STATUS_BADGE[member.status]
              return (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-slate-100">{member.name}</div>
                        <div className="text-xs text-slate-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-200">{member.role}</div>
                    <div className="text-xs text-slate-500">{member.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.pill}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-200">
                    ${member.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Step 3 Row States
// ==========================================
export function TargetStep3() {
  const [selectedIds, setSelectedIds] = useState(['usr-2'])
  const [lastAction, setLastAction] = useState(null)

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const allSelected = selectedIds.length === TEAM_MEMBERS.length
  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : TEAM_MEMBERS.map((m) => m.id))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Selected rows: <strong className="text-indigo-400">{selectedIds.length}</strong> of {TEAM_MEMBERS.length}</span>
        {lastAction && (
          <span className="rounded bg-indigo-500/10 px-2.5 py-1 text-indigo-300">
            Last action: {lastAction}
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="w-12 px-6 py-3.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 accent-indigo-500 cursor-pointer"
                  />
                </th>
                <th scope="col" className="px-6 py-3.5">Member</th>
                <th scope="col" className="px-6 py-3.5">Role</th>
                <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
              {TEAM_MEMBERS.map((member) => {
                const isSelected = selectedIds.includes(member.id)
                return (
                  <tr
                    key={member.id}
                    className={`group transition-colors ${
                      isSelected
                        ? 'bg-indigo-500/10 hover:bg-indigo-500/15'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(member.id)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 accent-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}>
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">{member.name}</div>
                          <div className="text-xs text-slate-400">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                        <button
                          onClick={() => setLastAction(`Edited ${member.name}`)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700/70 hover:text-white cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setLastAction(`Removed ${member.name}`)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-rose-400 hover:bg-rose-500/15 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Step 4 Sort & Filter
// ==========================================
export function TargetStep4() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortConfig, setSortConfig] = useState({ key: 'salary', direction: 'desc' })

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const processedMembers = TEAM_MEMBERS.filter((m) => {
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter
    const q = search.toLowerCase()
    const matchesSearch = m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  }).sort((a, b) => {
    const valA = a[sortConfig.key]
    const valB = b[sortConfig.key]
    if (typeof valA === 'string') {
      return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
    }
    return sortConfig.direction === 'asc' ? valA - valB : valB - valA
  })

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="text-slate-600">↕</span>
    return <span className="text-indigo-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
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

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th
                scope="col"
                onClick={() => handleSort('name')}
                className="px-6 py-3.5 cursor-pointer select-none hover:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-1.5">Member {getSortIcon('name')}</span>
              </th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th
                scope="col"
                onClick={() => handleSort('salary')}
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-1.5">Salary {getSortIcon('salary')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {processedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-100">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">{member.role}</td>
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

// ==========================================
// TARGET: Step 5 Skeletons, Empty & Pagination
// ==========================================
export function TargetStep5() {
  const [viewMode, setViewMode] = useState('data')
  const [page, setPage] = useState(1)
  const PAGE_LIMIT = 3

  const totalItems = TEAM_MEMBERS.length
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT)
  const startIndex = (page - 1) * PAGE_LIMIT
  const paginatedRows = viewMode === 'empty' ? [] : TEAM_MEMBERS.slice(startIndex, startIndex + PAGE_LIMIT)

  return (
    <div className="space-y-4">
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
            className={`rounded-md px-3 py-1.5 font-medium cursor-pointer ${
              viewMode === tab.id
                ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
              {viewMode === 'loading' &&
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-800 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-3.5 w-28 rounded bg-slate-800 animate-pulse" />
                          <div className="h-2.5 w-36 rounded bg-slate-800/70 animate-pulse" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-3.5 w-32 rounded bg-slate-800 animate-pulse" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 w-16 rounded-full bg-slate-800 animate-pulse" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="ml-auto h-3.5 w-20 rounded bg-slate-800 animate-pulse" />
                    </td>
                  </tr>
                ))}

              {viewMode !== 'loading' && paginatedRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="mx-auto max-w-xs space-y-2">
                      <div className="text-base font-medium text-slate-200">No team members found</div>
                      <p className="text-xs text-slate-400">
                        We couldn't find any members matching your current filters.
                      </p>
                      <button
                        onClick={() => setViewMode('data')}
                        className="mt-2 inline-flex items-center rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30 hover:bg-indigo-500/30 cursor-pointer"
                      >
                        Reset View
                      </button>
                    </div>
                  </td>
                </tr>
              )}

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

        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-6 py-3 text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{paginatedRows.length ? startIndex + 1 : 0}</strong> to{' '}
            <strong className="text-slate-200">{startIndex + paginatedRows.length}</strong> of{' '}
            <strong className="text-slate-200">{totalItems}</strong> results
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || viewMode !== 'data'}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || viewMode !== 'data'}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 1 Team Directory
// ==========================================
export function TargetQuestion1() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">Member</th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th scope="col" className="px-6 py-3.5">Last Active</th>
              <th scope="col" className="px-6 py-3.5 text-right">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {TEAM_MEMBERS.map((member) => {
              const badge = STATUS_BADGE[member.status]
              return (
                <tr key={member.id} className="group hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-slate-100">{member.name}</div>
                        <div className="text-xs text-slate-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-200">{member.role}</div>
                    <div className="text-xs text-slate-500">{member.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.pill}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-200">
                    ${member.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 2 Invoice Ledger
// ==========================================
const INVOICE_BADGES = {
  Paid: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
  Overdue: 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20',
}

export function TargetQuestion2() {
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = INVOICES.filter(
    (inv) => statusFilter === 'ALL' || inv.status === statusFilter
  )
  const totalAmount = filtered.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Billing Invoices</h3>
          <p className="text-xs text-slate-400">Recent enterprise billing statements</p>
        </div>
        <div className="flex items-center gap-1.5">
          {['ALL', 'Paid', 'Pending', 'Overdue'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">Invoice</th>
              <th scope="col" className="px-6 py-3.5">Client</th>
              <th scope="col" className="px-6 py-3.5">Schedule</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {filtered.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-indigo-400">
                  #{inv.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-slate-100">{inv.client}</div>
                  <div className="text-xs text-slate-400">{inv.plan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs text-slate-300">Issued: {inv.issuedDate}</div>
                  <div className="text-xs text-slate-500">Due: {inv.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${INVOICE_BADGES[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-100">
                  ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-slate-800 bg-slate-900/90">
            <tr>
              <td colSpan={4} className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total ({filtered.length} invoices)
              </td>
              <td className="px-6 py-4 text-right font-mono tabular-nums text-base font-bold text-white">
                ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 3 Bulk Inventory
// ==========================================
export function TargetQuestion3() {
  const [items, setItems] = useState(INVENTORY_ITEMS)
  const [selectedIds, setSelectedIds] = useState(['SKU-8802'])

  const allSelected = items.length > 0 && selectedIds.length === items.length

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : items.map((i) => i.id))
  }

  const handleBulkRestock = () => {
    setItems((prev) =>
      prev.map((item) => {
        if (!selectedIds.includes(item.id)) return item
        const nextStock = item.stock + 10
        return {
          ...item,
          stock: nextStock,
          status: nextStock > 10 ? 'In Stock' : 'Low Stock',
        }
      })
    )
  }

  const handleBulkDelete = () => {
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)))
    setSelectedIds([])
  }

  return (
    <div className="space-y-3">
      {/* Contextual Bulk Action Bar */}
      {selectedIds.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3">
          <span className="text-xs font-semibold text-indigo-200">
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkRestock}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30 hover:bg-emerald-500/30 cursor-pointer"
            >
              +10 Restock Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-300 ring-1 ring-inset ring-rose-500/30 hover:bg-rose-500/30 cursor-pointer"
            >
              Delete Selected
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-3 text-xs text-slate-400">
          <span>Select inventory rows below to reveal bulk actions.</span>
          <button
            onClick={() => setItems(INVENTORY_ITEMS)}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Reset Demo Inventory
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="w-12 px-6 py-3.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 accent-indigo-500 cursor-pointer"
                  />
                </th>
                <th scope="col" className="px-6 py-3.5">Product</th>
                <th scope="col" className="px-6 py-3.5">Category</th>
                <th scope="col" className="px-6 py-3.5">Status</th>
                <th scope="col" className="px-6 py-3.5 text-right">Stock</th>
                <th scope="col" className="px-6 py-3.5 text-right">Unit Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
              {items.map((item) => {
                const isSelected = selectedIds.includes(item.id)
                const stockColor =
                  item.stock === 0
                    ? 'bg-rose-500/10 text-rose-400 ring-rose-500/20'
                    : item.stock < 10
                    ? 'bg-amber-500/10 text-amber-300 ring-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-indigo-500/10 hover:bg-indigo-500/15' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(item.id)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 accent-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-100">{item.name}</div>
                      <div className="font-mono text-xs text-slate-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${stockColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-200">
                      {item.stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums text-slate-200">
                      ${item.price.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 4 Crypto Watchlist
// ==========================================
export function TargetQuestion4() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCapBillions',
    direction: 'desc',
  })

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  const assets = CRYPTO_ASSETS.filter((asset) => {
    const matchCat = category === 'ALL' || asset.category === category
    const q = search.toLowerCase()
    const matchSearch =
      asset.name.toLowerCase().includes(q) || asset.symbol.toLowerCase().includes(q)
    return matchCat && matchSearch
  }).sort((a, b) => {
    const valA = a[sortConfig.key]
    const valB = b[sortConfig.key]
    return sortConfig.direction === 'asc' ? valA - valB : valB - valA
  })

  const sortArrow = (key) => {
    if (sortConfig.key !== key) return <span className="text-slate-600">↕</span>
    return <span className="text-indigo-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by token or symbol..."
          className="w-full max-w-xs rounded-lg border border-slate-700/80 bg-slate-950/80 px-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />
        <div className="flex items-center gap-1.5">
          {['ALL', 'Layer 1', 'Layer 2', 'DeFi'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="w-12 px-6 py-3.5">#</th>
              <th scope="col" className="px-6 py-3.5">Asset</th>
              <th scope="col" className="px-6 py-3.5">Category</th>
              <th
                scope="col"
                onClick={() => handleSort('price')}
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-slate-200"
              >
                Price {sortArrow('price')}
              </th>
              <th
                scope="col"
                onClick={() => handleSort('change24h')}
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-slate-200"
              >
                24h Change {sortArrow('change24h')}
              </th>
              <th
                scope="col"
                onClick={() => handleSort('marketCapBillions')}
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-slate-200"
              >
                Market Cap {sortArrow('marketCapBillions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-sm text-slate-300">No crypto assets match "{search}"</p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setCategory('ALL')
                    }}
                    className="mt-2 text-xs text-indigo-400 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </td>
              </tr>
            ) : (
              assets.map((asset) => {
                const isPos = asset.change24h >= 0
                return (
                  <tr key={asset.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-500">
                      {asset.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-slate-100">{asset.name}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-400">
                          {asset.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                      {asset.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-100">
                      ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          isPos
                            ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {asset.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums text-slate-300">
                      ${asset.marketCapBillions.toFixed(1)}B
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 5 Expandable Orders
// ==========================================
const ORDER_BADGE = {
  Delivered: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
  Processing: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
  Shipped: 'bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/20',
  Cancelled: 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20',
}

export function TargetQuestion5() {
  const [expandedId, setExpandedId] = useState('ORD-9012')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="w-10 px-4 py-3.5" />
              <th scope="col" className="px-6 py-3.5">Order ID</th>
              <th scope="col" className="px-6 py-3.5">Customer</th>
              <th scope="col" className="px-6 py-3.5">Date</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {CUSTOMER_ORDERS.map((order) => {
              const isExpanded = expandedId === order.id
              return (
                <Fragment key={order.id}>
                  <tr
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className={`cursor-pointer transition-colors ${
                      isExpanded ? 'bg-slate-800/60' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-4 py-4 text-center text-xs text-slate-400">
                      <span
                        className={`inline-block transition-transform duration-150 ${
                          isExpanded ? 'rotate-90 text-indigo-400' : ''
                        }`}
                      >
                        ▶
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-indigo-400">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-100">{order.customer}</div>
                      <div className="text-xs text-slate-400">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ORDER_BADGE[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-100">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-slate-950/90">
                      <td colSpan={6} className="px-10 py-4">
                        <div className="space-y-3 rounded-lg border border-slate-800/80 bg-slate-900/50 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 text-xs">
                            <span className="font-semibold uppercase tracking-wider text-slate-400">
                              Order Line Items
                            </span>
                            <span className="text-slate-400">
                              Ship to: <strong className="text-slate-200">{order.shippingAddress}</strong>
                            </span>
                          </div>
                          <div className="divide-y divide-slate-800/60 text-xs">
                            {order.items.map((item) => (
                              <div key={item.sku} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                  <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-400">
                                    {item.sku}
                                  </span>
                                  <span className="font-medium text-slate-200">{item.name}</span>
                                  <span className="text-slate-500">× {item.qty}</span>
                                </div>
                                <span className="font-mono tabular-nums text-slate-200">
                                  ${(item.price * item.qty).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 6 Async Server Table
// ==========================================
export function TargetQuestion6() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['target-users-table', { search, page }],
    queryFn: async ({ signal }) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal })
      if (!res.ok) throw new Error('Failed to fetch users directory')
      const allUsers = await res.json()

      const q = search.trim().toLowerCase()
      const filtered = q
        ? allUsers.filter(
            (u) =>
              u.name.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.company?.name?.toLowerCase().includes(q)
          )
        : allUsers

      const totalCount = filtered.length
      const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
      const start = (page - 1) * PAGE_SIZE
      const users = filtered.slice(start, start + PAGE_SIZE)

      return { users, totalCount, totalPages }
    },
  })

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Global Customer Directory</h3>
          <p className="text-xs text-slate-400">Powered by TanStack Query + Shimmer Skeletons</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search name, email, or company..."
          className="w-full max-w-xs rounded-lg border border-slate-700/80 bg-slate-950/80 px-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">User</th>
              <th scope="col" className="px-6 py-3.5">Company</th>
              <th scope="col" className="px-6 py-3.5">Location</th>
              <th scope="col" className="px-6 py-3.5 text-right">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {isLoading &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-800 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-28 rounded bg-slate-800 animate-pulse" />
                        <div className="h-2.5 w-36 rounded bg-slate-800/70 animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="h-3.5 w-32 rounded bg-slate-800 animate-pulse" />
                      <div className="h-2.5 w-24 rounded bg-slate-800/70 animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-3.5 w-24 rounded bg-slate-800 animate-pulse" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="ml-auto h-5 w-20 rounded-full bg-slate-800 animate-pulse" />
                  </td>
                </tr>
              ))}

            {error && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-rose-400">
                  Error loading directory: {error.message}
                </td>
              </tr>
            )}

            {!isLoading && !error && data?.users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-slate-200">No users match "{search}"</p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setPage(1)
                    }}
                    className="mt-2 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/30 cursor-pointer"
                  >
                    Clear search
                  </button>
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              data?.users.map((user) => {
                const initials = user.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                return (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                          {initials}
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-200">{user.company?.name}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">
                        {user.company?.catchPhrase}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-300">{user.address?.city}</div>
                      <div className="font-mono text-xs text-slate-500">{user.address?.zipcode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 font-mono text-xs text-indigo-300">
                        {user.website}
                      </span>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-6 py-3 text-xs text-slate-400">
        <span>
          Page <strong className="text-slate-200">{page}</strong> of{' '}
          <strong className="text-slate-200">{data?.totalPages ?? 1}</strong> ({data?.totalCount ?? 0} total users)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isLoading}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || page >= data.totalPages || isLoading}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
