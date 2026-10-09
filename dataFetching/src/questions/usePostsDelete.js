import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 3 - HOOKS: Delete Mutation & Cache Eviction
// API: https://jsonplaceholder.typicode.com/posts
//
// TODO 1: Implement `usePosts()`
//   - Wrap `useQuery` with `queryKey: ['posts']`.
//   - Fetch `https://jsonplaceholder.typicode.com/posts?_limit=5`.
//   - Return the query object.
//
// TODO 2: Implement `useDeletePost()`
//   - Wrap `useMutation`.
//   - In `mutationFn`, accept `postId` and make a DELETE request:
//       `fetch('https://jsonplaceholder.typicode.com/posts/' + postId, { method: 'DELETE' })`
//   - In `onSuccess`, evict the post from cache using `queryClient.setQueryData(['posts'], ...)`:
//       Filter out the post whose ID matches the deleted `postId`!
//       (Hint: `onSuccess` receives `(data, variables)` where `variables` is the `postId` you passed to mutate!)
//   - Return the mutation object.

export function usePosts() {
  const queryClient = useQueryClient()
  const useQueryResult = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    }
  })
  return useQueryResult
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (postId) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to delete post')
      }
      return res.json()
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['posts'], data => data.filter(post => post.id !== variables))
    }
  })
  return mutation
}
