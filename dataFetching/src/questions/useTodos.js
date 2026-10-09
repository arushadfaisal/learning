import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// CHALLENGE 1 - HOOKS: Todos Data Management
// API: https://jsonplaceholder.typicode.com/todos
//
// TODO 1: Implement `useTodos()`
//   - Wrap `useQuery` with `queryKey: ['todos']`.
//   - Fetch `https://jsonplaceholder.typicode.com/todos?_limit=5`.
//   - Check `res.ok`, return `res.json()`.
//   - Return the query object (or destructure what the UI needs).
//
// TODO 2: Implement `useToggleTodo()`
//   - Get `queryClient` using `useQueryClient()`.
//   - Wrap `useMutation`.
//   - In `mutationFn`, accept a `{ id, completed }` object and make a PATCH request to:
//       `https://jsonplaceholder.typicode.com/todos/${id}`
//       with method 'PATCH', headers 'Content-Type': 'application/json',
//       and body: JSON.stringify({ completed }).
//   - In `onSuccess`, use `queryClient.setQueryData(['todos'], (oldTodos) => ...)`
//     to map over the old list and replace the updated todo.
//   - Return the mutation object.

export function useTodos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
      if (!res.ok) {
        throw new Error('Failed to fetch todos')
      }
      return res.json()
    }
  })
  return { data, isLoading, error }
}

export function useToggleTodo() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ( id , completed ) => {
      const res = await fetch (`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed})
      })
      if (!res.ok) {
        throw new Error('Failed to toggle todo')
      }
      return res.json()
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['todos'], (oldTodos) => {
        return oldTodos.map(todo => todo.id === variables.id ? { ...todo, completed: !todo.completed } : todo)
      })
    }
  })
  return mutation
}
