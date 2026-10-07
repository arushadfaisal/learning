import { useState, useEffect } from 'react'

// STEP 1: fetch a list of users with useEffect + useState.
// API: https://jsonplaceholder.typicode.com/users
//
// TODO 1: add the three states -> users ([]), loading (true), error (null)
// TODO 2: in useEffect (run once, so `[]`), define an inner async function that:
//         - fetches the URL
//         - THROWS if !res.ok (fetch does not throw on 404/500!)
//         - stores res.json() in state
//         - catches errors -> setError(err.message)
//         - finally -> setLoading(false)
// TODO 3: add an AbortController, pass `signal` to fetch, and return a cleanup
//         `() => controller.abort()`. Ignore errors named 'AbortError'.
// TODO 4: render loading / error / list. Test the error path by breaking the URL
//         (e.g. /userz) and test slow loading with DevTools -> Network -> Slow 4G.

export default function Step1Basic() {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }finally{
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }
    
  fetchData();
  return () => controller.abort();
    
}, []);

  return (
    <div>
      <h2>Step 1: useEffect + fetch</h2>
      <p>Write your code in src/lessons/Step1Basic.jsx</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
