import { useState } from 'react'
import Step0VisualGuide from './lessons/Step0VisualGuide'
import Step1IntervalsAndCleanup from './lessons/Step1IntervalsAndCleanup'
import Step2DriftFreeStopwatch from './lessons/Step2DriftFreeStopwatch'
import Step3DebounceAndThrottle from './lessons/Step3DebounceAndThrottle'
import Step4RelativeTimeAndIntl from './lessons/Step4RelativeTimeAndIntl'
import Step5DateMathAndTimezones from './lessons/Step5DateMathAndTimezones'

import Question1WorldClock from './questions/Question1WorldClock'
import Question2FlashSaleCountdown from './questions/Question2FlashSaleCountdown'
import Question3PomodoroTimer from './questions/Question3PomodoroTimer'
import Question4DateRangeAnalytics from './questions/Question4DateRangeAnalytics'
import Question5BookingSlotScheduler from './questions/Question5BookingSlotScheduler'
import Question6LiveServerMonitor from './questions/Question6LiveServerMonitor'

import {
  TargetStep1,
  TargetStep2,
  TargetStep3,
  TargetStep4,
  TargetStep5,
  TargetQuestion1,
  TargetQuestion2,
  TargetQuestion3,
  TargetQuestion4,
  TargetQuestion5,
  TargetQuestion6,
} from './reference/TargetPreviews'

const ITEMS = [
  {
    id: 'guide',
    group: 'Interactive Lab',
    label: '0. Visual Guide (8 Rules)',
    title: 'The 8 Golden Rules of Time Manipulation in React',
    file: 'src/lessons/Step0VisualGuide.jsx',
    description:
      'Toggle each rule ON and OFF to experience interval memory leaks, stale closures, stopwatch drift, Date mutation bugs, and IANA time zones.',
    Component: Step0VisualGuide,
    Target: null,
  },
  {
    id: 'step1',
    group: 'Guided Lessons',
    label: '1. Intervals & Cleanup',
    title: 'Lesson 1: Live Tickers, Stale Closures & useEffect Cleanup',
    file: 'src/lessons/Step1IntervalsAndCleanup.jsx',
    description:
      'Fix a leaking interval, unfreeze a stale uptime counter using functional state updates, and stabilize digital clocks with tabular-nums.',
    Component: Step1IntervalsAndCleanup,
    Target: TargetStep1,
  },
  {
    id: 'step2',
    group: 'Guided Lessons',
    label: '2. Drift-Free Stopwatch',
    title: 'Lesson 2: Drift-Free Wall-Clock Stopwatch (Date.now() + useRef + Laps)',
    file: 'src/lessons/Step2DriftFreeStopwatch.jsx',
    description:
      'Replace naive tick counting with a wall-clock timestamp anchor in useRef, format MM:SS.cc, and record Lap Splits.',
    Component: Step2DriftFreeStopwatch,
    Target: TargetStep2,
  },
  {
    id: 'step3',
    group: 'Guided Lessons',
    label: '3. Debounce & Timeouts',
    title: 'Lesson 3: Custom useDebounce Hook & Managed Toast Timeout Refs',
    file: 'src/lessons/Step3DebounceAndThrottle.jsx',
    description:
      'Delay rapid search updates with clearTimeout cleanup in useDebounce and prevent overlapping toast timers with useRef.',
    Component: Step3DebounceAndThrottle,
    Target: TargetStep3,
  },
  {
    id: 'step4',
    group: 'Guided Lessons',
    label: '4. Relative Time & Intl',
    title: 'Lesson 4: Live Relative Time ("4m ago"), Intl.RelativeTimeFormat & <time>',
    file: 'src/lessons/Step4RelativeTimeAndIntl.jsx',
    description:
      'Convert raw timestamps into live-updating relative strings ("just now", "4 minutes ago") using native Intl APIs and semantic <time dateTime>.',
    Component: Step4RelativeTimeAndIntl,
    Target: TargetStep4,
  },
  {
    id: 'step5',
    group: 'Guided Lessons',
    label: '5. Dates & Time Zones',
    title: 'Lesson 5: Immutable Date Math, DST Conflict Detection & IANA Time Zones',
    file: 'src/lessons/Step5DateMathAndTimezones.jsx',
    description:
      'Step dates immutably with Temporal.PlainDate, detect Daylight Saving Time gaps, and convert schedules across global cities.',
    Component: Step5DateMathAndTimezones,
    Target: TargetStep5,
  },
  {
    id: 'q1',
    group: 'Practice Questions',
    label: 'Q1: World Clock Matrix',
    title: 'Question 1: Global Engineering World Clock & Working Hours Scrubber',
    file: 'src/questions/Question1WorldClock.jsx',
    description:
      'Build a live multi-timezone dashboard with Working/Evening/Sleeping status badges and a -12h to +12h meeting offset scrubber.',
    Component: Question1WorldClock,
    Target: TargetQuestion1,
  },
  {
    id: 'q2',
    group: 'Practice Questions',
    label: 'Q2: Flash Sale Countdown',
    title: 'Question 2: Flash Sale Launch Countdown (useCountdown Hook + Urgency UI)',
    file: 'src/questions/useCountdown.js + Question2FlashSaleCountdown.jsx',
    description:
      'Encapsulate deadline math in useCountdown(targetMs) and build segmented digital countdown cards with urgent & expired states.',
    Component: Question2FlashSaleCountdown,
    Target: TargetQuestion2,
  },
  {
    id: 'q3',
    group: 'Practice Questions',
    label: 'Q3: Pomodoro State Machine',
    title: 'Question 3: Multi-Phase Pomodoro Timer (usePomodoro Hook + Progress Bar)',
    file: 'src/questions/usePomodoro.js + Question3PomodoroTimer.jsx',
    description:
      'Build a Focus / Short Break / Long Break state machine hook that auto-transitions at 00:00 and includes a 20x debug speed toggle.',
    Component: Question3PomodoroTimer,
    Target: TargetQuestion3,
  },
  {
    id: 'q4',
    group: 'Practice Questions',
    label: 'Q4: Date-Range Analytics',
    title: 'Question 4: Rolling Date-Range Deployment Filter & Duration Formatter',
    file: 'src/questions/Question4DateRangeAnalytics.jsx',
    description:
      'Filter timestamped deployments by Last 24h / 7d / 30d / All Time, sort chronologically, and format average build durations.',
    Component: Question4DateRangeAnalytics,
    Target: TargetQuestion4,
  },
  {
    id: 'q5',
    group: 'Practice Questions',
    label: 'Q5: Slot Conflict Scheduler',
    title: 'Question 5: Calendar Time-Slot Generator & Overlap Conflict Detector',
    file: 'src/questions/Question5BookingSlotScheduler.jsx',
    description:
      'Generate 30m/60m wall-clock slots from 09:00 to 17:00, detect overlapping meetings (startA < endB && endA > startB), and book available slots.',
    Component: Question5BookingSlotScheduler,
    Target: TargetQuestion5,
  },
  {
    id: 'q6',
    group: 'Practice Questions',
    label: 'Q6: Live Polling Monitor',
    title: 'Question 6: Full-Stack Live Server Polling & Data Freshness Ticker',
    file: 'src/questions/usePollingMonitor.js + Question6LiveServerMonitor.jsx',
    description:
      'Combine TanStack Query refetchInterval with a live 1s "Synced Xs ago" age ticker, Fresh/Aging/Stale badges, and latency measurement.',
    Component: Question6LiveServerMonitor,
    Target: TargetQuestion6,
  },
]

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [compareMode, setCompareMode] = useState('workspace') // 'workspace' | 'target' | 'split'
  const [showCheatSheet, setShowCheatSheet] = useState(false)

  const current = ITEMS[activeIndex]
  const { Component, Target } = current

  const handleSelectStep = (idx) => {
    setActiveIndex(idx)
    if (!ITEMS[idx].Target) {
      setCompareMode('workspace')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
                  ⏱
                </span>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Time Manipulation Mastery Lab
                </h1>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Master React timers, drift-free stopwatches, debouncing, Intl relative formatting, Temporal date math, and IANA time zones
              </p>
            </div>

            <button
              onClick={() => setShowCheatSheet((v) => !v)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                showCheatSheet
                  ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-200'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {showCheatSheet ? '✕ Hide Time Cheat Sheet' : '⏱️ React Time Cheat Sheet'}
            </button>
          </div>

          {/* Collapsible Cheat Sheet Drawer */}
          {showCheatSheet && (
            <div className="mt-4 grid gap-3 rounded-xl border border-indigo-500/20 bg-slate-900/90 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">1. Safe Interval + Cleanup</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  useEffect(() =&gt; &#123; const id = setInterval(() =&gt; setS(s =&gt; s + 1), 1000); return () =&gt; clearInterval(id) &#125;, [running])
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">2. Drift-Free Stopwatch</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  startRef.current = Date.now() - elapsedMs; setElapsedMs(Date.now() - startRef.current)
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">3. Debounce Effect Pattern</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  useEffect(() =&gt; &#123; const id = setTimeout(() =&gt; setDebounced(v), delay); return () =&gt; clearTimeout(id) &#125;, [v, delay])
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">4. Overlap & IANA TimeZones</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  Overlap: startA &lt; endB &amp;&amp; endA &gt; startB | Zone: Temporal.Now.zonedDateTimeISO(&apos;Asia/Tokyo&apos;)
                </code>
              </div>
            </div>
          )}

          {/* Navigation Pills */}
          <div className="mt-5 space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Lessons:
              </span>
              {ITEMS.map((item, idx) =>
                item.group !== 'Practice Questions' ? (
                  <button
                    key={item.id}
                    onClick={() => handleSelectStep(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : null
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80">
                Questions:
              </span>
              {ITEMS.map((item, idx) =>
                item.group === 'Practice Questions' ? (
                  <button
                    key={item.id}
                    onClick={() => handleSelectStep(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : null
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Step Info & Mode Switcher Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-slate-900/40 p-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-white">{current.title}</h2>
              <code className="rounded bg-slate-950 px-2 py-0.5 text-xs text-indigo-300 font-mono border border-slate-800">
                {current.file}
              </code>
            </div>
            <p className="text-xs text-slate-400">{current.description}</p>
          </div>

          {/* Workspace vs Target Switcher */}
          {Target && (
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1 text-xs">
              {[
                { id: 'workspace', label: '🛠️ Your Workspace' },
                { id: 'target', label: '✨ Target Design' },
                { id: 'split', label: '⚖️ Split Compare' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCompareMode(m.id)}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    compareMode === m.id
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Render Area */}
        {!Target || compareMode === 'workspace' ? (
          <Component />
        ) : compareMode === 'target' ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
              ✨ Viewing Target Reference Design — Interact with the timers and controls below to see how it should behave!
            </div>
            <Target />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                🛠️ Your Workspace ({current.file})
              </div>
              <Component />
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                ✨ Target Design Reference
              </div>
              <Target />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
