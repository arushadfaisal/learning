import { useState, useEffect } from 'react'
import { usePollingMonitor } from './usePollingMonitor'

// QUESTION 6 - UI: Full-Stack Live Polling Monitor & Data Freshness Ticker
//
// The Ultimate Capstone: Connect TanStack Query's `refetchInterval` and `dataUpdatedAt`
// timestamp to a live 1-second "Data Age" ticker (`Updated Xs ago`) and Freshness Badge!
//
// TODO 1 (State & Polling Hook):
//   - Keep state `pollIntervalMs` (initial `5000` -> options: `0` (Paused), `3000` (3s), `5000` (5s), `10000` (10s)).
//   - Keep state `nowMs` (`Date.now()`) updated every `1000ms` in a `useEffect` (with `clearInterval` cleanup!).
//   - Call `usePollingMonitor({ pollIntervalMs })` to get `{ data, isLoading, isFetching, error, dataUpdatedAt, refetch }`.
//
// TODO 2 (Compute Data Age & Freshness Status):
//   - Compute `secondsSinceSync = dataUpdatedAt ? Math.max(0, Math.floor((nowMs - dataUpdatedAt) / 1000)) : 0`.
//   - Determine freshness badge:
//     - `secondsSinceSync < 5`: `'Fresh'` (emerald pill)
//     - `secondsSinceSync < 12`: `'Aging'` (amber pill)
//     - `secondsSinceSync >= 12`: `'Stale Data'` (rose pill)
//
// TODO 3 (Toolbar + Live Telemetry Table):
//   - Render polling interval selector pills (`Paused`, `3s`, `5s`, `10s`), the live `"Last synced Xs ago"` badge, and a manual `"Sync Now"` button (`onClick={() => refetch()}`).
//   - Render the telemetry table (with shimmer skeleton rows while `isLoading`) showing Node Host, Region, Maintainer, Checked Timestamp, and right-aligned Latency (`latencyMs` ms)!

export default function Question6LiveServerMonitor() {
  const [pollIntervalMs, setPollIntervalMs] = useState(5000)
  const [nowMs, setNowMs] = useState(() => Date.now())

  const { data, isLoading, isFetching, error, dataUpdatedAt, refetch } =
    usePollingMonitor({ pollIntervalMs })

  useEffect(() => {
    // TODO 1b: Start a 1000ms interval updating nowMs so "Updated Xs ago" ticks live!
  }, [])

  void setPollIntervalMs
  void nowMs
  void data
  void isLoading
  void isFetching
  void error
  void dataUpdatedAt
  void refetch

  return (
    <div>
      {/* Build your Full-Stack Live Polling Monitor & Freshness Ticker here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/usePollingMonitor.js</code> and <code>src/questions/Question6LiveServerMonitor.jsx</code>!
      </p>
    </div>
  )
}
