import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// STEP 5: write data with useMutation.
// JSONPlaceholder is a FAKE API: POST returns a fake id (101) but nothing is saved,
// so refetching the list won't show the new post. We'll update the cache by hand.
//
// TODO 1: useQuery(['posts']) to list /posts?_limit=5
// TODO 2: a controlled <input> + button. useMutation with mutationFn that POSTs:
//           fetch('https://jsonplaceholder.typicode.com/posts', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title, body: '', userId: 1 }),
//           })
//         (check res.ok, return res.json())
// TODO 3: onSuccess: use queryClient.setQueryData(['posts'], old => [newPost, ...old])
//         to show the new post instantly. (With a real API you'd call
//         queryClient.invalidateQueries({ queryKey: ['posts'] }) to refetch instead.)
// TODO 4: disable the button while mutation.isPending, show mutation.error if it fails.
// STRETCH: optimistic update. Use onMutate to add the post BEFORE the server responds
//         and roll back in onError. Read: tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

export default function Step5Mutation() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  return (
    <div>
      <h2>Step 5: Mutations</h2>
    </div>
  )
}
