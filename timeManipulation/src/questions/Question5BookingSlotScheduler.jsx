import { useState, useMemo } from 'react'
import { INITIAL_BOOKED_MEETINGS } from '../data/mockTimeData'

// QUESTION 5: Calendar Time-Slot Generator & Overlap Conflict Detector
//
// Scheduling apps (like Calendly or Google Calendar) represent wall-clock times as
// minutes from midnight (e.g., 09:00 = 540, 17:00 = 1020) to make slot generation
// and overlap conflict detection rock-solid!
//
// The Universal Interval Overlap Formula:
//   Two intervals `[startA, endA)` and `[startB, endB)` overlap if and only if:
//   `startA < endB && endA > startB`
//
// TODO 1 (Format Minutes from Midnight as HH:MM AM/PM or 24h):
//   Write `formatMinutesToClock(totalMinutes)`:
//   - `hours = Math.floor(totalMinutes / 60)`
//   - `mins = totalMinutes % 60`
//   - Format with `Temporal.PlainTime.from({ hour: hours, minute: mins }).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })`
//     (or standard 12h/24h string formatting).
//
// TODO 2 (Generate Contiguous Time Slots & Detect Conflicts):
//   Inside `useMemo` from `DAY_START_MINUTES` (`540` = 9:00 AM) to `DAY_END_MINUTES` (`1020` = 5:00 PM)
//   stepping by `slotDuration` (`30` or `60` minutes):
//   - Create each slot `{ startMinutes, endMinutes: startMinutes + slotDuration }`.
//   - Find if any meeting in `meetings` overlaps this slot using:
//     `meetings.find((m) => slot.startMinutes < m.endMinutes && slot.endMinutes > m.startMinutes)`
//
// TODO 3 (Book an Available Slot & Cancel Existing Bookings):
//   - Clicking an available slot books a new meeting `{ id, title: customTitle || '1:1 Pairing Session', organizer: 'You', startMinutes, endMinutes }`.
//   - Clicking "Cancel" on a booked slot removes that meeting from `meetings`.

const DAY_START_MINUTES = 9 * 60 // 09:00 (540)
const DAY_END_MINUTES = 17 * 60 // 17:00 (1020)

export default function Question5BookingSlotScheduler() {
  const [slotDuration, setSlotDuration] = useState(30) // 30 or 60 mins
  const [meetings, setMeetings] = useState(INITIAL_BOOKED_MEETINGS)
  const [bookingTitle, setBookingTitle] = useState('Architecture Pairing')

  const slots = useMemo(() => {
    // TODO 2: Generate slots from DAY_START_MINUTES to DAY_END_MINUTES and attach any conflicting meeting
    void DAY_START_MINUTES
    void DAY_END_MINUTES
    return []
  }, [slotDuration, meetings])

  void setSlotDuration
  void setMeetings
  void bookingTitle
  void setBookingTitle
  void slots

  return (
    <div>
      {/* Build your Calendar Time-Slot Generator & Conflict Detector here! */}
      <p className="text-sm text-slate-400">
        Open <code>src/questions/Question5BookingSlotScheduler.jsx</code> to build the Time-Slot Scheduler!
      </p>
    </div>
  )
}
