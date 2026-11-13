import { useQuery } from '@tanstack/react-query'

// QUESTION 6 - CUSTOM HOOK: usePollingMonitor
//
// Combine your TanStack Query skills from `dataFetching` with Time Manipulation!
//
// API: https://jsonplaceholder.typicode.com/users?_limit=5
//
// TODO 1: Call `useQuery` with:
//   - `queryKey: ['server-nodes']`
//   - `refetchInterval: pollIntervalMs || false` (automatically polls on a timer when > 0!)
//   - `queryFn`:
//     1. Record `const startMs = performance.now()` before fetching.
//     2. Fetch `https://jsonplaceholder.typicode.com/users?_limit=5` (pass `{ signal }` and throw if `!res.ok`).
//     3. Parse `const users = await res.json()`.
//     4. Measure `const latencyMs = Math.max(12, Math.round(performance.now() - startMs))`.
//     5. Map each user into a telemetry node:
//        `{ id: user.id, host: user.website, region: user.address.city, maintainer: user.name, latencyMs, checkedAtIso: new Date().toISOString() }`
//     6. Return `{ nodes, latencyMs }`.

export function usePollingMonitor({ pollIntervalMs = 5000 }) {
  // TODO 1: Replace this placeholder with your real useQuery + refetchInterval implementation!
  void useQuery
  void pollIntervalMs

  return {
    data: { nodes: [], latencyMs: 0 },
    isLoading: false,
    isFetching: false,
    error: null,
    dataUpdatedAt: 0,
    refetch: () => {},
  }
}
