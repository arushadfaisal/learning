import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 6 - HOOKS: Optimistic Updates (Instant Feedback)
// API: https://jsonplaceholder.typicode.com/posts/1
//
// In social media apps (Twitter, Instagram), when you click "Bookmark" or "Like",
// the app doesn't wait 1 second for the server—it flips instantly!
// If the server later throws an error, it quietly rolls back.
//
// TODO 1: Implement `useBookmarkablePost()`
//   - Wrap `useQuery` with `queryKey: ['bookmarkedPost']`.
//   - Fetch `https://jsonplaceholder.typicode.com/posts/1`.
//   - In queryFn, fetch the post and attach a local `isBookmarked: false` field to it.
//   - Return the query.
//
// TODO 2: Implement `useToggleBookmark()`
//   - Wrap `useMutation`.
//   - `mutationFn`: simulate a slow network call to PATCH:
//       fetch('https://jsonplaceholder.typicode.com/posts/1', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isBookmarked })
//       })
//   - `onMutate: async (nextBookmarkedValue) => { ... }`:
//       Step A: await queryClient.cancelQueries({ queryKey: ['bookmarkedPost'] })
//       Step B: const previousPost = queryClient.getQueryData(['bookmarkedPost'])
//       Step C: queryClient.setQueryData(['bookmarkedPost'], old => ({ ...old, isBookmarked: nextBookmarkedValue }))
//       Step D: return { previousPost } (this becomes `context`!)
//   - `onError: (err, newVar, context) => { ... }`:
//       If it fails, rollback: queryClient.setQueryData(['bookmarkedPost'], context.previousPost)
//   - Return mutation.

export function useBookmarkablePost() {
  // Your code here...
  return {}
}

export function useToggleBookmark() {
  // Your code here...
  return {}
}
