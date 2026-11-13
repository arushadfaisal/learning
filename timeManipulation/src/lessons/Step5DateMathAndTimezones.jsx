import { useState } from 'react'
import { GLOBAL_TEAM_HUBS } from '../data/mockTimeData'

// LESSON 5: Immutable Date Math, DST Conflict Detection & Global Time Zones
//
// Legacy `Date` objects have two notorious pitfalls in React:
//   1. Calling `date.setDate(date.getDate() + 1)` mutates the object in-place, so React skips re-rendering!
//   2. Scheduling global events across Daylight Saving Time (DST) transitions can hit skipped or repeated hours.
//
// Modern JavaScript solves both with `Temporal` (polyfilled globally in `main.jsx`) and IANA time zones!
//
// TODO 1 (Immutable Calendar Date Stepping with `Temporal.PlainDate`):
//   In `handleStepDays(days)`:
//   - Parse `dateStr` using `Temporal.PlainDate.from(dateStr)`.
//   - Call `.add({ days })` (which returns a brand-new immutable `PlainDate` instance) and update `setDateStr(next.toString())`.
//   In `handleAddMonth()`:
//   - Call `Temporal.PlainDate.from(dateStr).add({ months: 1 }, { overflow: 'constrain' })` so Jan 31 safely clamps to Feb 28/29!
//
// TODO 2 (Detect DST Transitions & Build `hostZonedTime`):
//   Given `inputStr = `${dateStr}T${timeStr}[${hostZone}]``:
//   - Check if the time falls inside a DST gap/overlap by calling:
//     `Temporal.ZonedDateTime.from(inputStr, { disambiguation: 'reject' })` inside a `try / catch`.
//     If it throws a `RangeError`, set `hasDstConflict = true`!
//   - Resolve the actual `hostZonedTime` safely using:
//     `Temporal.ZonedDateTime.from(inputStr, { disambiguation: 'compatible' })`.
//
// TODO 3 (Project Across Global Cities with `.withTimeZone()`):
//   For each hub in `GLOBAL_TEAM_HUBS`:
//   - Convert `hostZonedTime` using `const localTime = hostZonedTime.withTimeZone(hub.timeZone)`.
//   - Format with `localTime.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })`.

export default function Step5DateMathAndTimezones() {
  const [dateStr, setDateStr] = useState('2026-11-13')
  const [timeStr, setTimeStr] = useState('14:00')
  const [hostZone, setHostZone] = useState('America/New_York')

  const handleStepDays = (days) => {
    // TODO 1a: Use Temporal.PlainDate.from(dateStr).add({ days }).toString()
    void days
  }

  const handleAddMonth = () => {
    // TODO 1b: Use Temporal.PlainDate.from(dateStr).add({ months: 1 }, { overflow: 'constrain' }).toString()
  }

  const loadDstConflictPreset = () => {
    // In America/New_York, 2025-03-09 at 02:30 AM was skipped during Spring Forward!
    setDateStr('2025-03-09')
    setTimeStr('02:30')
    setHostZone('America/New_York')
  }

  // TODO 2: Detect DST conflict with { disambiguation: 'reject' } and resolve with { disambiguation: 'compatible' }
  const inputStr = `${dateStr}T${timeStr}[${hostZone}]`
  const hasDstConflict = false
  const hostZonedTime = globalThis.Temporal.ZonedDateTime.from(inputStr, {
    disambiguation: 'compatible',
  })

  return (
    <div className="space-y-4">
      {/* Controls Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Global Release & Meeting Time Coordinator
            </h3>
            <p className="text-xs text-slate-400">
              Step dates immutably and project across IANA time zones with automatic DST disambiguation.
            </p>
          </div>

          <button
            onClick={loadDstConflictPreset}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            ⚡ Test NY Spring-Forward Gap (2025-03-09 02:30)
          </button>
        </div>

        {/* Inputs & Immutable Date Stepper Buttons */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">
              Release Date (PlainDate)
            </label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => e.target.value && setDateStr(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 font-mono"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => handleStepDays(-1)}
                className="rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                -1d
              </button>
              <button
                onClick={() => handleStepDays(1)}
                className="rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                +1d
              </button>
              <button
                onClick={() => handleStepDays(7)}
                className="rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                +1w
              </button>
              <button
                onClick={handleAddMonth}
                className="rounded bg-indigo-500/20 px-2.5 py-1 text-xs text-indigo-300 ring-1 ring-inset ring-indigo-500/30 hover:bg-indigo-500/30 cursor-pointer"
              >
                +1 Month (Clamped)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">
              Wall-Clock Time (PlainTime)
            </label>
            <input
              type="time"
              value={timeStr}
              onChange={(e) => e.target.value && setTimeStr(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">
              Host IANA Time Zone
            </label>
            <select
              value={hostZone}
              onChange={(e) => setHostZone(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            >
              {GLOBAL_TEAM_HUBS.map((hub) => (
                <option key={hub.timeZone} value={hub.timeZone}>
                  {hub.city} ({hub.timeZone})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DST Conflict Alert Banner */}
        {hasDstConflict && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-amber-200">
            ⚠️ <strong>DST Transition Conflict Detected:</strong>{' '}
            <code className="font-mono">{timeStr}</code> on <code className="font-mono">{dateStr}</code>{' '}
            falls inside a Daylight Saving Time gap or overlap in <code className="font-mono">{hostZone}</code>!
            Resolved safely via <code className="font-mono">disambiguation: &apos;compatible&apos;</code> to{' '}
            <code className="font-mono">{hostZonedTime.toPlainTime().toString({ smallestUnit: 'minute' })}</code>.
          </div>
        )}
      </div>

      {/* Global Time Zone Conversion Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3.5">Engineering Hub</th>
              <th className="px-6 py-3.5">IANA Time Zone</th>
              <th className="px-6 py-3.5 text-right">Converted Local Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {GLOBAL_TEAM_HUBS.map((hub) => {
              // TODO 3: Convert `hostZonedTime` to `hub.timeZone` using `.withTimeZone(hub.timeZone)`
              // and format cleanly with `.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })`
              const convertedDisplay = `${dateStr} ${timeStr} (Unconverted)`

              return (
                <tr key={hub.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-medium text-slate-100">
                    {hub.city}{' '}
                    <span className="ml-1.5 text-xs font-normal text-slate-500">
                      ({hub.country})
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-indigo-300">
                    {hub.timeZone}
                  </td>
                  <td className="px-6 py-4 text-right font-mono tabular-nums font-medium text-slate-100">
                    {convertedDisplay}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
