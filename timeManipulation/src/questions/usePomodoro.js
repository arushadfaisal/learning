import { useState, useEffect } from 'react'
import { POMODORO_PHASES } from '../data/mockTimeData'

// QUESTION 3 - CUSTOM HOOK: usePomodoro
//
// Build a multi-phase Pomodoro state machine hook that manages:
//   - `phaseKey`: 'focus' (1500s) | 'shortBreak' (300s) | 'longBreak' (900s)
//   - `secondsLeft`: remaining seconds in the current phase
//   - `isRunning`: boolean
//   - `completedSessions`: number of finished 'focus' sessions
//   - `fastForward`: boolean (when true, ticks every 50ms instead of 1000ms so you can test transitions fast!)
//
// TODO 1 (Ticking & Automatic Phase Transition):
//   In `useEffect`:
//   - If `!isRunning`, return early.
//   - Set interval delay to `fastForward ? 50 : 1000`.
//   - Inside the interval, decrement `secondsLeft`.
//   - When `secondsLeft` reaches `0`:
//     - If `phaseKey === 'focus'`, increment `completedSessions` by 1 and switch to `'shortBreak'`.
//     - Otherwise (`'shortBreak'` or `'longBreak'`), switch back to `'focus'`.
//   - Always return `() => clearInterval(id)`!
//
// TODO 2 (Phase Switching, Reset & Skip Controls):
//   - `selectPhase(newKey)`: pauses the timer, sets `phaseKey` to `newKey`, and sets `secondsLeft` to `POMODORO_PHASES[newKey].durationSeconds`.
//   - `resetPhase()`: pauses the timer and resets `secondsLeft` to the current phase's `durationSeconds`.
//   - `skipPhase()`: transitions immediately to the next phase (same transition rule as reaching 0).
//
// TODO 3 (Derived Progress Percentage):
//   - Compute `totalSeconds = POMODORO_PHASES[phaseKey].durationSeconds`
//   - Compute `progressPercent = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)`

export function usePomodoro() {
  const [phaseKey, setPhaseKey] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_PHASES.focus.durationSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [fastForward, setFastForward] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    // TODO 1: Run interval (50ms if fastForward else 1000ms), decrement secondsLeft,
    // and auto-transition phase when secondsLeft hits 0!
  }, [isRunning, fastForward, phaseKey])

  const selectPhase = (newKey) => {
    // TODO 2a: Switch to newKey and reset secondsLeft to POMODORO_PHASES[newKey].durationSeconds
    void newKey
  }

  const resetPhase = () => {
    // TODO 2b: Pause and reset secondsLeft for current phaseKey
  }

  const skipPhase = () => {
    // TODO 2c: Advance immediately to the next phase
  }

  const currentPhase = POMODORO_PHASES[phaseKey]
  const totalSeconds = currentPhase.durationSeconds
  const progressPercent = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)

  return {
    phaseKey,
    currentPhase,
    secondsLeft,
    isRunning,
    setIsRunning,
    completedSessions,
    fastForward,
    setFastForward,
    progressPercent,
    selectPhase,
    resetPhase,
    skipPhase,
  }
}
