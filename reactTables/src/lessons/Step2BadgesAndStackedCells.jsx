// STEP 2: Multi-Line Cell Stacking, Avatars & Soft Status Badges
//
// Real-world data often has 7+ fields per row. Putting each field in its own column
// makes tables cramped and forces horizontal scrolling.
// The solution: stack related metadata inside a single cell!
//
// TODO 1 (Stacked Member Cell with Avatar):
//   In the first column (<th scope="row">), combine `initials`, `name`, and `email`:
//   - Outer flex container: "flex items-center gap-3"
//   - Avatar circle: "flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400"
//   - Text stack: `name` ("font-medium text-slate-900 dark:text-slate-100") on top,
//     `email` ("text-xs text-slate-500 dark:text-slate-400") underneath.
//
// TODO 2 (Stacked Role + Department Cell):
//   In the second column, stack `role` ("text-slate-800 dark:text-slate-200") on top of
//   `department` ("text-xs text-slate-500 dark:text-slate-400").
//
// TODO 3 (Soft Pill Status Badges with Inset Ring):
//   Instead of harsh solid backgrounds, use translucent pills with `ring-1 ring-inset`
//   and a tiny colored dot ("size-1.5 rounded-full bg-current"):
//   - Base pill classes: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
//   - Map `member.status` using `STATUS_STYLES[member.status]`.

const TEAM = [
  { id: 1, initials: 'AR', name: 'Alex Rivera', email: 'alex@acme.dev', role: 'Staff Frontend Engineer', department: 'Design Systems', status: 'Active', lastSeen: '2m ago' },
  { id: 2, initials: 'PP', name: 'Priya Patel', email: 'priya@acme.dev', role: 'Lead Product Designer', department: 'Core Product', status: 'In a Meeting', lastSeen: '14m ago' },
  { id: 3, initials: 'MV', name: 'Marcus Vance', email: 'marcus@acme.dev', role: 'Engineering Manager', department: 'Infrastructure', status: 'Active', lastSeen: 'Just now' },
  { id: 4, initials: 'ER', name: 'Elena Rostova', email: 'elena@acme.dev', role: 'Staff Data Scientist', department: 'AI Platform', status: 'Offline', lastSeen: '4h ago' },
]

const STATUS_STYLES = {
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
  'In a Meeting': 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
  Offline: 'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700',
}

export default function Step2BadgesAndStackedCells() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Step 2: Stacked Cells, Avatars &amp; Soft Status Badges
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open <code>src/lessons/Step2BadgesAndStackedCells.jsx</code> and complete TODOs 1–3 to condense 7 fields into 4 clean columns.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3">Member</th>
              <th scope="col" className="px-4 py-3">Role</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3 text-right">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {TEAM.map((member) => (
              <tr key={member.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                {/* TODO 1: Stack Avatar + Name + Email inside this <th scope="row"> */}
                <th scope="row" className="px-4 py-3.5 font-normal">
                  {member.name} ({member.email})
                </th>

                {/* TODO 2: Stack Role + Department inside this <td> */}
                <td className="px-4 py-3.5">
                  {member.role} - {member.department}
                </td>

                {/* TODO 3: Render a soft pill badge with a status dot using STATUS_STYLES */}
                <td className="px-4 py-3.5">
                  {member.status}
                </td>

                <td className="px-4 py-3.5 text-right font-mono text-xs text-slate-500 dark:text-slate-400">
                  {member.lastSeen}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
