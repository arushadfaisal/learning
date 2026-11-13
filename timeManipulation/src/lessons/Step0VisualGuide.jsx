import { useState, useEffect } from 'react'
import { GLOBAL_TEAM_HUBS } from '../data/mockTimeData'

const RULES = [
  {
    key: 'effectCleanup',
    title: '1. Always Clean Up Timers in useEffect',
    formula: 'useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id); }, [])',
    why: 'Without a cleanup function, re-renders or remounts stack multiple intervals in memory, causing timers to tick 2x–10x faster and leaking resources.',
  },
  {
    key: 'functionalUpdates',
    title: '2. Avoid Stale Closures with Functional Updates',
    formula: 'setSeconds((prev) => prev + 1)  // NEVER setSeconds(seconds + 1) inside [] effect!',
    why: 'An effect with [] dependencies captures the initial render scope where seconds === 0. Passing an updater function always receives the latest state.',
  },
  {
    key: 'wallClockDelta',
    title: '3. Drift-Free Elapsed Time via Wall-Clock Deltas',
    formula: 'const elapsedMs = Date.now() - startTimeRef.current',
    why: 'Browsers throttle setInterval in background tabs and heavy JS blocks ticks. Subtracting an anchor timestamp guarantees 100% accuracy.',
  },
  {
    key: 'tabularDigits',
    title: '4. Lock Digit Widths with font-mono tabular-nums',
    formula: 'className="font-mono tabular-nums tracking-tight"',
    why: 'In proportional fonts, "1" is narrower than "8", making live countdowns and stopwatches jitter horizontally on every tick.',
  },
  {
    key: 'debounceInput',
    title: '5. Debounce Rapid Input with clearTimeout Cleanup',
    formula: 'useEffect(() => { const id = setTimeout(() => setDebounced(val), 350); return () => clearTimeout(id); }, [val])',
    why: 'Cancelling the previous timeout on every keystroke waits until the user pauses typing before firing expensive filters or API calls.',
  },
  {
    key: 'nativeIntl',
    title: '6. Format with Native Intl & Temporal Duration',
    formula: "new Intl.RelativeTimeFormat('en', { numeric: 'auto' }) & new Intl.DurationFormat('en', { style: 'short' })",
    why: 'Built-in browser Intl APIs and Temporal.Duration format localized relative times ("4 minutes ago") and durations without bulky 3rd-party libraries.',
  },
  {
    key: 'immutableDates',
    title: '7. Never Mutate a Date Object In-Place',
    formula: 'Temporal.PlainDate.from(dateStr).add({ days: 1 })  // or new Date(prev.getTime() + 86400000)',
    why: 'Calling date.setDate(date.getDate() + 1) mutates the same object reference in place, so React Object.is sees no change and skips re-rendering!',
  },
  {
    key: 'ianaTimeZones',
    title: '8. Bind Global Events to IANA Time Zones',
    formula: "Temporal.Now.zonedDateTimeISO('America/New_York') // or Intl.DateTimeFormat('en-US', { timeZone })",
    why: 'Fixed UTC offsets ("UTC-5") break twice a year during Daylight Saving Time. IANA zone names automatically resolve historical and future DST shifts.',
  },
]

export default function Step0VisualGuide() {
  const [rules, setRules] = useState({
    effectCleanup: true,
    functionalUpdates: true,
    wallClockDelta: true,
    tabularDigits: true,
    debounceInput: true,
    nativeIntl: true,
    immutableDates: true,
    ianaTimeZones: true,
  })

  // Live clock & stopwatch state for interactive demonstration
  const [startAnchorMs] = useState(() => Date.now())
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [uptimeTicks, setUptimeTicks] = useState(0)
  const [naiveElapsedMs, setNaiveElapsedMs] = useState(0)
  const [simulatedLagMs, setSimulatedLagMs] = useState(0)

  // Interactive date stepper state
  const [selectedDateStr, setSelectedDateStr] = useState('2026-11-13')
  const [mutationWarning, setMutationWarning] = useState(false)

  // Interactive debounce demo state
  const [searchText, setSearchText] = useState('')
  const [executionCount, setExecutionCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setNowMs(Date.now())
      setUptimeTicks((prev) => prev + 1)
      setNaiveElapsedMs((prev) => prev + 100)
    }, 100)
    return () => clearInterval(id)
  }, [])

  // Debounced vs un-debounced effect demo
  useEffect(() => {
    if (!searchText) return
    const delay = rules.debounceInput ? 350 : 0
    const id = setTimeout(() => {
      setExecutionCount((c) => c + 1)
    }, delay)
    return () => clearTimeout(id)
  }, [searchText, rules.debounceInput])

  const toggleRule = (key) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const setAll = (val) => {
    const next = {}
    RULES.forEach((r) => {
      next[r.key] = val
    })
    setRules(next)
    setMutationWarning(false)
  }

  const triggerSimulatedCpuLag = () => {
    // Simulates 1.2s of missed interval ticks in a background/busy tab
    setSimulatedLagMs((prev) => prev + 1200)
  }

  const handleStepDay = (deltaDays) => {
    if (!rules.immutableDates) {
      // Simulate the classic broken Date.setDate() in-place mutation bug
      setMutationWarning(true)
      return
    }
    setMutationWarning(false)
    const nextDate = globalThis.Temporal.PlainDate.from(selectedDateStr).add({
      days: deltaDays,
    })
    setSelectedDateStr(nextDate.toString())
  }

  const activeCount = Object.values(rules).filter(Boolean).length
  const realElapsedMs = nowMs - startAnchorMs + simulatedLagMs
  const displayedStopwatchMs = rules.wallClockDelta ? realElapsedMs : naiveElapsedMs
  const displayedUptime = rules.functionalUpdates ? Math.floor(uptimeTicks / 10) : 1

  const formatDurationDemo = (totalSeconds) => {
    if (!rules.nativeIntl) {
      return `${totalSeconds} raw seconds`
    }
    const balanced = globalThis.Temporal.Duration.from({ seconds: totalSeconds }).round({
      largestUnit: 'hour',
    })
    return balanced.toLocaleString('en-US', { style: 'short' })
  }

  const formatRelativeDemo = (secondsAgo) => {
    if (!rules.nativeIntl) {
      return new Date(nowMs - secondsAgo * 1000).toISOString()
    }
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    return rtf.format(-Math.round(secondsAgo / 60), 'minute')
  }

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Interactive Time Engineering Lab ({activeCount}/8 Golden Rules Active)
          </h2>
          <p className="text-sm text-slate-400">
            Toggle individual rules below to see what happens when React timers leak, closures go stale, stopwatches drift, or Dates mutate in place.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAll(false)}
            className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 cursor-pointer"
          >
            Break Everything (0/8)
          </button>
          <button
            onClick={() => setAll(true)}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            Production Gold Standard (8/8)
          </button>
        </div>
      </div>

      {/* Live Telemetry Dashboard Preview */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Card 1: Timers, Closures & Drift */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rules 1–4: Interval & Clock Engine
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                rules.effectCleanup
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20'
              }`}
            >
              {rules.effectCleanup ? 'Cleanup Active' : '⚠️ Leaking Interval'}
            </span>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-slate-950/80 p-3.5 space-y-2">
            <div className="text-xs text-slate-400">Stopwatch Elapsed Time:</div>
            <div
              className={`text-2xl font-bold text-white ${
                rules.tabularDigits ? 'font-mono tabular-nums' : 'font-sans'
              }`}
            >
              {(displayedStopwatchMs / 1000).toFixed(1)}s
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Uptime Counter:{' '}
                <strong className={rules.functionalUpdates ? 'text-emerald-400' : 'text-rose-400'}>
                  {displayedUptime}s {!rules.functionalUpdates && '(Stuck at 1!)'}
                </strong>
              </span>
              <button
                onClick={triggerSimulatedCpuLag}
                className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300 hover:bg-amber-500/20 cursor-pointer"
              >
                +1.2s Tab Lag
              </button>
            </div>
            {!rules.wallClockDelta && simulatedLagMs > 0 && (
              <p className="text-[11px] text-rose-400">
                ⚠️ Naive tick counter drifted behind real wall-clock time by {(simulatedLagMs / 1000).toFixed(1)}s!
              </p>
            )}
          </div>
        </div>

        {/* Card 2: Debounce & Intl Formatting */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rules 5–6: Debounce & Intl APIs
            </span>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
              API Calls: {executionCount}
            </span>
          </div>

          <div className="space-y-2.5">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={
                rules.debounceInput
                  ? 'Type fast (debounced 350ms)...'
                  : 'Type fast (fires every keystroke!)...'
              }
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />

            <div className="rounded-lg border border-slate-800/80 bg-slate-950/80 p-3 text-xs space-y-1.5">
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Last Deploy:</span>
                <span className="font-medium text-slate-200 truncate">
                  {formatRelativeDemo(240)}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Build Duration:</span>
                <span className="font-medium text-indigo-300">
                  {formatDurationDemo(3745)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Immutable Dates & IANA Time Zones */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rules 7–8: Dates & IANA Zones
            </span>
            <span className="font-mono text-xs text-emerald-400">{selectedDateStr}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStepDay(-1)}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
            >
              ← -1 Day
            </button>
            <button
              onClick={() => handleStepDay(1)}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
            >
              +1 Day →
            </button>
            {mutationWarning && (
              <span className="text-[11px] text-rose-400">
                Mutated in-place! UI frozen.
              </span>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg border border-slate-800/80 bg-slate-950/80 p-3 text-xs">
            {GLOBAL_TEAM_HUBS.slice(0, 2).map((hub) => {
              const formatted = rules.ianaTimeZones
                ? new Intl.DateTimeFormat('en-US', {
                    timeZone: hub.timeZone,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short',
                  }).format(new Date(nowMs))
                : `${new Date(nowMs).getUTCHours()}:00 (Fixed Offset Bug)`

              return (
                <div key={hub.id} className="flex items-center justify-between">
                  <span className="text-slate-400">{hub.city}:</span>
                  <span className="font-mono tabular-nums text-slate-200">{formatted}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Interactive Toggle Cards for the 8 Rules */}
      <div className="grid gap-3 md:grid-cols-2">
        {RULES.map((rule) => {
          const isOn = rules[rule.key]
          return (
            <button
              key={rule.key}
              type="button"
              onClick={() => toggleRule(rule.key)}
              className={`flex flex-col items-start gap-1.5 rounded-xl border p-4 text-left transition-all cursor-pointer ${
                isOn
                  ? 'border-indigo-500/40 bg-slate-900/90 shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 opacity-65 hover:opacity-100'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-semibold text-slate-100 text-sm">{rule.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isOn
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isOn ? 'ON' : 'OFF'}
                </span>
              </div>
              <code className="rounded bg-slate-950 px-2 py-1 text-xs text-indigo-300 font-mono break-all">
                {rule.formula}
              </code>
              <p className="text-xs text-slate-400 leading-relaxed">{rule.why}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
