import { useState } from 'react'
import { TEAM_MEMBERS } from '../data/mockData'

// LESSON 3: Row Hover, Selection Tinting & Ghost Action Buttons
//
// Pro tables feel alive when you move your mouse across them or select rows.
//
// TODO 1 (Row Hover & Selected Highlight):
//   On each `<tr>` inside `<tbody>`:
//   - Add `group transition-colors` so child elements can react to row hover!
//   - If `isSelected` is true, tint the row with `bg-indigo-500/10 hover:bg-indigo-500/15`.
//   - Otherwise, apply a subtle hover tint: `hover:bg-slate-800/50`.
//
// TODO 2 (Row Selection Checkbox):
//   In the first `<td>` of each row, wire the checkbox `checked={isSelected}` and
//   `onChange={() => toggleSelect(member.id)}`.
//   Also wire the master "Select All" checkbox in `<thead>`!
//
// TODO 3 (Ghost Action Reveal with `group-hover`):
//   Repeating visible buttons on every row looks noisy.
//   In the last `<td>`, wrap the "Edit" and "Remove" buttons in a container with:
//   `opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100`
//   so actions only appear when the user hovers (or tabs into) that specific row!

export default function Step3RowStates() {
  const [selectedIds, setSelectedIds] = useState(['usr-2'])
  const [lastAction, setLastAction] = useState(null)

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const allSelected = selectedIds.length === TEAM_MEMBERS.length

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(TEAM_MEMBERS.map((m) => m.id))
    }
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
                  {/* TODO 2a: Wire the Select All checkbox */}
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleSelectAll()}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 accent-indigo-500 cursor-pointer"
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
                  // TODO 1: Add `group transition-colors` + conditional selected/hover background classes
                  <tr key={member.id} className={`group transition-colors ${isSelected ? 'bg-indigo-500/10 hover:bg-indigo-500/15' : 'hover:bg-slate-800/50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* TODO 2b: Wire individual row checkbox to isSelected and toggleSelect(member.id) */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(member.id)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 accent-indigo-500 cursor-pointer"
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
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {/* TODO 3: Hide this action group by default (`opacity-0`) and reveal on `group-hover:opacity-100` */}
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
