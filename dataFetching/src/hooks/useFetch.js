// STEP 3: extract the repeated logic from Steps 1-2 into a reusable hook.
//
// TODO: implement useFetch(url) returning { data, loading, error }
//   - state for data/loading/error
//   - useEffect with [url] dependency
//   - reset loading/error at the start of each fetch
//   - AbortController cleanup
//   - check res.ok

export function useFetch(url) {
  return { data: null, loading: false, error: null }
}
