import { useState } from 'react'
import { TEAM_MEMBERS } from '../data/mockData'

const RULES = [
  {
    key: 'cardFrame',
    title: '1. Card Frame & Overflow Clip',
    formula: 'overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg',
    why: 'Tables need a clean outer boundary with clipped corners so header backgrounds do not bleed past rounded edges.',
  },
  {
    key: 'noGridBorders',
    title: '2. Kill Vertical Grid Lines -> Use Subtle Row Dividers',
    formula: 'divide-y divide-slate-800/80 (remove border-collapse cell boxes!)',
    why: 'Spreadsheet-style vertical & horizontal boxes create visual noise. Horizontal-only hairline dividers guide the eye across rows effortlessly.',
  },
  {
    key: 'headerHierarchy',
    title: '3. Muted Uppercase Header Hierarchy',
    formula: 'bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400',
    why: 'Headers are labels, not data. Make them smaller (text-xs), tracked-out, and muted so the row data stands out as the hero.',
  },
  {
    key: 'breathingRoom',
    title: '4. Generous Cell Padding & Left Alignment',
    formula: 'px-6 py-4 text-left whitespace-nowrap',
    why: 'Cramped text kills readability. Horizontal padding (px-6) separates columns naturally without needing vertical lines.',
  },
  {
    key: 'compositeCells',
    title: '5. Multi-Line Composite Cells (Avatar + Name + Email)',
    formula: 'flex items-center gap-3 -> font-medium text-slate-100 + text-xs text-slate-400',
    why: 'Instead of wasting 2-3 separate columns for Avatar, Name, and Email, group related identity data into one rich two-line cell.',
  },
  {
    key: 'statusBadges',
    title: '6. Translucent Ring-Inset Status Pills',
    formula: 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
    why: 'Solid bright badges scream for attention. 10% opacity backgrounds + 20% inset rings + a tiny colored dot look refined and scannable.',
  },
  {
    key: 'tabularNumbers',
    title: '7. Right-Aligned Tabular Numbers',
    formula: 'text-right font-mono tabular-nums',
    why: 'Numbers and currency MUST be right-aligned with tabular-nums so ones, tens, and thousands line up vertically for instant comparison.',
  },
  {
    key: 'hoverActions',
    title: '8. Row Hover & Ghost Action Reveal',
    formula: '<tr className="group hover:bg-slate-800/50"> + <button className="opacity-0 group-hover:opacity-100">',
    why: 'Repeating bright "Edit / Delete" buttons on every row creates clutter. Reveal row actions smoothly when the user hovers the row.',
  },
]

const STATUS_STYLES = {
  Active: {
    pill: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  Invited: {
    pill: 'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/20',
    dot: 'bg-amber-400',
  },
  Offline: {
    pill: 'bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20',
    dot: 'bg-slate-400',
  },
}

export default function Step0VisualGuide() {
  const [rules, setRules] = useState({
    cardFrame: true,
    noGridBorders: true,
    headerHierarchy: true,
    breathingRoom: true,
    compositeCells: true,
    statusBadges: true,
    tabularNumbers: true,
    hoverActions: true,
  })

  const toggleRule = (key) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const setAll = (val) => {
    const next = {}
    RULES.forEach((r) => {
      next[r.key] = val
    })
    setRules(next)
  }

  const activeCount = Object.values(rules).filter(Boolean).length

  const cellPad = rules.breathingRoom ? 'px-6 py-4' : 'p-1'
  const headPad = rules.breathingRoom ? 'px-6 py-3.5' : 'p-1'
  const gridBorder = rules.noGridBorders ? '' : 'border border-slate-600'

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Interactive Table Anatomy Lab ({activeCount}/8 Design Rules Active)
          </h2>
          <p className="text-sm text-slate-400">
            Toggle individual rules below to watch a raw 1995 HTML table transform into a modern Linear/Stripe-grade UI.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAll(false)}
            className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 cursor-pointer"
          >
            Make it Ugly (0/8)
          </button>
          <button
            onClick={() => setAll(true)}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            Make it Beautiful (8/8)
          </button>
        </div>
      </div>

      {/* Live Table Preview */}
      <div
        className={
          rules.cardFrame
            ? 'overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl'
            : 'bg-slate-900'
        }
      >
        <div className="overflow-x-auto">
          <table
            className={`w-full ${
              rules.noGridBorders ? 'divide-y divide-slate-800' : 'border-collapse border border-slate-500'
            }`}
          >
            <thead
              className={
                rules.headerHierarchy
                  ? 'bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400'
                  : 'bg-slate-800 text-base font-bold text-white'
              }
            >
              <tr>
                <th scope="col" className={`${headPad} ${gridBorder} ${rules.breathingRoom ? 'text-left' : ''}`}>
                  Member
                </th>
                {!rules.compositeCells && (
                  <th scope="col" className={`${headPad} ${gridBorder} ${rules.breathingRoom ? 'text-left' : ''}`}>
                    Email
                  </th>
                )}
                <th scope="col" className={`${headPad} ${gridBorder} ${rules.breathingRoom ? 'text-left' : ''}`}>
                  Role
                </th>
                <th scope="col" className={`${headPad} ${gridBorder} ${rules.breathingRoom ? 'text-left' : ''}`}>
                  Status
                </th>
                <th
                  scope="col"
                  className={`${headPad} ${gridBorder} ${
                    rules.tabularNumbers ? 'text-right' : rules.breathingRoom ? 'text-left' : ''
                  }`}
                >
                  Compensation
                </th>
                <th scope="col" className={`${headPad} ${gridBorder} text-right`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={
                rules.noGridBorders
                  ? 'divide-y divide-slate-800/70 text-sm text-slate-300'
                  : 'text-sm text-slate-200'
              }
            >
              {TEAM_MEMBERS.map((member) => {
                const statusStyle = STATUS_STYLES[member.status]
                return (
                  <tr
                    key={member.id}
                    className={
                      rules.hoverActions
                        ? 'group transition-colors hover:bg-slate-800/50'
                        : ''
                    }
                  >
                    {/* Member Cell */}
                    <td className={`${cellPad} ${gridBorder} whitespace-nowrap`}>
                      {rules.compositeCells ? (
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${member.avatarColor}`}
                          >
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-slate-100">{member.name}</div>
                            <div className="text-xs text-slate-400">{member.email}</div>
                          </div>
                        </div>
                      ) : (
                        <span>{member.name}</span>
                      )}
                    </td>

                    {/* Separate Email Column when compositeCells is OFF */}
                    {!rules.compositeCells && (
                      <td className={`${cellPad} ${gridBorder} whitespace-nowrap`}>
                        {member.email}
                      </td>
                    )}

                    {/* Role Cell */}
                    <td className={`${cellPad} ${gridBorder} whitespace-nowrap`}>
                      {rules.compositeCells ? (
                        <div>
                          <div className="text-slate-200">{member.role}</div>
                          <div className="text-xs text-slate-500">{member.department}</div>
                        </div>
                      ) : (
                        <span>
                          {member.role} ({member.department})
                        </span>
                      )}
                    </td>

                    {/* Status Cell */}
                    <td className={`${cellPad} ${gridBorder} whitespace-nowrap`}>
                      {rules.statusBadges ? (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.pill}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                          {member.status}
                        </span>
                      ) : (
                        <span>{member.status}</span>
                      )}
                    </td>

                    {/* Salary / Numeric Cell */}
                    <td
                      className={`${cellPad} ${gridBorder} whitespace-nowrap ${
                        rules.tabularNumbers
                          ? 'text-right font-mono tabular-nums font-medium text-slate-200'
                          : ''
                      }`}
                    >
                      ${member.salary.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions Cell */}
                    <td className={`${cellPad} ${gridBorder} whitespace-nowrap text-right`}>
                      {rules.hoverActions ? (
                        <div className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white cursor-pointer">
                            Edit
                          </button>
                          <button className="rounded-md px-2.5 py-1 text-xs font-medium text-rose-400 hover:bg-rose-500/10 cursor-pointer">
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex gap-1">
                          <button className="border border-slate-500 bg-slate-700 px-2 py-0.5 text-xs text-white">
                            Edit
                          </button>
                          <button className="border border-rose-500 bg-rose-700 px-2 py-0.5 text-xs text-white">
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Checkboxes for the 8 Rules */}
      <div className="grid gap-3 md:grid-cols-2">
        {RULES.map((rule) => {
          const isOn = rules[rule.key]
          return (
            <button
              key={rule.key}
              type="button"
              onClick={() => toggleRule(rule.key)}
              className={`flex flex-col items-start gap-1.5 rounded-xl border p-4 text-left transition-all cursor-pointer ${
                isOn
                  ? 'border-indigo-500/40 bg-slate-900/90 shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 opacity-65 hover:opacity-100'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-semibold text-slate-100 text-sm">{rule.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isOn
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isOn ? 'ON' : 'OFF'}
                </span>
              </div>
              <code className="rounded bg-slate-950 px-2 py-1 text-xs text-indigo-300 font-mono break-all">
                {rule.formula}
              </code>
              <p className="text-xs text-slate-400 leading-relaxed">{rule.why}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
