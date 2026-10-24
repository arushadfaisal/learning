import { TEAM_MEMBERS } from '../data/mockData'

// QUESTION 1: SaaS Team Directory Table (Build from Scratch)
//
// Apply the 8 Rules of Beautiful Tables from the Visual Guide to build a
// Linear-style Team Directory from scratch!
//
// TODO 1 (Card Frame & Table Setup):
//   - Outer wrapper: `overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg`
//   - Scroll wrapper: `overflow-x-auto`
//   - Table: `w-full divide-y divide-slate-800 text-left`
//
// TODO 2 (Header Row):
//   - `<thead>`: `bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400`
//   - 5 Columns (`px-6 py-3.5`):
//     1. Member (left)
//     2. Role (left)
//     3. Status (left)
//     4. Last Active (left)
//     5. Salary (right-aligned: `text-right`)
//
// TODO 3 (Body Rows & Cells):
//   - `<tbody>`: `divide-y divide-slate-800/70 text-sm text-slate-300`
//   - Each `<tr>`: `group hover:bg-slate-800/50 transition-colors`
//   - Col 1 (Member): Avatar circle (`member.avatar`, `member.avatarColor`) + stacked `member.name` (`font-medium text-slate-100`) and `member.email` (`text-xs text-slate-400`)
//   - Col 2 (Role): Stacked `member.role` (`text-slate-200`) and `member.department` (`text-xs text-slate-500`)
//   - Col 3 (Status): Soft pill badge with dot using `STATUS_BADGE[member.status]`
//   - Col 4 (Last Active): Muted timestamp (`text-xs text-slate-400`)
//   - Col 5 (Salary): Right-aligned tabular currency (`text-right font-mono tabular-nums font-medium text-slate-200`)

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

export default function Question1TeamDirectory() {
  return (
    <div>
      {/* Build your SaaS Team Directory Table here! */}
      {/* Tip: Click "✨ Target Design" or "⚖️ Split Compare" above to inspect the visual goal. */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question1TeamDirectory.jsx</code> to build your table!
      </p>
    </div>
  )
}
