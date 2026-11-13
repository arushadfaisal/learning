import { useState, useMemo } from 'react'
import { createDeploymentEvents } from '../data/mockTimeData'

// QUESTION 4: Date-Range Deployment Analytics & Duration Formatter
//
// Analytics dashboards filter timestamped events into rolling time windows
// ("Last 24h", "Last 7 Days", "Last 30 Days", "All Time") and summarize durations.
//
// TODO 1 (Time-Window Filtering & Chronological Sorting):
//   Filter `events` so an event is included if:
//   - Window match:
//     - `'24H'`: `referenceMs - event.timestampMs <= 24 * 3600 * 1000`
//     - `'7D'`:  `referenceMs - event.timestampMs <= 7 * 86400 * 1000`
//     - `'30D'`: `referenceMs - event.timestampMs <= 30 * 86400 * 1000`
//     - `'ALL'`: `true`
//   - Status match: `statusFilter === 'ALL' || event.status === statusFilter`
//   Then sort a copy by `timestampMs`:
//   - `'newest'`: `b.timestampMs - a.timestampMs`
//   - `'oldest'`: `a.timestampMs - b.timestampMs`
//
// TODO 2 (Duration Formatter & Summary Metrics):
//   - Write a helper `formatDuration(seconds)` using either `Temporal.Duration.from({ seconds }).round({ largestUnit: 'minute' }).toLocaleString('en-US', { style: 'short' })`
//     or `${Math.floor(seconds / 60)}m ${seconds % 60}s`.
//   - Compute `avgDurationSeconds` across the filtered deployments (or `0` if empty).
//
// TODO 3 (KPI Summary Cards + Deployment Table):
//   - Render 3 KPI summary cards: Total Deployments, Average Build Duration, and Success Count.
//   - Render the filtered deployments table with Service/Branch, Author, Status Pill, Relative/Formatted Timestamp, and right-aligned Duration!

const WINDOW_PRESETS = [
  { id: '24H', label: 'Last 24 Hours' },
  { id: '7D', label: 'Last 7 Days' },
  { id: '30D', label: 'Last 30 Days' },
  { id: 'ALL', label: 'All Time' },
]

export default function Question4DateRangeAnalytics() {
  const [referenceMs] = useState(() => Date.now())
  const [events] = useState(() => createDeploymentEvents(referenceMs))
  const [windowPreset, setWindowPreset] = useState('7D')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('newest')

  const filteredEvents = useMemo(() => {
    // TODO 1: Filter by windowPreset + statusFilter, then sort by sortOrder
    return events
  }, [events, windowPreset, statusFilter, sortOrder, referenceMs])

  void WINDOW_PRESETS
  void setWindowPreset
  void setStatusFilter
  void setSortOrder
  void filteredEvents

  return (
    <div>
      {/* Build your Date-Range Deployment Analytics dashboard here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question4DateRangeAnalytics.jsx</code> to build your Date-Range Analytics view!
      </p>
    </div>
  )
}
