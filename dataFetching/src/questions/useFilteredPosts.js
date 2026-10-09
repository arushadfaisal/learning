import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 5 - HOOKS: Dynamic Query Keys & Filtered Lists
// API:
//   - All posts: https://jsonplaceholder.typicode.com/posts?_limit=5
//   - Filtered by user: https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}&_limit=5
//
// TODO 1: Implement `useFilteredPosts(selectedUserId)`
//   - Wrap `useQuery`.
//   - `queryKey`: `['posts', { userId: selectedUserId }]`
//     (Notice how queryKey can be an array with an object! Whenever `selectedUserId` changes, TanStack Query caches the result separately).
//   - `queryFn`: If `selectedUserId` is 'ALL', fetch all posts. If a specific number, fetch by `userId`.
//   - Return `{ data: posts, isLoading, error }`.
//
// TODO 2: Implement `useCreatePost(selectedUserId)`
//   - Wrap `useMutation`.
//   - `mutationFn`: receives `{ title, body }` and sends POST to `/posts`.
//   - In `onSuccess`: update the cache for the CURRENT active filter key:
//       `['posts', { userId: selectedUserId }]`
//       by prepending `newPost` to the array.
//   - Return the mutation object.

export function useFilteredPosts(selectedUserId) {
  // Your code here...
  return {}
}

export function useCreatePost(selectedUserId) {
  // Your code here...
  return {}
}
