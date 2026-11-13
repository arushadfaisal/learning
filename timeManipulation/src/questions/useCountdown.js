import { useState, useEffect } from 'react'

// QUESTION 2 - CUSTOM HOOK: useCountdown(targetTimestampMs)
//
// Rule: Keep all interval timing and unit breakdown math inside `useCountdown.js`
// so your UI component stays 100% focused on presentation!
//
// TODO 1 (Track Current Time without 1-Second Initial Delay):
//   - Keep state `nowMs` initialized to `() => Date.now()`.
//   - In `useEffect([targetTimestampMs])`:
//     - Immediately sync `setNowMs(Date.now())` when `targetTimestampMs` changes.
//     - Start a `250ms` (or `1000ms`) interval that updates `setNowMs(Date.now())`.
//     - Clean up with `return () => clearInterval(id)`!
//
// TODO 2 (Compute Remaining Units):
//   - Calculate `remainingMs = Math.max(0, targetTimestampMs - nowMs)`.
//   - Derive `totalSeconds = Math.ceil(remainingMs / 1000)`.
//   - Break `totalSeconds` down into:
//     - `days = Math.floor(totalSeconds / 86400)`
//     - `hours = Math.floor((totalSeconds % 86400) / 3600)`
//     - `minutes = Math.floor((totalSeconds % 3600) / 60)`
//     - `seconds = totalSeconds % 60`
//     - `isExpired = remainingMs <= 0`
//
// TODO 3: Return `{ days, hours, minutes, seconds, remainingMs, totalSeconds, isExpired }`

export function useCountdown(targetTimestampMs) {
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    // TODO 1: Start interval to update nowMs and return clearInterval cleanup
  }, [targetTimestampMs])

  void nowMs

  // TODO 2 & 3: Compute real breakdown from targetTimestampMs - nowMs
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    remainingMs: 0,
    totalSeconds: 0,
    isExpired: false,
  }
}
