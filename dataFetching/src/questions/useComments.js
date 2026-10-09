import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 2 - HOOKS: Dependent Query & Parameterized Mutation
// API: https://jsonplaceholder.typicode.com/comments?postId=${postId}
//
// TODO 1: Implement `useComments(postId)`
//   - Wrap `useQuery`.
//   - queryKey: `['comments', postId]`
//   - queryFn: Fetch comments for this specific postId:
//       `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
//   - IMPORTANT: Only run the query when `postId` is truthy!
//     (Hint: look up TanStack Query's `enabled` option: `enabled: !!postId`)
//   - Return the query object.
//
// TODO 2: Implement `useAddComment(postId)`
//   - Wrap `useMutation`.
//   - mutationFn: accept `{ name, body }` and POST to:
//       `https://jsonplaceholder.typicode.com/comments`
//       with body containing `{ postId, name, body }`.
//   - onSuccess: update the cache specifically for this post's comments:
//       `queryClient.setQueryData(['comments', postId], (oldComments) => ...)`
//   - Return the mutation object.

export function useComments(postId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      if (!res.ok) {
        throw new Error('Failed to fetch comments')
      }
      return res.json()
    },
    enabled: !!postId
  })
  return { data, isLoading, error }
}

export function useAddComment(postId) {
  const queryClient = useQueryClient()
  const mutation = useMutation ({
    mutationFn: async ({ name, body }) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: postId,
          name: name,
          body: body
        })
      })
      if(!res.ok) {
        throw new Error('Failed to add comment')
      }
      return res.json()
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData(['comments', postId], (oldComments) => {
        return [...(oldComments || []), newComment]
      })
    }
  })
  return mutation
}
