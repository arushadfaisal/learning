import { useState } from 'react'
import { ORDERS, formatUSD } from './tableData'

// CHALLENGE 4 - UI: Bulk Order Selection & `:has(:checked)` Highlighting
//
// Build an e-commerce orders table with bulk selection and a contextual action bar!
//
// TODO 1 (Selection State):
//   - Keep state for `orders` (initialized to `ORDERS`) and `selectedIds` (array of order IDs, e.g. `[]`).
//   - Write helpers:
//     - `toggleOne(id)`: adds/removes a single order ID from `selectedIds`.
//     - `toggleAll()`: if all orders are currently selected, clear `selectedIds`; otherwise select all order IDs.
//
// TODO 2 (Contextual Bulk Action Bar):
//   - When `selectedIds.length > 0`, render a banner above the table showing:
//     `"{selectedIds.length} order(s) selected"`
//     along with two action buttons:
//     1) "Mark as Shipped" -> updates `status` of selected orders to `'Shipped'` and clears `selectedIds`.
//     2) "Delete Selected" -> removes selected orders from `orders` state and clears `selectedIds`.
//
// TODO 3 (CSS `has-[:checked]` Row Highlight):
//   - On each `<tr>` in `<tbody>`, use Tailwind's relational pseudo-class:
//     `has-[:checked]:bg-indigo-50/70 dark:has-[:checked]:bg-indigo-950/30`
//   - Notice how the entire row highlights automatically whenever its checkbox is checked!

export default function Question4SelectableOrders() {
  const [orders, setOrders] = useState(ORDERS)
  const [selectedIds, setSelectedIds] = useState([])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Question 4: Bulk Order Selection &amp; <code>has-[:checked]</code>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Practice: Select-all checkbox, <code>has-[:checked]</code> row styling, and a bulk action toolbar.
        </p>
      </div>

      {/* Render your contextual bulk action bar & selectable orders table here! */}
    </div>
  )
}
