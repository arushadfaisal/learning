import { useState } from 'react'
import { useCountdown } from './useCountdown'

// QUESTION 2 - UI: Flash Sale & Event Launch Countdown
//
// Rule: Consume `useCountdown(targetMs)` for all countdown values!
//
// TODO 1 (Consume `useCountdown`):
//   - Call `const { days, hours, minutes, seconds, totalSeconds, isExpired } = useCountdown(targetMs)`
//   - Helper to pad numbers to 2 digits: `String(n).padStart(2, '0')`
//
// TODO 2 (Quick Time Manipulation Controls):
//   - Wire buttons to test time manipulation on `targetMs`:
//     1. `+15 Seconds`: `setTargetMs((prev) => Math.max(Date.now(), prev) + 15 * 1000)`
//     2. `+5 Minutes`: `setTargetMs((prev) => Math.max(Date.now(), prev) + 5 * 60 * 1000)`
//     3. `Test 6s Urgency`: `setTargetMs(Date.now() + 6 * 1000)`
//     4. `Expire Immediately`: `setTargetMs(Date.now() - 1000)`
//
// TODO 3 (Segmented Digital Tiles & Urgency States):
//   - Render 4 digital tiles (`Days`, `Hours`, `Minutes`, `Seconds`) with `font-mono tabular-nums`.
//   - Change badge/accent color based on urgency:
//     - `isExpired`: rose badge `"Offer Expired"`
//     - `totalSeconds <= 30`: amber/rose urgent pulse `"Ending Any Second!"`
//     - Otherwise: emerald badge `"Flash Sale Live"`

export default function Question2FlashSaleCountdown() {
  const [targetMs, setTargetMs] = useState(() => Date.now() + 95 * 1000) // Starts at 1m 35s from mount
  const countdown = useCountdown(targetMs)

  void setTargetMs
  void countdown

  return (
    <div>
      {/* Build your Flash Sale Countdown UI here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/useCountdown.js</code> and <code>src/questions/Question2FlashSaleCountdown.jsx</code>!
      </p>
    </div>
  )
}
