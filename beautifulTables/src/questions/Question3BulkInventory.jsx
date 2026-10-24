import { useState } from 'react'
import { INVENTORY_ITEMS } from '../data/mockData'

// QUESTION 3: Selectable Inventory & Contextual Bulk Action Bar
//
// Admin dashboards need multi-row selection and bulk actions (like Restocking or Deleting).
//
// TODO 1 (State Setup):
//   - Keep `items` in state initialized to `INVENTORY_ITEMS` (so you can mutate/delete them!).
//   - Keep `selectedIds` in state initialized to `[]`.
//
// TODO 2 (Selection Handlers & Bulk Actions):
//   - `toggleOne(id)`: adds/removes `id` from `selectedIds`.
//   - `toggleAll()`: selects all current `items` if not all are selected; otherwise clears `selectedIds`.
//   - `handleBulkRestock()`: adds +10 to `stock` (and sets `status: 'In Stock'`) for every item whose `id` is in `selectedIds`.
//   - `handleBulkDelete()`: removes all selected items from `items` and clears `selectedIds`.
//
// TODO 3 (Contextual Bulk Action Bar + Table UI):
//   - When `selectedIds.length > 0`, display a highlighted bar above the table (or inside the card header):
//     showing `"{selectedIds.length} selected"` + `"Restock (+10)"` button + `"Delete Selected"` button!
//   - In the table, highlight selected rows with `bg-indigo-500/10` and right-align `stock` and `price` with `tabular-nums`.

export default function Question3BulkInventory() {
  const [items, setItems] = useState(INVENTORY_ITEMS)
  const [selectedIds, setSelectedIds] = useState([])

  return (
    <div className="space-y-4">
      {/* Build your Bulk Action Bar + Selectable Inventory Table here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question3BulkInventory.jsx</code> to build your selectable inventory table!
      </p>
    </div>
  )
}
