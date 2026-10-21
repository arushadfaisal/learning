import { useState } from 'react'
import { useServerUsersTable, PAGE_SIZE } from './useServerUsersTable'

// QUESTION 6 - UI: Full-Stack Async Data Table (TanStack Query + Skeletons + Pagination)
//
// The Ultimate Capstone: Connect real async data fetching (`useServerUsersTable`)
// to a polished table with Shimmer Skeletons, Empty State, and Pagination!
//
// TODO 1 (State & Hook):
//   - Keep state for `search` ('') and `page` (1).
//   - Note: When the user types in `search`, reset `page` back to `1`!
//   - Call `useServerUsersTable({ search, page })`.
//
// TODO 2 (Table Structure & Columns):
//   - Integrated search toolbar at the top of the card.
//   - Columns:
//     1. User (Initials Avatar + `user.name` + `user.email`)
//     2. Company (Stacked `user.company.name` + `user.company.catchPhrase`)
//     3. Location (`user.address.city` + monospace zipcode)
//     4. Website (Pill link or badge for `user.website`)
//
// TODO 3 (Loading Skeletons, Error & Empty States):
//   - While `isLoading` is true, render `PAGE_SIZE` (4) shimmer skeleton `<tr>` rows inside `<tbody>`!
//   - If `error`, render a red error state inside `<td colSpan={4}>`.
//   - If `!isLoading && data?.users.length === 0`, render an Empty State inside `<td colSpan={4}>` with a "Clear search" button.
//
// TODO 4 (Pagination Footer):
//   - At the bottom of the card, render current page info and "Previous" / "Next" buttons
//     (disabled when `page <= 1` or `page >= data.totalPages`).

export default function Question6AsyncServerTable() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useServerUsersTable({ search, page })

  return (
    <div>
      {/* Build your Full-Stack Async Data Table here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question6AsyncServerTable.jsx</code> to build the capstone async table!
      </p>
    </div>
  )
}
