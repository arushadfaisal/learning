import { useState, useEffect, useRef } from 'react'
import { KNOWLEDGE_BASE_ARTICLES } from '../data/mockTimeData'

// LESSON 3: Debounced Input Hook (`useDebounce`) & Managed Timeout Refs
//
// `setTimeout` is essential for two everyday React UX patterns:
//   1. Debouncing rapid user input so filtering/API calls wait until typing pauses.
//   2. Auto-dismissing toast notifications after N milliseconds without premature close bugs.
//
// TODO 1 (Implement `useDebounce(value, delayMs)`):
//   Inside `useDebounce`:
//   - Keep state `debouncedValue` initialized to `value`.
//   - In `useEffect([value, delayMs])`, start a `setTimeout` that calls `setDebouncedValue(value)` after `delayMs`.
//   - Return `() => clearTimeout(id)` so rapid typing cancels the previous pending timer!
//
// TODO 2 (Prevent Overlapping Toast Timers with `useRef`):
//   In `triggerToast(message)`:
//   - If `toastTimerRef.current` already exists, call `clearTimeout(toastTimerRef.current)` first!
//     (Otherwise, clicking Bookmark twice quickly causes the first timer to hide the second toast early!)
//   - Set `toastMessage(message)`.
//   - Store `toastTimerRef.current = setTimeout(() => setToastMessage(null), 2500)`.
//   - Also clean up `toastTimerRef.current` on unmount!

function useDebounce(value, delayMs = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // TODO 1: Delay updating `debouncedValue` by `delayMs` using setTimeout + clearTimeout cleanup!
    const id = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debouncedValue
}

export default function Step3DebounceAndThrottle() {
  const [query, setQuery] = useState('')
  const [delayMs, setDelayMs] = useState(400)
  const [toastMessage, setToastMessage] = useState(null)
  const toastTimerRef = useRef(null)

  const debouncedQuery = useDebounce(query, delayMs)
  const isWaitingForDebounce = query !== debouncedQuery

  const triggerToast = (message) => {
    // TODO 2: Clear any existing `toastTimerRef.current` before starting a new 2500ms timeout!
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    setToastMessage(message)
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null)
      toastTimerRef.current = null
    }, 2500)

    useEffect(() => {
      return () => {
        if (toastTimerRef.current) {
          clearTimeout(toastTimerRef.current)
        }
      }
    }, [])
  }

  const filteredArticles = KNOWLEDGE_BASE_ARTICLES.filter((art) => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return true
    return (
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-4">
      {/* Auto-Dismiss Toast Banner */}
      {toastMessage && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-300">
          <span>✨ {toastMessage} (Auto-hides after 2.5s)</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
          <div className="flex flex-1 items-center gap-3 min-w-[240px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles (e.g. closure, Temporal, Intl)..."
              className="w-full max-w-sm rounded-lg border border-slate-700/80 bg-slate-950/90 px-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isWaitingForDebounce
                  ? 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isWaitingForDebounce ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                }`}
              />
              {isWaitingForDebounce ? `Debouncing (${delayMs}ms)...` : 'Settled'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1">Delay:</span>
            {[250, 400, 800].map((ms) => (
              <button
                key={ms}
                onClick={() => setDelayMs(ms)}
                className={`rounded-lg px-2.5 py-1 font-mono cursor-pointer ${
                  delayMs === ms
                    ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ms}ms
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="divide-y divide-slate-800/70">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 hover:bg-slate-800/40 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-100 text-sm">{art.title}</span>
                  <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
                    {art.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{art.summary}</p>
              </div>

              <button
                onClick={() => triggerToast(`Bookmarked "${art.title}"`)}
                className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                ★ Bookmark (Test Toast Timer)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
