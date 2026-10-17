import { INVOICES, formatUSD } from './tableData'

// CHALLENGE 1 - UI: SaaS Invoice Ledger with Summary Footer
//
// Build a clean invoice ledger from `INVOICES` with proper alignment and a `<tfoot>` total row.
//
// TODO 1 (Card Container & Table Setup):
//   - Wrap the table in a card div:
//     "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
//   - Create a `<table className="w-full text-left text-sm">`
//
// TODO 2 (Header Hierarchy):
//   - Render `<thead>` with muted uppercase styling:
//     "border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
//   - Columns: Invoice, Client, Plan, Issued Date, Status, Amount (right-aligned!).
//
// TODO 3 (Body Rows & Tabular Numbers):
//   - Render `<tbody className="divide-y divide-slate-200 dark:divide-slate-800">`
//   - Use `<th scope="row">` for `inv.id` in monospace ("font-mono text-xs font-medium text-slate-500").
//   - Style `inv.status` ('Paid', 'Pending', 'Overdue') with a soft pill badge (`ring-1 ring-inset`).
//   - Format `inv.amount` with `formatUSD(inv.amount)` and right-align with `text-right font-mono font-medium tabular-nums`.
//
// TODO 4 (Summary `<tfoot />` Row):
//   - Calculate `totalAmount` using `INVOICES.reduce((sum, inv) => sum + inv.amount, 0)`.
//   - Render a `<tfoot>` with a top border ("border-t border-slate-200 bg-slate-50/70 font-semibold dark:border-slate-800 dark:bg-slate-800/40").
//   - Use `<th scope="row" colSpan={5} className="px-4 py-3 text-right">Total Billed</th>`
//     and display `formatUSD(totalAmount)` in the final right-aligned `tabular-nums` cell!

export default function Question1InvoiceLedger() {
  // Calculate grand total here:
  // const totalAmount = INVOICES.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 1: SaaS Invoice Ledger &amp; Summary Footer
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: Card wrapper, header hierarchy, right-aligned <code>tabular-nums</code> currency, and a <code>&lt;tfoot&gt;</code> summary row.
        </p>
      </div>

      {/* Build your formatted invoice table here! */}
    </div>
  )
}
