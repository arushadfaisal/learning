import { SAAS_COHORTS, formatUSD } from './tableData'

// CHALLENGE 3 - UI: 2D Sticky Cohort Metrics Grid
//
// Build a scrollable financial cohort table using `SAAS_COHORTS` where BOTH the top header row
// AND the first column ("Cohort") remain pinned when scrolling vertically and horizontally!
//
// TODO 1 (Constrained Scroll Wrapper & Separate Borders):
//   - Wrap the table in a scroll container:
//     "max-h-72 max-w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
//   - Use `border-separate border-spacing-0` on `<table>` (remember: `border-collapse` breaks sticky borders!).
//
// TODO 2 (Sticky Top `<thead />` & Corner Cell `z-30`):
//   - Make `<thead>` sticky at the top: `sticky top-0 z-20`
//   - Bonus polish: make the top-left "Cohort" `<th>` inside `<thead>` ALSO sticky horizontally
//     (`sticky start-0 z-30 bg-slate-50 dark:bg-slate-800`) so the top-left corner never scrolls away!
//
// TODO 3 (Sticky Left Row Header `<th scope="row">`):
//   - Give each `<tr>` an opaque background (`bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80`).
//   - Make `<th scope="row">` for `row.cohort` sticky on the left:
//     `sticky start-0 z-10 bg-inherit border-e border-b border-slate-200 px-4 py-3 font-medium whitespace-nowrap`
//
// TODO 4 (Positive / Negative Delta Formatting):
//   - Right-align all numeric/percentage columns (`text-right font-mono tabular-nums whitespace-nowrap`).
//   - For `row.expansionDelta`, format positive numbers with a leading `+` (e.g. `+18.4%`) in emerald
//     (`text-emerald-600 dark:text-emerald-400`) and negative numbers (e.g. `-3.8%`) in rose (`text-rose-600 dark:text-rose-400`).

export default function Question3StickyMetricsGrid() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 3: 2D Sticky Cohort Metrics Grid
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: <code>border-separate border-spacing-0</code>, sticky top header, sticky left column, and positive/negative delta badges.
        </p>
      </div>

      {/* Build your 2D sticky metrics grid using SAAS_COHORTS here! */}
    </div>
  )
}
