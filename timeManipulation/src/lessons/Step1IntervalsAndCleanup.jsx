import { useState, useEffect } from 'react'

// LESSON 1: Live Tickers, Stale Closures & useEffect Cleanup
//
// Right now, this Server Heartbeat Clock has 3 classic React timer bugs:
//   1. It never cleans up its interval when paused or unmounted (`clearInterval` missing).
//   2. `uptimeSeconds` is stuck at `1` forever because of a stale closure (`setUptimeSeconds(uptimeSeconds + 1)`).
//   3. The digital clock uses a proportional font without `tabular-nums`, so it jitters horizontally!
//
// TODO 1 (Guard & Clean Up the Interval):
//   Inside `useEffect`:
//   - If `!isRunning`, return early (`if (!isRunning) return`).
//   - Store the interval ID: `const id = setInterval(..., 1000)`.
//   - Return a cleanup function: `return () => clearInterval(id)` so React stops the timer on pause/unmount.
//   - Add `[isRunning]` to the dependency array so toggling Pause/Resume starts/stops the interval!
//
// TODO 2 (Fix the Stale Closure with Functional State Update):
//   Inside the `setInterval` callback:
//   - Update `now`: `setNow(new Date())`
//   - Replace `setUptimeSeconds(uptimeSeconds + 1)` with `setUptimeSeconds((prev) => prev + 1)`!
//
// TODO 3 (Format Clock with 12h/24h Toggle & Tabular Digits):
//   - Format `now` with `now.toLocaleTimeString('en-US', { hour12: !use24Hour, hour: '2-digit', minute: '2-digit', second: '2-digit' })`.
//   - Add `font-mono tabular-nums` to the time display and uptime counter so numbers never shift width.

export default function Step1IntervalsAndCleanup() {
  const [now, setNow] = useState(() => new Date())
  const [uptimeSeconds, setUptimeSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [use24Hour, setUse24Hour] = useState(false)

  useEffect(() => {
    // TODO 1 & TODO 2: Fix the stale closure, guard with `if (!isRunning) return`,
    // and return `() => clearInterval(id)`!
    if (!isRunning) return;
      const id =setInterval(() => {
        setNow(new Date())
        setUptimeSeconds((prev) => prev + 1) // BUG: Stale closure! Stuck at 1.
      }, 1000)
      return () => clearInterval(id)
  }, [isRunning])

  // TODO 3a: Pass `{ hour12: !use24Hour, hour: '2-digit', minute: '2-digit', second: '2-digit' }`
  const formattedTime = now.toLocaleTimeString('en-US', { 
    hour12: !use24Hour, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
  })
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-6">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isRunning ? 'Live Heartbeat Active' : 'Heartbeat Paused'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUse24Hour((prev) => !prev)}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Format: {use24Hour ? '24-Hour' : '12-Hour'}
          </button>
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer ${
              isRunning
                ? 'bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 hover:bg-emerald-500/25'
            }`}
          >
            {isRunning ? '⏸ Pause Ticker' : '▶ Resume Ticker'}
          </button>
          <button
            onClick={() => setUptimeSeconds(0)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Reset Uptime
          </button>
        </div>
      </div>

      {/* Main Clock & Uptime Readout */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            System Wall Clock
          </div>
          {/* TODO 3b: Add font-mono tabular-nums so digits never jitter horizontally */}
          <div className="mt-2 font-mono tabular-nums text-3xl font-bold text-white">
            {formattedTime}
          </div>
          <div className="mt-1 text-xs text-slate-400">{formattedDate}</div>
        </div>

        <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Session Uptime Counter
          </div>
          {/* TODO 3c: Add font-mono tabular-nums to the uptime counter */}
          <div className="mt-2 font-mono tabular-nums text-3xl font-bold text-indigo-400">
            {uptimeSeconds}s
          </div>
          <div className="mt-1 text-xs text-slate-400">
             Increments by +1 every second while active
          </div>
        </div>
      </div>
    </div>
  )
}
