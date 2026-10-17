import { EMPLOYEES } from './tableData'

// CHALLENGE 2 - UI: Team Directory (Stacked Cells, Soft Badges & Hover Actions)
//
// Raw `EMPLOYEES` objects have 7 fields: id, initials, name, email, role, department, status, location.
// Condense them into a sleek 5-column table!
//
// TODO 1 (Stacked Member Cell):
//   - In `<th scope="row">`, use `flex items-center gap-3` to display:
//     1) An avatar circle showing `emp.initials` ("flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400")
//     2) A vertical stack with `emp.name` ("font-medium text-slate-900 dark:text-slate-100") on top and `emp.email` ("text-xs text-slate-500 dark:text-slate-400") below.
//
// TODO 2 (Stacked Role & Department Cell):
//   - In the second column, stack `emp.role` on top and `emp.department` in muted `text-xs` underneath.
//
// TODO 3 (Soft Status Badge with Status Dot):
//   - Create a `STATUS_BADGE` lookup object for `'Active'`, `'On Leave'`, and `'Offline'`.
//   - Render a rounded-full pill with `ring-1 ring-inset` and a `<span className="size-1.5 rounded-full bg-current" />` dot.
//
// TODO 4 (Row-Hover Reveal Action Button using `group`):
//   - Add the `group` class to each `<tr>`.
//   - In the final right-aligned column, render an "Edit" button that is subtle or hidden by default
//     and becomes visible on row hover:
//     "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"

export default function Question2TeamDirectory() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 2: Team Directory (Stacked Cells &amp; <code>group-hover</code> Actions)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: Condense 7 fields into a clean table with avatars, stacked metadata, soft badges, and hover-revealed row actions.
        </p>
      </div>

      {/* Build your Team Directory table using EMPLOYEES here! */}
    </div>
  )
}
