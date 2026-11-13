import { useState, useEffect } from 'react'
import { createInitialActivityFeed } from '../data/mockTimeData'

// LESSON 4: Live Relative Timestamps ("4 minutes ago"), Intl.RelativeTimeFormat & <time>
//
// Raw ISO strings like `2026-11-13T13:10:00.000Z` are hard for humans to scan in an activity feed.
// Modern browsers ship `Intl.RelativeTimeFormat` built-in — zero external libraries needed!
//
// TODO 1 (Implement `formatRelativeTime(timestampMs, nowMs)`):
//   Use `const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })`:
//   - Compute `diffSeconds = Math.round((timestampMs - nowMs) / 1000)` (negative for past events).
//   - If `Math.abs(diffSeconds) < 10`, return `'just now'`.
//   - If `Math.abs(diffSeconds) < 60`, return `rtf.format(diffSeconds, 'second')`.
//   - If `Math.abs(diffSeconds) < 3600`, return `rtf.format(Math.round(diffSeconds / 60), 'minute')`.
//   - If `Math.abs(diffSeconds) < 86400`, return `rtf.format(Math.round(diffSeconds / 3600), 'hour')`.
//   - Otherwise, return `rtf.format(Math.round(diffSeconds / 86400), 'day')`.
//
// TODO 2 (Live Refresh Ticker):
//   In `useEffect`, start a `1000ms` interval that updates `setNowMs(Date.now())` (with cleanup!)
//   so newly posted events automatically transition from "just now" -> "10 seconds ago" -> "1 minute ago"!
//
// TODO 3 (Semantic `<time dateTime={...}>` Element):
//   Replace the plain `<span>` timestamp with a semantic `<time>` element:
//   - `dateTime={new Date(item.createdAtMs).toISOString()}`
//   - `title={new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(item.createdAtMs))}`

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function formatRelativeTime(timestampMs, nowMs) {
  // TODO 1: Replace this raw ISO string with Intl.RelativeTimeFormat buckets!
  void rtf
  void nowMs
  return new Date(timestampMs).toISOString()
}

export default function Step4RelativeTimeAndIntl() {
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [events, setEvents] = useState(() => createInitialActivityFeed(Date.now()))
  const [newActionText, setNewActionText] = useState('')

  useEffect(() => {
    // TODO 2: Add a 1000ms interval that updates `setNowMs(Date.now())` and cleans up on unmount
  }, [])

  const handleAddEvent = (e) => {
    e.preventDefault()
    const trimmed = newActionText.trim() || 'Triggered manual edge cache purge'
    const now = Date.now()
    setNowMs(now)
    setEvents((prev) => [
      {
        id: `act-${now}`,
        actor: 'You (Live Session)',
        avatar: 'YO',
        avatarColor: 'bg-indigo-500/20 text-indigo-300 ring-indigo-500/30',
        action: trimmed,
        environment: 'production',
        createdAtMs: now,
      },
      ...prev,
    ])
    setNewActionText('')
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      {/* Top Action Bar to Post a Live Timestamped Event */}
      <form
        onSubmit={handleAddEvent}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4"
      >
        <input
          type="text"
          value={newActionText}
          onChange={(e) => setNewActionText(e.target.value)}
          placeholder="Post a new deployment event to test live 'just now' -> '10s ago'..."
          className="flex-1 min-w-[240px] rounded-lg border border-slate-700/80 bg-slate-950 px-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 cursor-pointer"
        >
          + Post Event (Now)
        </button>
      </form>

      {/* Activity Feed Rows */}
      <div className="divide-y divide-slate-800/70">
        {events.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${item.avatarColor}`}
              >
                {item.avatar}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-100">{item.action}</div>
                <div className="text-xs text-slate-400">
                  by <span className="text-slate-300">{item.actor}</span> in{' '}
                  <code className="rounded bg-slate-950 px-1.5 py-0.5 text-[11px] text-indigo-300 font-mono">
                    {item.environment}
                  </code>
                </div>
              </div>
            </div>

            {/* TODO 3: Replace <span> with semantic <time dateTime={...} title={...}> */}
            <span className="shrink-0 font-mono text-xs text-slate-400">
              {formatRelativeTime(item.createdAtMs, nowMs)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
