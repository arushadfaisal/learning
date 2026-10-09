import { useFetch } from '../hooks/useFetch'
import { useState } from 'react'

// STEP 3: use your useFetch hook (src/hooks/useFetch.js).
//
// TODO 1: implement useFetch.
// TODO 2: here, call useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
//         and render the post titles with loading/error handling. That's the whole component!
// TODO 3: add a button to toggle between `?_limit=5` and `?_limit=10`: the URL changes -> refetch.
// THINK: What does this hook still NOT do? (caching, dedupe, retry, refetch on focus...)
//        Click Step 3 away and back: does it refetch from scratch? That motivates Step 4.

export default function Step3CustomHook() {
  const [limit, setLimit] = useState(5);
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  );

  const toggleLimit = () => {
    setLimit(limit === 5 ? 10 : 5);
  };




  console.log({ data, loading, error })

  return (
    <div>
      <h2>Step 3: Custom hook</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={toggleLimit}>
        Toggle
      </button>
    </div>
  )
}
