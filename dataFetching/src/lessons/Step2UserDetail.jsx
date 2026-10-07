import { useState, useEffect } from 'react'

// STEP 2: refetch when a dependency changes, and see a race condition.
// API: https://jsonplaceholder.typicode.com/users/:id   (ids 1-10)
//
// TODO 1: render buttons 1..10 that set `userId`.
// TODO 2: useEffect that fetches /users/${userId}, with [userId] as dependency.
//         Show loading + error + the user's name/email.
// EXPERIMENT A: remove the AbortController cleanup. Set the network to "Slow 4G",
//         click 1 then 2 quickly. Can you ever end with the wrong user displayed?
//         (Responses can arrive out of order; that's a race condition.)
// EXPERIMENT B: add the cleanup back. Watch the Network tab: the older request is cancelled.
// BONUS: Is there a flash of the OLD user while loading the new one? Reset data
//         at the start of the effect (setUser(null)) and notice the difference.

export default function Step2UserDetail() {
  const [userId, setUserId] = useState(1)

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    
    const fetchData = async () => {
      setUser(null);
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await response.json();
        const delay = await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
        setUser(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [userId])

  return (
    <div>
      <h2>Step 2: Refetch on change</h2>
      <div>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(id => (
          <button key={id} onClick={() => setUserId(id)}>
            {id}
          </button>
        ))}
      </div>
      <p>Selected: {userId}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>{user.name} - {user.email}</p>}
    </div>
  )
}
