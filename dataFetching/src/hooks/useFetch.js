// STEP 3: extract the repeated logic from Steps 1-2 into a reusable hook.
//
// TODO: implement useFetch(url) returning { data, loading, error }
//   - state for data/loading/error
//   - useEffect with [url] dependency
//   - reset loading/error at the start of each fetch
//   - AbortController cleanup
//   - check res.ok

import React, { useState, useEffect } from 'react';

export function useFetch(url) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!ignore) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error }
}
