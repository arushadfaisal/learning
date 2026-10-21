import { useState } from 'react'
import { INVOICES } from '../data/mockData'

// QUESTION 2: Stripe-Style Invoice Ledger & Summary Footer (<tfoot>)
//
// Financial tables require rock-solid number alignment, scannable monospace IDs,
// and a summary `<tfoot>` row that totals the visible amounts.
//
// TODO 1 (Status Filter):
//   - Keep state `statusFilter` ('ALL' | 'Paid' | 'Pending' | 'Overdue').
//   - Filter `INVOICES` based on `statusFilter`.
//   - Compute `totalAmount` of the filtered invoices using `.reduce((sum, inv) => sum + inv.amount, 0)`.
//
// TODO 2 (Ledger Columns):
//   - Render a card-wrapped table with columns:
//     1. Invoice (`font-mono text-xs font-medium text-indigo-400`, e.g. `#INV-2041`)
//     2. Client (Stacked `inv.client` in `font-medium text-slate-100` + `inv.plan` in `text-xs text-slate-400`)
//     3. Issued / Due (Stacked or formatted dates in `text-xs text-slate-400`)
//     4. Status (Pill badge: Paid -> emerald, Pending -> amber, Overdue -> rose)
//     5. Amount (`text-right font-mono tabular-nums font-medium text-slate-100`, formatted to 2 decimals: `$4,250.00`)
//
// TODO 3 (Semantic Summary Footer `<tfoot>`):
//   - Below `<tbody>`, add a `<tfoot className="border-t-2 border-slate-800 bg-slate-900/90">`:
//   - Use `<td colSpan={4} className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">` for the label `"Total ({filteredInvoices.length} invoices)"`
//   - Use `<td className="px-6 py-4 text-right font-mono tabular-nums text-base font-bold text-white">` for the formatted `totalAmount`!

const INVOICE_STATUS_STYLES = {
  Paid: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
  Overdue: 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20',
}

export default function Question2InvoiceLedger() {
  const [statusFilter, setStatusFilter] = useState('ALL')

  // TODO 1: Filter INVOICES and calculate totalAmount

  return (
    <div className="space-y-4">
      {/* Build your filter pills + Invoice Ledger Table + <tfoot> summary row here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question2InvoiceLedger.jsx</code> to build your Stripe-style invoice ledger!
      </p>
    </div>
  )
}
