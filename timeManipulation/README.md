# Time Manipulation Mastery Lab

An interactive React + Tailwind CSS v4 project designed to teach you production-grade time manipulation in React: interval lifecycles, drift-free stopwatches, debouncing, `Intl` relative formatting, `Temporal` date arithmetic, and IANA time zones.

## Quick Start

```bash
cd timeManipulation
npm install
npm run dev
```

## How to Use This Lab
1. **Start at Tab `0. Visual Guide (8 Rules)`**: Toggle individual time rules ON and OFF on a live telemetry console to see what happens when intervals leak, closures freeze, stopwatches drift, or `Date` objects mutate in place.
2. **Use the Built-In Mode Switcher (`🛠️ Your Workspace` / `✨ Target Design` / `⚖️ Split Compare`)**:
   - On every Lesson and Question, you can preview the exact working implementation (`✨ Target Design`) or compare your workspace right above the target (`⚖️ Split Compare`) without spoiling the solution code!
3. **Work Through `src/lessons/` (Steps 1–5)**: Fix broken timers, build a drift-free stopwatch, implement `useDebounce`, format relative time with `Intl`, and coordinate global time zones with `Temporal`.
4. **Conquer `src/questions/` (Questions 1–6)**: Build 6 real-world time-manipulation interfaces and custom hooks from scratch (`useCountdown`, `usePomodoro`, `usePollingMonitor`).
