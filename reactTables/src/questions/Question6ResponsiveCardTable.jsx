import { useState } from 'react'
import { EMPLOYEES } from './tableData'

// CHALLENGE 6 - UI: `@container` Query Responsive Stacked Table
//
// Build a table that automatically transforms into stacked mobile cards whenever its
// container becomes narrower than 600px — even on a wide desktop monitor!
//
// TODO 1 (Width Toggle & `@container` Wrapper):
//   - Add buttons to switch `previewMode` between `'desktop'` (`w-full`) and `'widget'` (`w-[420px]`).
//   - Add the `@container` class to the table wrapper `<div>` so container queries measure its width.
//
// TODO 2 (Hide `<thead />` on Narrow Container):
//   - Add `@max-[600px]:hidden` to `<thead>` so column headers are hidden from layout and screen readers
//     when the container is under 600px.
//
// TODO 3 (Stacked Card Layout & Accessible CSS Variable Labels):
//   - Pass inline CSS custom properties on `<table>`:
//     `style={{ '--label-2': '"Role"', '--label-3': '"Location"', '--label-4': '"Status"' }}`
//   - Add `@max-[600px]:block` to `<table>` and `<tbody>`.
//   - Style each `<tr>` as a card below 600px:
//     `@max-[600px]:mb-3 @max-[600px]:block @max-[600px]:rounded-xl @max-[600px]:border @max-[600px]:border-slate-200 dark:@max-[600px]:border-slate-800`
//   - Add `responsive-td @max-[600px]:flex @max-[600px]:items-center @max-[600px]:justify-between` to each `<td>`
//     so the `::before` pseudo-element in `src/index.css` injects the accessible column label on the left!

export default function Question6ResponsiveCardTable() {
  const [previewMode, setPreviewMode] = useState('desktop')

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 6: <code>@container</code> Responsive Stacked Cards
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: Container queries (<code>@container</code> &amp; <code>@max-[600px]:...</code>) and accessible CSS label injection.
        </p>
      </div>

      {/* Add your Desktop (100%) vs Narrow Widget (420px) toggle buttons and @container table here! */}
    </div>
  )
}
