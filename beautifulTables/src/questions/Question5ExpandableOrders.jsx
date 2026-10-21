import { useState, Fragment } from 'react'
import { CUSTOMER_ORDERS } from '../data/mockData'

// QUESTION 5: Expandable Master-Detail Orders Table
//
// Often a table row has too much detail to fit in columns (like individual order items).
// The pro solution is an Expandable Detail Row using `<Fragment key={order.id}>`!
//
// TODO 1 (Expanded Row State):
//   - Keep `expandedId` state (initial: `'ORD-9012'` so you can see one open immediately, or `null`).
//   - Clicking a row (or its chevron button) toggles `expandedId === order.id ? null : order.id`.
//
// TODO 2 (Parent Order Row):
//   - Wrap each order in `<Fragment key={order.id}>`.
//   - Render the main `<tr>` with columns:
//     1. Expand Chevron (`▶` rotated `rotate-90` when expanded)
//     2. Order ID (`font-mono text-indigo-400`)
//     3. Customer (Stacked `order.customer` + `order.email`)
//     4. Date (`order.date`)
//     5. Status (Pill badge: Delivered, Processing, Shipped, Cancelled)
//     6. Total (`text-right font-mono tabular-nums`)
//
// TODO 3 (Nested Detail Sub-Row `<td colSpan={6}>`):
//   - Immediately after the parent `<tr>` (inside the same `<Fragment>`), if `isExpanded` is true:
//   - Render `<tr className="bg-slate-950/90"><td colSpan={6} className="px-10 py-4">`
//   - Inside, display the `order.shippingAddress` and a clean breakdown of `order.items` (`sku`, `name`, `qty`, `price`)!

export default function Question5ExpandableOrders() {
  const [expandedId, setExpandedId] = useState('ORD-9012')

  return (
    <div>
      {/* Build your Expandable Master-Detail Orders Table here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question5ExpandableOrders.jsx</code> to build your expandable orders table!
      </p>
    </div>
  )
}
