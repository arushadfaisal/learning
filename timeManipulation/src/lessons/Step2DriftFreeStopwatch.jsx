import { useState, useEffect, useRef } from 'react'

// LESSON 2: Drift-Free High-Precision Stopwatch (Date.now() Anchor + useRef + Laps)
//
// Never build a stopwatch with `setElapsedMs(prev => prev + 10)` inside a 10ms interval!
// Why? Browser timers are not guaranteed to fire every 10ms (especially under load or in
// background tabs), so counting ticks causes massive time drift.
//
// The Production Formula:
//   When starting/resuming, anchor `startTimeRef.current = Date.now() - elapsedMs`.
//   Inside the interval, compute the exact wall-clock delta:
//   `setElapsedMs(Date.now() - startTimeRef.current)`
//
// TODO 1 (Drift-Free Interval with useRef Anchor):
//   In `useEffect`:
//   - If `!isRunning`, return early.
//   - Set `startTimeRef.current = Date.now() - elapsedMs`.
//   - Start a `20ms` interval that updates `setElapsedMs(Date.now() - startTimeRef.current)`.
//   - Return `() => clearInterval(id)`!
//
// TODO 2 (Format Milliseconds as MM:SS.cc):
//   Complete `formatStopwatch(ms)` below:
//   - `minutes = Math.floor(ms / 60000)`
//   - `seconds = Math.floor((ms % 60000) / 1000)`
//   - `centiseconds = Math.floor((ms % 1000) / 10)`
//   - Pad each to 2 digits with `String(val).padStart(2, '0')` -> `${mm}:${ss}.${cc}`
//
// TODO 3 (Record Lap Splits & Reset):
//   - In `handleLap()`: calculate `previousTotal = laps[0]?.totalMs ?? 0`,
//     `splitMs = elapsedMs - previousTotal`, and prepend `{ lapNumber: laps.length + 1, splitMs, totalMs: elapsedMs }` to `laps`.
//   - In `handleReset()`: stop the timer (`setIsRunning(false)`), reset `elapsedMs` to `0`, and clear `laps` (`[]`).

function formatStopwatch(ms) {
  // TODO 2: Convert ms into "MM:SS.cc" (e.g., "01:04.85") using Math.floor and .padStart(2, '0')
  const mm = Math.floor(ms / 60000)
  const ss = Math.floor((ms % 60000) / 1000)
  const cc = Math.floor((ms % 1000) / 10)
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(cc).padStart(2, '0')}`
}

export default function Step2DriftFreeStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!isRunning) return
    startTimeRef.current = Date.now() - elapsedMs
    // TODO 1: Replace this naive tick-counting interval with the drift-free Date.now() anchor formula!
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current)
    }, 20)

    return () => clearInterval(id)
  }, [isRunning])

  const handleLap = () => {
    if (!isRunning && elapsedMs === 0) return
    // TODO 3a: Compute splitMs (elapsedMs - previous lap's totalMs) and prepend the new lap to `laps`
    const previousTotal = laps[0]?.totalMs ?? 0
    const splitMs = elapsedMs - previousTotal
    setLaps((prevLaps) => [
      { lapNumber: prevLaps.length + 1, splitMs, totalMs: elapsedMs },
      ...prevLaps,
    ])
  }

  const handleReset = () => {
    // TODO 3b: Stop running, reset elapsedMs to 0, and clear laps
    setIsRunning(false)
    setElapsedMs(0)
    setLaps([])
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-6">
      {/* Stopwatch Readout Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/80 p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Drift-Free Wall-Clock Stopwatch
          </div>
          <div className="mt-2 font-mono text-4xl font-bold tabular-nums tracking-tight text-white">
            {formatStopwatch(elapsedMs)}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 ring-1 ring-inset ring-amber-500/40 hover:bg-amber-500/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            {isRunning ? '⏸ Pause' : elapsedMs > 0 ? '▶ Resume' : '▶ Start'}
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning && elapsedMs === 0}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            🏁 Lap Split
          </button>

          <button
            onClick={handleReset}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Lap Splits Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3">Lap</th>
              <th className="px-6 py-3 text-right">Lap Split</th>
              <th className="px-6 py-3 text-right">Total Elapsed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {laps.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-xs text-slate-500">
                  No laps recorded yet. Start the stopwatch and click &ldquo;Lap Split&rdquo;!
                </td>
              </tr>
            ) : (
              laps.map((lap) => (
                <tr key={lap.lapNumber} className="hover:bg-slate-800/40">
                  <td className="px-6 py-3.5 font-mono text-xs text-indigo-300">
                    Lap #{lap.lapNumber}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono tabular-nums text-green-400">
                    +{formatStopwatch(lap.splitMs)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono tabular-nums font-medium text-white">
                    {formatStopwatch(lap.totalMs)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
