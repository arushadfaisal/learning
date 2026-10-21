import { useQuery } from '@tanstack/react-query'

// QUESTION 6 - CUSTOM HOOK: useServerUsersTable
//
// Combine your TanStack Query mastery from `dataFetching` with Beautiful Tables!
//
// API: https://jsonplaceholder.typicode.com/users
//
// TODO 1: Call `useQuery` with:
//   - `queryKey: ['users', { search, page }]`
//   - `queryFn`:
//     1. Fetch `https://jsonplaceholder.typicode.com/users` (pass `{ signal }` and throw if `!res.ok`)
//     2. Filter the returned array so `user.name`, `user.email`, or `user.company.name` matches `search` (case-insensitive).
//     3. Paginate with `PAGE_SIZE = 4`:
//        slice the filtered list from `(page - 1) * PAGE_SIZE` to `page * PAGE_SIZE`.
//     4. Return `{ users: paginatedUsers, totalCount: filtered.length, totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) }`.

export const PAGE_SIZE = 4

export function useServerUsersTable({ search = '', page = 1 }) {
  // TODO 1: Replace this placeholder with your real useQuery implementation!
  return {
    data: { users: [], totalCount: 0, totalPages: 1 },
    isLoading: false,
    error: null,
  }
}
