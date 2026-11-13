# Time Manipulation in React — Practice Guide

Welcome to your **Time Manipulation Mastery Lab**!

## Built-In Interactive Reference Switcher
Every single Lesson and Question includes a live **View Mode Switcher** in the top-right corner:
- **🛠️ Your Workspace**: Renders the file you are currently editing in `src/lessons/` or `src/questions/`.
- **✨ Target Design**: Shows the finished, interactive reference timer/scheduler so you can test the exact behavior, controls, and edge cases.
- **⚖️ Split Compare**: Stacks **Your Workspace** right above the **Target Design** so you can compare your behavior side-by-side!
- **⏱️ React Time Cheat Sheet**: A collapsible reference drawer at the top of the app with the core React timer and date formulas.

---

## The 8 Golden Rules of Time in React
Start on Tab **0. Visual Guide (8 Rules)** in the browser and toggle each switch:
1. **Always Clean Up Timers in `useEffect`**: Return `() => clearInterval(id)` or `() => clearTimeout(id)` so pausing, re-rendering, or unmounting never stacks duplicate intervals.
2. **Avoid Stale Closures with Functional Updates**: Inside an interval callback with `[]` or `[isRunning]` dependencies, use `setSeconds((prev) => prev + 1)` instead of `setSeconds(seconds + 1)`.
3. **Never Count Ticks for Elapsed Time (Use Wall-Clock Deltas)**: Background tabs throttle `setInterval` to 1000ms+. Anchor `startTimeRef.current = Date.now() - elapsedMs` and compute `Date.now() - startTimeRef.current`.
4. **Lock Digit Widths with `font-mono tabular-nums`**: Prevent live clocks, countdowns, and stopwatches from jittering horizontally as digits change.
5. **Debounce Rapid Input with `clearTimeout` Cleanup**: Cancel pending timeouts on every keystroke so expensive work waits until typing pauses.
6. **Use Native `Intl` & `Temporal` Formatters**: Use `Intl.RelativeTimeFormat` (`"4 minutes ago"`) and `Temporal.Duration` / `Intl.DurationFormat` (`"2 min, 15 sec"`) instead of manual string math.
7. **Never Mutate a `Date` Object In-Place**: Calling `date.setDate(...)` mutates the same reference so React skips rendering. Use `Temporal.PlainDate.from(d).add({ days: 1 })` or `new Date(ms)`.
8. **Bind Global Events to IANA Time Zones**: Use IANA names (`'America/New_York'`, `'Asia/Tokyo'`) and `Temporal.ZonedDateTime` so Daylight Saving Time transitions never break schedules.

---

## Part 1: Guided Lessons (`src/lessons/`)
- **Lesson 1 (`Step1IntervalsAndCleanup.jsx`)**: Fix a leaking interval, unfreeze a stale uptime closure, and add 12h/24h formatting with `tabular-nums`.
- **Lesson 2 (`Step2DriftFreeStopwatch.jsx`)**: Refactor a drifting tick-counter into a high-precision wall-clock stopwatch (`Date.now()` + `useRef`) with Lap Splits.
- **Lesson 3 (`Step3DebounceAndThrottle.jsx`)**: Implement a reusable `useDebounce(value, delayMs)` hook and a ref-managed auto-dismiss toast timer.
- **Lesson 4 (`Step4RelativeTimeAndIntl.jsx`)**: Format live activity feed timestamps (`"just now"`, `"4m ago"`) with `Intl.RelativeTimeFormat` and semantic `<time dateTime>`.
- **Lesson 5 (`Step5DateMathAndTimezones.jsx`)**: Step calendar dates immutably with `Temporal.PlainDate`, detect DST gaps (`disambiguation: 'reject'`), and project times across global cities.

---

## Part 2: Practice Challenges (`src/questions/`)
- **Q1: Global Engineering World Clock (`Question1WorldClock.jsx`)**: Build a live multi-timezone dashboard with Working Hours / Evening / Sleeping badges and a `-12h` to `+12h` meeting scrubber.
- **Q2: Flash Sale Countdown (`useCountdown.js` & `Question2FlashSaleCountdown.jsx`)**: Build a custom countdown hook and segmented digital flip-cards with urgent and expired states.
- **Q3: Pomodoro Focus State Machine (`usePomodoro.js` & `Question3PomodoroTimer.jsx`)**: Build a multi-phase timer (`focus`, `shortBreak`, `longBreak`) with automatic phase transitions and a 20x debug speed toggle.
- **Q4: Date-Range Deployment Analytics (`Question4DateRangeAnalytics.jsx`)**: Filter timestamped events by rolling windows (`24H`, `7D`, `30D`, `ALL`), sort chronologically, and summarize durations.
- **Q5: Calendar Time-Slot Scheduler (`Question5BookingSlotScheduler.jsx`)**: Generate 30m/60m slots from `09:00` to `17:00`, detect overlapping meetings (`startA < endB && endA > startB`), and book available slots.
- **Q6: Full-Stack Live Server Polling Monitor (`usePollingMonitor.js` & `Question6LiveServerMonitor.jsx`)**: Combine **TanStack Query** (`refetchInterval`, `dataUpdatedAt`) with a live 1-second `"Synced Xs ago"` freshness ticker!
