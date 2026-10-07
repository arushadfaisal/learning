import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// STEP 4: redo Step 2 (user detail) using TanStack Query.
//
// TODO 1: const { data, isPending, error } = useQuery({
//           queryKey: ['user', userId],
//           queryFn: async () => { fetch -> check res.ok -> return res.json() },
//         })
//         Compare the amount of code with Step 2. No useEffect, no cleanup, no 3 useStates.
// TODO 2: render buttons 1..10 like before.
// EXPERIMENTS:
//   a) Click 1, 2, then 1 again: is the 2nd visit to 1 instant? (cache!)
//   b) Switch browser tabs and come back: watch the Network tab (refetch on window focus).
//   c) Break the URL: notice it retries 3 times before showing the error.
//   d) Add `staleTime: 60_000` to the options. What changes in (b)?
//   e) Show `isFetching` to distinguish "first load" from "background refresh".

export default function Step4Query() {
  const [userId, setUserId] = useState(1)

  return (
    <div>
      <h2>Step 4: TanStack Query</h2>
      <p>Selected: {userId}</p>
    </div>
  )
}
