import { TEAM_MEMBERS } from '../data/mockData'

// LESSON 1: Card Frame, Header Hierarchy & Subtle Row Dividers
//
// Right now, this table looks like 1995 HTML: ugly cell borders, cramped text,
// and shouting headers. Let's transform its structural skeleton!
//
// TODO 1 (Card Frame):
//   Wrap the outer container div in a clean card frame:
//   `overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg`
//   (Also add `<div className="overflow-x-auto">` inside it for mobile scroll safety).
//
// TODO 2 (Kill Grid Boxes -> Use Horizontal Dividers):
//   On `<table>`, remove `border border-slate-500` and replace with:
//   `w-full divide-y divide-slate-800 text-left`
//
// TODO 3 (Muted Uppercase Header):
//   Style `<thead>` so labels recede visually behind the data:
//   `bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400`
//   And give each `<th>` generous breathing room: `px-6 py-3.5` (remove the old `border p-1`).
//
// TODO 4 (Body Dividers & Cell Padding):
//   On `<tbody>`, add `divide-y divide-slate-800/70 text-sm text-slate-300`.
//   On each `<td>`, replace `border p-1` with `px-6 py-4 whitespace-nowrap`.
//   Make the Member Name cell stand out with `font-medium text-slate-100`.

export default function Step1Foundation() {
  return (
    <div>
      {/* TODO 1: Add the Card Frame classes to this wrapper div */}
      <div>
        {/* TODO 2: Replace ugly border classes on <table> with w-full divide-y divide-slate-800 */}
        <table className="w-full border border-slate-500">
          {/* TODO 3: Style <thead> with muted uppercase tracking and give <th> px-6 py-3.5 */}
          <thead>
            <tr>
              <th scope="col" className="border border-slate-600 p-1">Name</th>
              <th scope="col" className="border border-slate-600 p-1">Role</th>
              <th scope="col" className="border border-slate-600 p-1">Department</th>
              <th scope="col" className="border border-slate-600 p-1">Last Active</th>
            </tr>
          </thead>

          {/* TODO 4: Add divide-y to <tbody> and px-6 py-4 whitespace-nowrap to each <td> */}
          <tbody>
            {TEAM_MEMBERS.map((member) => (
              <tr key={member.id}>
                <td className="border border-slate-600 p-1">{member.name}</td>
                <td className="border border-slate-600 p-1">{member.role}</td>
                <td className="border border-slate-600 p-1">{member.department}</td>
                <td className="border border-slate-600 p-1">{member.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
