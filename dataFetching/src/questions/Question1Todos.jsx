import { useTodos, useToggleTodo } from './useTodos'

// CHALLENGE 1 - UI: Todo List with Toggles
//
// TODO 1: Consume `useTodos()` to get `data: todos`, `isLoading`, and `error`.
// TODO 2: Consume `useToggleTodo()` to get `toggleTodo` mutation.
// TODO 3: Render:
//   - Loading state
//   - Error state
//   - The list of todos with a checkbox or button next to each item.
//   - When the user clicks the checkbox/button:
//       trigger `toggleTodo.mutate({ id: todo.id, completed: !todo.completed })`
//   - (Bonus) Disable the toggle while `toggleTodo.isPending`.

export default function Question1Todos() {
  // Call your custom hooks here:
  // const { data: todos, isLoading, error } = useTodos()
  // const toggleTodo = useToggleTodo()

  const { data: todos, isLoading, error } = useTodos()
  const toggleTodo = useToggleTodo()

  return (
    <div>
      <h2>Question 1: Todo Toggle</h2>
      <p style={{ color: '#666' }}>
        Rule: Use custom hooks only. No direct useQuery/useMutation calls here!
      </p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {todos && (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo.mutate({ id: todo.id, completed: !todo.completed })}
                disabled={toggleTodo.isPending}
              />
              {todo.title}
            </li>
          ))}
        </ul>
      )}
      {/* Render loading, error, and todos list with toggle buttons/checkboxes */}
    </div>
  )
}
