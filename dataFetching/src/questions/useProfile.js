import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 4 - HOOKS: Profile Viewer & Editor
// API: https://jsonplaceholder.typicode.com/users/${userId}
//
// TODO 1: Implement `useUserProfile(userId)`
//   - Wrap `useQuery` with `queryKey: ['user', userId]`.
//   - Fetch `https://jsonplaceholder.typicode.com/users/${userId}`.
//   - Check `res.ok`, return `res.json()`.
//   - Return `{ data: user, isLoading, error }` (or the whole query object).
//
// TODO 2: Implement `useUpdateUserProfile(userId)`
//   - Call `useQueryClient()`.
//   - Wrap `useMutation`.
//   - `mutationFn` receives `{ name, phone }` and sends a PATCH request to:
//       `https://jsonplaceholder.typicode.com/users/${userId}`
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, phone })
//   - In `onSuccess`: update the cache for `['user', userId]` using:
//       `queryClient.setQueryData(['user', userId], (oldUser) => ({ ...oldUser, ...updatedData }))`
//   - Return the mutation object.

export function useUserProfile(userId) {
  const queryClient = useQueryClient()

  const useQueryResult = useQuery({
    queryKey: ['user', userId],
    queryFn: async (userId) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if (!res.ok) {
        throw new Error('Failed to fetch user profile')
      }
      return res.json()
    }
  })

  return useQueryResult
}

export function useUpdateUserProfile(userId) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name, phone
        })
      })
      if (!res.ok){
        throw new Error('Failed to update')
      }
      return res.json()
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user'], (oldUser) => {
        return oldUser.map(user => user.id === variables.id ? {
          ...user.name = variables.name,
          ...user.phone = variables.phone
        } : user)
      } )
    }
  })
  return mutation
}
