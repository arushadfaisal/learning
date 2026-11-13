import { useState, useEffect } from 'react'
import { GLOBAL_TEAM_HUBS } from '../data/mockTimeData'

// QUESTION 1: Global Engineering Team World Clock & Working Hours Matrix (Build from Scratch)
//
// Distributed engineering teams constantly ask: "What time is it for London and Tokyo right now,
// and what if we schedule a meeting +4 hours from now?"
//
// TODO 1 (Live Clock + Time Offset Scrubber State):
//   - Keep state for `nowMs` (`Date.now()`) updated every `1000ms` in a `useEffect` (with `clearInterval` cleanup!).
//   - Keep state for `offsetHours` (initial `0`, range `-12` to `+12`) so the user can scrub into the past/future.
//   - Compute `targetMs = nowMs + offsetHours * 3600 * 1000`.
//
// TODO 2 (Time Zone Projection & Working-Hours Status Helper):
//   For each hub in `GLOBAL_TEAM_HUBS`:
//   - Convert `targetMs` into `hub.timeZone` using either:
//     `const zdt = Temporal.Instant.fromEpochMilliseconds(targetMs).toZonedDateTimeISO(hub.timeZone)`
//     (which gives `zdt.hour` directly as `0..23`!)
//   - Determine the hub's status badge based on `hour`:
//     - Working Hours (`hour >= hub.workStartHour && hour < hub.workEndHour`, i.e. 9–17):
//       `label: 'Working Hours'`, emerald pill
//     - Shoulder / Evening (`(hour >= 7 && hour < 9) || (hour >= 18 && hour < 22)`):
//       `label: 'Evening / Flex'`, amber pill
//     - Sleeping (`hour >= 22 || hour < 7`):
//       `label: 'Off / Sleeping'`, slate pill
//
// TODO 3 (World Clock Table / Grid UI):
//   - Render a Time Scrubber bar at the top with a range slider (`-12` to `+12` hours) and a "Reset to Live Now" button.
//   - Render a clean table of `GLOBAL_TEAM_HUBS` showing:
//     1. Hub & Team Lead (Avatar + Lead Name + City/Country)
//     2. IANA Time Zone (`font-mono text-xs text-indigo-300`)
//     3. Availability Status Badge (Working Hours / Evening / Sleeping)
//     4. Local Date & Digital Time (right-aligned `font-mono tabular-nums`)

export default function Question1WorldClock() {
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [offsetHours, setOffsetHours] = useState(0)

  useEffect(() => {
    // TODO 1: Start a 1000ms interval updating nowMs and clean it up on unmount
  }, [])

  void nowMs
  void offsetHours
  void setOffsetHours
  void GLOBAL_TEAM_HUBS

  return (
    <div>
      {/* Build your Global Team World Clock & Working Hours Matrix here! */}
      {/* Tip: Click "✨ Target Design" or "⚖️ Split Compare" above to inspect the finished tool. */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question1WorldClock.jsx</code> to build your World Clock & Working Hours Matrix!
      </p>
    </div>
  )
}
