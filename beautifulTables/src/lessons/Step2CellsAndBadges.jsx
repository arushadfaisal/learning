import { TEAM_MEMBERS } from '../data/mockData'

// LESSON 2: Composite Cells, Soft Ring-Inset Badges & Tabular Numbers
//
// Now that the frame is clean, let's upgrade the CELLS inside the table!
//
// TODO 1 (Composite Identity Cell):
//   Instead of rendering just `member.name`, build a rich flex cell inside the first `<td>`:
//   - Outer flex container: `flex items-center gap-3`
//   - Avatar circle: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`
//     displaying `{member.avatar}`
//   - Text stack:
//     - Top line: `<div className="font-medium text-slate-100">{member.name}</div>`
//     - Sub line: `<div className="text-xs text-slate-400">{member.email}</div>`
//
// TODO 2 (Two-Line Role + Department Cell):
//   In the second `<td>`, stack `member.role` (`text-slate-200`) above
//   `member.department` (`text-xs text-slate-500`) instead of a single flat string.
//
// TODO 3 (Soft Ring-Inset Status Pill with Dot):
//   In the Status `<td>`, wrap `member.status` in a translucent pill badge:
//   `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium`
//   Use `STATUS_STYLES[member.status].pill` for colors, and put a tiny dot inside:
//   `<span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[member.status].dot}`} />`
//
// TODO 4 (Right-Aligned Tabular Numbers):
//   Numbers must ALWAYS be right-aligned (`text-right`) so digits line up!
//   - Add `text-right` to the "Salary" `<th>`.
//   - Add `text-right font-mono tabular-nums font-medium text-slate-200` to the Salary `<td>`.
//   - Format with `$${member.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}`.

const STATUS_STYLES = {
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

export default function Step2CellsAndBadges() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">Member</th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              {/* TODO 4a: Right-align this numeric header! */}
              <th scope="col" className="px-6 py-3.5 text-right">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {TEAM_MEMBERS.map((member) => {
              const style = STATUS_STYLES[member.status]
              return (
                <tr key={member.id}>
                  {/* TODO 1: Build the Avatar + Name + Email composite cell */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}>
                      {member.avatar}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium text-slate-100">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.email}</div>
                    </div>
                  </td>
                  {/* TODO 2: Stack Role + Department */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-200">{member.role}</div>
                    <div className="text-xs text-slate-500">{member.department}</div>
                  </td>
                  {/* TODO 3: Render a soft pill badge with a colored status dot */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.pill}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {member.status}
                    </span>
                  </td>

                  {/* TODO 4b: Right-align and apply font-mono tabular-nums */}
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
