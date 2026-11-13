import { usePomodoro } from './usePomodoro'
import { POMODORO_PHASES } from '../data/mockTimeData'

// QUESTION 3 - UI: Pomodoro Focus State Machine
//
// Rule: Keep all timer and phase-transition state inside `usePomodoro.js`!
//
// TODO 1 (Consume `usePomodoro()`):
//   - Destructure `{ phaseKey, currentPhase, secondsLeft, isRunning, setIsRunning, completedSessions, fastForward, setFastForward, progressPercent, selectPhase, resetPhase, skipPhase }`.
//   - Format `secondsLeft` as `MM:SS` (`Math.floor(secondsLeft / 60)` and `secondsLeft % 60` with `.padStart(2, '0')`).
//
// TODO 2 (Phase Selector Tabs & 20x Debug Speed Toggle):
//   - Render buttons for `Object.values(POMODORO_PHASES)` calling `selectPhase(p.id)`.
//   - Render a toggle button for `fastForward` (`⚡ 20x Speed Test` vs `1x Real Time`).
//
// TODO 3 (Digital Readout, Progress Bar & Controls):
//   - Display the large `MM:SS` readout in `font-mono tabular-nums`.
//   - Render a smooth progress bar whose width is `${progressPercent}%`.
//   - Wire Start/Pause (`setIsRunning`), Reset (`resetPhase`), and Skip Phase (`skipPhase`) buttons,
//     plus a counter showing `completedSessions`!

export default function Question3PomodoroTimer() {
  const pomodoro = usePomodoro()
  void pomodoro
  void POMODORO_PHASES

  return (
    <div>
      {/* Build your Pomodoro Focus State Machine UI here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/usePomodoro.js</code> and <code>src/questions/Question3PomodoroTimer.jsx</code>!
      </p>
    </div>
  )
}
