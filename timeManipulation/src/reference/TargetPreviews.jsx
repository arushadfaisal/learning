import { useState, useEffect, useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  GLOBAL_TEAM_HUBS,
  KNOWLEDGE_BASE_ARTICLES,
  createInitialActivityFeed,
  POMODORO_PHASES,
  createDeploymentEvents,
  INITIAL_BOOKED_MEETINGS,
} from '../data/mockTimeData'

// ==========================================
// TARGET: Step 1 Intervals & Cleanup
// ==========================================
export function TargetStep1() {
  const [now, setNow] = useState(() => new Date())
  const [uptimeSeconds, setUptimeSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [use24Hour, setUse24Hour] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setNow(new Date())
      setUptimeSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            System Wall Clock
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-white">
            {formattedTime}
          </div>
          <div className="mt-1 text-xs text-slate-400">{formattedDate}</div>
        </div>

        <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Session Uptime Counter
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-indigo-400">
            {uptimeSeconds}s
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Increments by +1 every second while active (functional update)
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Step 2 Drift-Free Stopwatch
// ==========================================
function formatStopwatchTarget(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, '0')
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
  return `${minutes}:${seconds}.${centiseconds}`
}

export function TargetStep2() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current)
    }, 20)

    return () => clearInterval(id)
  }, [isRunning])

  const handleToggleRun = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedMs
      setIsRunning(true)
    } else {
      setIsRunning(false)
    }
  }

  const handleLap = () => {
    if (!isRunning && elapsedMs === 0) return
    const previousTotal = laps[0]?.totalMs ?? 0
    const splitMs = Math.max(0, elapsedMs - previousTotal)
    setLaps((prev) => [
      { lapNumber: prev.length + 1, splitMs, totalMs: elapsedMs },
      ...prev,
    ])
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedMs(0)
    setLaps([])
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/80 p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Drift-Free Wall-Clock Stopwatch
          </div>
          <div className="mt-2 font-mono text-4xl font-bold tabular-nums tracking-tight text-white">
            {formatStopwatchTarget(elapsedMs)}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleRun}
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
                  <td className="px-6 py-3.5 text-right font-mono tabular-nums text-emerald-400">
                    +{formatStopwatchTarget(lap.splitMs)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono tabular-nums font-medium text-white">
                    {formatStopwatchTarget(lap.totalMs)}
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

// ==========================================
// TARGET: Step 3 Debounce & Toast Timeout
// ==========================================
export function TargetStep3() {
  const [query, setQuery] = useState('')
  const [delayMs, setDelayMs] = useState(400)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [toastMessage, setToastMessage] = useState(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query)
    }, delayMs)
    return () => clearTimeout(id)
  }, [query, delayMs])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const triggerToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    setToastMessage(message)
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  const isWaitingForDebounce = query !== debouncedQuery

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

// ==========================================
// TARGET: Step 4 Relative Time & Intl
// ==========================================
const targetRtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function formatRelativeTarget(timestampMs, nowMs) {
  const diffSeconds = Math.round((timestampMs - nowMs) / 1000)
  const absSec = Math.abs(diffSeconds)
  if (absSec < 10) return 'just now'
  if (absSec < 60) return targetRtf.format(diffSeconds, 'second')
  if (absSec < 3600) return targetRtf.format(Math.round(diffSeconds / 60), 'minute')
  if (absSec < 86400) return targetRtf.format(Math.round(diffSeconds / 3600), 'hour')
  return targetRtf.format(Math.round(diffSeconds / 86400), 'day')
}

export function TargetStep4() {
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [events, setEvents] = useState(() => createInitialActivityFeed(Date.now()))
  const [newActionText, setNewActionText] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)
    return () => clearInterval(id)
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

      <div className="divide-y divide-slate-800/70">
        {events.map((item) => {
          const iso = new Date(item.createdAtMs).toISOString()
          const fullTooltip = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          }).format(new Date(item.createdAtMs))

          return (
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

              <time
                dateTime={iso}
                title={fullTooltip}
                className="shrink-0 rounded-md bg-slate-950/80 px-2.5 py-1 font-mono text-xs text-indigo-300 border border-slate-800"
              >
                {formatRelativeTarget(item.createdAtMs, nowMs)}
              </time>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Step 5 Date Math & Time Zones
// ==========================================
export function TargetStep5() {
  const [dateStr, setDateStr] = useState('2026-11-13')
  const [timeStr, setTimeStr] = useState('14:00')
  const [hostZone, setHostZone] = useState('America/New_York')

  const handleStepDays = (days) => {
    const next = globalThis.Temporal.PlainDate.from(dateStr).add({ days })
    setDateStr(next.toString())
  }

  const handleAddMonth = () => {
    const next = globalThis.Temporal.PlainDate.from(dateStr).add(
      { months: 1 },
      { overflow: 'constrain' }
    )
    setDateStr(next.toString())
  }

  const loadDstConflictPreset = () => {
    setDateStr('2025-03-09')
    setTimeStr('02:30')
    setHostZone('America/New_York')
  }

  const inputStr = `${dateStr}T${timeStr}[${hostZone}]`
  let hasDstConflict = false
  try {
    globalThis.Temporal.ZonedDateTime.from(inputStr, { disambiguation: 'reject' })
  } catch (e) {
    if (e instanceof RangeError) {
      hasDstConflict = true
    }
  }

  const hostZonedTime = globalThis.Temporal.ZonedDateTime.from(inputStr, {
    disambiguation: 'compatible',
  })

  return (
    <div className="space-y-4">
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
              const localZdt = hostZonedTime.withTimeZone(hub.timeZone)
              const convertedDisplay = localZdt.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })

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

// ==========================================
// TARGET: Question 1 World Clock & Working Hours
// ==========================================
export function TargetQuestion1() {
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [offsetHours, setOffsetHours] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const targetMs = nowMs + offsetHours * 3600 * 1000
  const instant = globalThis.Temporal.Instant.fromEpochMilliseconds(targetMs)

  return (
    <div className="space-y-4">
      {/* Time Offset Scrubber Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              Global Meeting Scrubber
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${
                offsetHours === 0
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20'
                  : 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
              }`}
            >
              {offsetHours === 0
                ? 'LIVE NOW'
                : `${offsetHours > 0 ? `+${offsetHours}` : offsetHours}h Offset`}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Drag the slider to preview working-hour overlaps across all 5 engineering hubs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={-12}
            max={12}
            step={1}
            value={offsetHours}
            onChange={(e) => setOffsetHours(Number(e.target.value))}
            className="w-44 accent-indigo-500 cursor-pointer"
          />
          <button
            onClick={() => setOffsetHours(0)}
            disabled={offsetHours === 0}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
          >
            Reset Live
          </button>
        </div>
      </div>

      {/* World Clock Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-3.5">Hub & Lead</th>
                <th className="px-6 py-3.5">IANA Time Zone</th>
                <th className="px-6 py-3.5">Working Status</th>
                <th className="px-6 py-3.5 text-right">Local Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
              {GLOBAL_TEAM_HUBS.map((hub) => {
                const zdt = instant.toZonedDateTimeISO(hub.timeZone)
                const hour = zdt.hour

                let statusBadge = {
                  label: 'Off / Sleeping',
                  pill: 'bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20',
                  dot: 'bg-slate-400',
                }
                if (hour >= hub.workStartHour && hour < hub.workEndHour) {
                  statusBadge = {
                    label: 'Working Hours (9–18)',
                    pill: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
                    dot: 'bg-emerald-400',
                  }
                } else if ((hour >= 7 && hour < 9) || (hour >= 18 && hour < 22)) {
                  statusBadge = {
                    label: 'Evening / Flex',
                    pill: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
                    dot: 'bg-amber-400',
                  }
                }

                const timeFormatted = zdt.toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
                const dateFormatted = zdt.toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })

                return (
                  <tr key={hub.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${hub.avatarColor}`}
                        >
                          {hub.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">
                            {hub.city}{' '}
                            <span className="text-xs font-normal text-slate-400">
                              — {hub.lead}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{hub.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-indigo-300">
                      {hub.timeZone} ({zdt.offset})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.pill}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums">
                      <div className="font-semibold text-white">{timeFormatted}</div>
                      <div className="text-xs text-slate-400">{dateFormatted}</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 2 Flash Sale Countdown
// ==========================================
export function TargetQuestion2() {
  const [targetMs, setTargetMs] = useState(() => Date.now() + 95 * 1000)
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 250)
    return () => clearInterval(id)
  }, [targetMs])

  const updateDeadline = (updater) => {
    const now = Date.now()
    setNowMs(now)
    setTargetMs((prev) => updater(prev, now))
  }

  const remainingMs = Math.max(0, targetMs - nowMs)
  const totalSeconds = Math.ceil(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const isExpired = remainingMs <= 0
  const isUrgent = !isExpired && totalSeconds <= 30

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-6">
      {/* Header & Urgency Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-semibold text-white">
            Pro Annual Plan — 40% Launch Discount
          </h3>
          <p className="text-xs text-slate-400">
            Powered by custom hook <code className="font-mono text-indigo-300">useCountdown(targetTimestampMs)</code>
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isExpired
              ? 'bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30'
              : isUrgent
              ? 'bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30 animate-pulse'
              : 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isExpired ? 'bg-rose-400' : isUrgent ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
          />
          {isExpired
            ? 'Offer Expired'
            : isUrgent
            ? 'Final Seconds — Ending Soon!'
            : 'Flash Sale Active'}
        </span>
      </div>

      {/* 4 Segmented Digital Countdown Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Days', val: pad(days) },
          { label: 'Hours', val: pad(hours) },
          { label: 'Minutes', val: pad(minutes) },
          { label: 'Seconds', val: pad(seconds) },
        ].map((unit) => (
          <div
            key={unit.label}
            className={`rounded-xl border p-4 text-center transition-colors ${
              isExpired
                ? 'border-rose-500/20 bg-rose-950/15'
                : isUrgent
                ? 'border-amber-500/30 bg-amber-950/15'
                : 'border-slate-800 bg-slate-950/80'
            }`}
          >
            <div className="font-mono text-3xl font-bold tabular-nums text-white">
              {unit.val}
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Time Manipulation Test Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
        <span className="text-xs font-medium text-slate-400">
          Manipulate Target Deadline:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateDeadline((prev, now) => Math.max(now, prev) + 15 * 1000)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            +15 Seconds
          </button>
          <button
            onClick={() => updateDeadline((prev, now) => Math.max(now, prev) + 5 * 60 * 1000)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            +5 Minutes
          </button>
          <button
            onClick={() => updateDeadline((_prev, now) => now + 8 * 1000)}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            ⚡ Set to 8s (Urgent State)
          </button>
          <button
            onClick={() => updateDeadline((_prev, now) => now - 1000)}
            className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 cursor-pointer"
          >
            Expire Now
          </button>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 3 Pomodoro State Machine
// ==========================================
export function TargetQuestion3() {
  const [phaseKey, setPhaseKey] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_PHASES.focus.durationSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(1)
  const [fastForward, setFastForward] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const tickMs = fastForward ? 50 : 1000

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phaseKey === 'focus') {
            setCompletedSessions((c) => c + 1)
            setPhaseKey('shortBreak')
            return POMODORO_PHASES.shortBreak.durationSeconds
          } else {
            setPhaseKey('focus')
            return POMODORO_PHASES.focus.durationSeconds
          }
        }
        return prev - 1
      })
    }, tickMs)

    return () => clearInterval(id)
  }, [isRunning, fastForward, phaseKey])

  const selectPhase = (newKey) => {
    setIsRunning(false)
    setPhaseKey(newKey)
    setSecondsLeft(POMODORO_PHASES[newKey].durationSeconds)
  }

  const resetPhase = () => {
    setIsRunning(false)
    setSecondsLeft(POMODORO_PHASES[phaseKey].durationSeconds)
  }

  const skipPhase = () => {
    setIsRunning(false)
    if (phaseKey === 'focus') {
      setCompletedSessions((c) => c + 1)
      setPhaseKey('shortBreak')
      setSecondsLeft(POMODORO_PHASES.shortBreak.durationSeconds)
    } else {
      setPhaseKey('focus')
      setSecondsLeft(POMODORO_PHASES.focus.durationSeconds)
    }
  }

  const currentPhase = POMODORO_PHASES[phaseKey]
  const totalSeconds = currentPhase.durationSeconds
  const progressPercent = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg space-y-6">
      {/* Phase Tabs & Speed Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-1.5">
          {Object.values(POMODORO_PHASES).map((p) => (
            <button
              key={p.id}
              onClick={() => selectPhase(p.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                phaseKey === p.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFastForward((f) => !f)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
            fastForward
              ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          {fastForward ? '⚡ 20x Speed Active (50ms/tick)' : '🐢 1x Normal Speed'}
        </button>
      </div>

      {/* Main Timer Display & Progress Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 text-center space-y-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ring-1 ring-inset ${currentPhase.badgeClass}`}
        >
          Current Phase: {currentPhase.label}
        </span>

        <div className="font-mono text-5xl font-bold tabular-nums tracking-tight text-white">
          {mm}:{ss}
        </div>

        {/* Progress Bar */}
        <div className="mx-auto max-w-md space-y-1.5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-indigo-500 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>{progressPercent}% elapsed</span>
            <span>Completed Focus Sessions: 🏆 {completedSessions}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => setIsRunning((r) => !r)}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 cursor-pointer"
          >
            {isRunning ? '⏸ Pause' : '▶ Start Timer'}
          </button>
          <button
            onClick={resetPhase}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            ↺ Reset Phase
          </button>
          <button
            onClick={skipPhase}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            ⏭ Skip to Next
          </button>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 4 Date-Range Analytics
// ==========================================
export function TargetQuestion4() {
  const [referenceMs] = useState(() => Date.now())
  const [events] = useState(() => createDeploymentEvents(referenceMs))
  const [windowPreset, setWindowPreset] = useState('7D')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('newest')

  const filteredEvents = useMemo(() => {
    const HOUR = 3600 * 1000
    const DAY = 24 * HOUR
    const maxAgeMap = {
      '24H': 24 * HOUR,
      '7D': 7 * DAY,
      '30D': 30 * DAY,
      ALL: Infinity,
    }
    const maxAge = maxAgeMap[windowPreset] ?? Infinity

    return events
      .filter((ev) => {
        const withinWindow = referenceMs - ev.timestampMs <= maxAge
        const matchesStatus = statusFilter === 'ALL' || ev.status === statusFilter
        return withinWindow && matchesStatus
      })
      .sort((a, b) =>
        sortOrder === 'newest'
          ? b.timestampMs - a.timestampMs
          : a.timestampMs - b.timestampMs
      )
  }, [events, windowPreset, statusFilter, sortOrder, referenceMs])

  const formatDurationShort = (seconds) => {
    const d = globalThis.Temporal.Duration.from({ seconds }).round({
      largestUnit: 'minute',
    })
    return d.toLocaleString('en-US', { style: 'short' })
  }

  const avgDurationSec =
    filteredEvents.length > 0
      ? Math.round(
          filteredEvents.reduce((acc, ev) => acc + ev.durationSeconds, 0) /
            filteredEvents.length
        )
      : 0

  const successCount = filteredEvents.filter((e) => e.status === 'Success').length

  return (
    <div className="space-y-4">
      {/* KPI Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Matching Deployments
          </div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
            {filteredEvents.length}
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Avg Build Duration
          </div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-indigo-300">
            {formatDurationShort(avgDurationSec)}
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Successful Builds
          </div>
          <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {successCount} / {filteredEvents.length}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: '24H', label: 'Last 24h' },
              { id: '7D', label: 'Last 7 Days' },
              { id: '30D', label: 'Last 30 Days' },
              { id: 'ALL', label: 'All Time' },
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => setWindowPreset(w.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer ${
                  windowPreset === w.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'Success', 'Failed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer ${
                  statusFilter === st
                    ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
            >
              Sort: {sortOrder === 'newest' ? '↓ Newest First' : '↑ Oldest First'}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-3.5">Service & Branch</th>
                <th className="px-6 py-3.5">Author</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Deployed At</th>
                <th className="px-6 py-3.5 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-100">{ev.service}</div>
                    <div className="font-mono text-xs text-slate-400">{ev.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {ev.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ev.status === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                    {formatRelativeTarget(ev.timestampMs, referenceMs)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono tabular-nums font-medium text-slate-200">
                    {formatDurationShort(ev.durationSeconds)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 5 Booking Slot Scheduler
// ==========================================
function formatMinutesClock(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  return globalThis.Temporal.PlainTime.from({ hour, minute }).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function TargetQuestion5() {
  const [slotDuration, setSlotDuration] = useState(30)
  const [meetings, setMeetings] = useState(INITIAL_BOOKED_MEETINGS)
  const [bookingTitle, setBookingTitle] = useState('Architecture Pairing')

  const slots = useMemo(() => {
    const result = []
    const startDay = 9 * 60
    const endDay = 17 * 60
    for (let start = startDay; start + slotDuration <= endDay; start += slotDuration) {
      const end = start + slotDuration
      const conflict = meetings.find(
        (m) => start < m.endMinutes && end > m.startMinutes
      )
      result.push({ startMinutes: start, endMinutes: end, conflict })
    }
    return result
  }, [slotDuration, meetings])

  const handleBookSlot = (slot) => {
    const title = bookingTitle.trim() || '1:1 Engineering Sync'
    setMeetings((prev) => [
      ...prev,
      {
        id: `mtg-${Date.now()}`,
        title,
        organizer: 'You',
        startMinutes: slot.startMinutes,
        endMinutes: slot.endMinutes,
      },
    ])
  }

  const handleCancelMeeting = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-medium text-slate-400">
            New Meeting Title:
          </label>
          <input
            type="text"
            value={bookingTitle}
            onChange={(e) => setBookingTitle(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Slot Size:</span>
          {[30, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => setSlotDuration(mins)}
              className={`rounded-lg px-3 py-1.5 font-mono font-medium cursor-pointer ${
                slotDuration === mins
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const isBooked = Boolean(slot.conflict)
          return (
            <div
              key={slot.startMinutes}
              className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
                isBooked
                  ? 'border-rose-500/25 bg-rose-950/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="font-mono text-xs font-semibold tabular-nums text-white">
                  {formatMinutesClock(slot.startMinutes)} – {formatMinutesClock(slot.endMinutes)}
                </div>
                {isBooked ? (
                  <div className="mt-1 text-xs text-rose-300">
                    🔒 {slot.conflict.title} ({slot.conflict.organizer})
                  </div>
                ) : (
                  <div className="mt-1 text-xs text-emerald-400">● Available Slot</div>
                )}
              </div>

              {isBooked ? (
                <button
                  onClick={() => handleCancelMeeting(slot.conflict.id)}
                  className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => handleBookSlot(slot)}
                  className="rounded-lg bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30 hover:bg-emerald-500/25 cursor-pointer"
                >
                  + Book
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// TARGET: Question 6 Live Server Monitor
// ==========================================
export function TargetQuestion6() {
  const [pollIntervalMs, setPollIntervalMs] = useState(5000)
  const [nowMs, setNowMs] = useState(() => Date.now())

  const { data, isLoading, isFetching, error, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['target-server-nodes'],
    refetchInterval: pollIntervalMs || false,
    queryFn: async ({ signal }) => {
      const startMs = performance.now()
      const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5', {
        signal,
      })
      if (!res.ok) throw new Error('Failed to fetch server telemetry')
      const users = await res.json()
      const latencyMs = Math.max(14, Math.round(performance.now() - startMs))
      return {
        latencyMs,
        nodes: users.map((u) => ({
          id: u.id,
          host: u.website,
          region: u.address.city,
          maintainer: u.name,
          latencyMs: latencyMs + u.id * 3,
          checkedAtIso: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        })),
      }
    },
  })

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const secondsSinceSync = dataUpdatedAt
    ? Math.max(0, Math.floor((nowMs - dataUpdatedAt) / 1000))
    : 0

  let freshness = {
    label: `Fresh (${secondsSinceSync}s ago)`,
    pill: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
  }
  if (secondsSinceSync >= 12) {
    freshness = {
      label: `Stale (${secondsSinceSync}s ago)`,
      pill: 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20',
    }
  } else if (secondsSinceSync >= 5) {
    freshness = {
      label: `Aging (${secondsSinceSync}s ago)`,
      pill: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
      {/* Telemetry Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium ${freshness.pill}`}
          >
            {isFetching ? '⟳ Syncing...' : freshness.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Poll Interval:</span>
          {[
            { ms: 0, label: 'Paused' },
            { ms: 3000, label: '3s' },
            { ms: 5000, label: '5s' },
            { ms: 10000, label: '10s' },
          ].map((opt) => (
            <button
              key={opt.ms}
              onClick={() => setPollIntervalMs(opt.ms)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs cursor-pointer ${
                pollIntervalMs === opt.ms
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-lg border border-indigo-500/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/25 disabled:opacity-50 cursor-pointer"
          >
            ↻ Sync Now
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-800 text-left">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3.5">Edge Node Host</th>
              <th className="px-6 py-3.5">Region</th>
              <th className="px-6 py-3.5">Maintainer</th>
              <th className="px-6 py-3.5">Last Checked</th>
              <th className="px-6 py-3.5 text-right">Ping Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-800" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-slate-800" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="ml-auto h-4 w-14 animate-pulse rounded bg-slate-800" />
                  </td>
                </tr>
              ))}

            {error && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-rose-400">
                  Error: {error.message}
                </td>
              </tr>
            )}

            {!isLoading &&
              data?.nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-300">
                    {node.host}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{node.region}</td>
                  <td className="px-6 py-4 text-slate-200">{node.maintainer}</td>
                  <td className="px-6 py-4 font-mono tabular-nums text-xs text-slate-400">
                    {node.checkedAtIso}
                  </td>
                  <td className="px-6 py-4 text-right font-mono tabular-nums font-medium text-emerald-400">
                    {node.latencyMs} ms
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
