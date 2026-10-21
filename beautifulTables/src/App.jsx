import { useState } from 'react'
import Step0VisualGuide from './lessons/Step0VisualGuide'
import Step1Foundation from './lessons/Step1Foundation'
import Step2CellsAndBadges from './lessons/Step2CellsAndBadges'
import Step3RowStates from './lessons/Step3RowStates'
import Step4SortAndFilter from './lessons/Step4SortAndFilter'
import Step5SkeletonsAndEmpty from './lessons/Step5SkeletonsAndEmpty'

import Question1TeamDirectory from './questions/Question1TeamDirectory'
import Question2InvoiceLedger from './questions/Question2InvoiceLedger'
import Question3BulkInventory from './questions/Question3BulkInventory'
import Question4CryptoWatchlist from './questions/Question4CryptoWatchlist'
import Question5ExpandableOrders from './questions/Question5ExpandableOrders'
import Question6AsyncServerTable from './questions/Question6AsyncServerTable'

import {
  TargetStep1,
  TargetStep2,
  TargetStep3,
  TargetStep4,
  TargetStep5,
  TargetQuestion1,
  TargetQuestion2,
  TargetQuestion3,
  TargetQuestion4,
  TargetQuestion5,
  TargetQuestion6,
} from './reference/TargetPreviews'

const ITEMS = [
  {
    id: 'guide',
    group: 'Interactive Lab',
    label: '0. Visual Guide (8 Rules)',
    title: 'The 8 Rules of Beautiful Tables',
    file: 'src/lessons/Step0VisualGuide.jsx',
    description:
      'Toggle each design rule ON and OFF to see how a raw HTML table transforms into a Linear/Stripe-level interface.',
    Component: Step0VisualGuide,
    Target: null,
  },
  {
    id: 'step1',
    group: 'Guided Lessons',
    label: '1. Frame & Dividers',
    title: 'Lesson 1: Card Frame, Header Hierarchy & Subtle Dividers',
    file: 'src/lessons/Step1Foundation.jsx',
    description:
      'Fix a 1995-style bordered table by adding a rounded card frame, uppercase muted headers, generous cell padding, and horizontal hairline dividers.',
    Component: Step1Foundation,
    Target: TargetStep1,
  },
  {
    id: 'step2',
    group: 'Guided Lessons',
    label: '2. Cells & Badges',
    title: 'Lesson 2: Composite Cells, Ring-Inset Badges & Tabular Numbers',
    file: 'src/lessons/Step2CellsAndBadges.jsx',
    description:
      'Combine Avatar + Name + Email into a two-line composite cell, craft soft status pills with dots, and right-align numbers with tabular-nums.',
    Component: Step2CellsAndBadges,
    Target: TargetStep2,
  },
  {
    id: 'step3',
    group: 'Guided Lessons',
    label: '3. Row States',
    title: 'Lesson 3: Row Hover, Selection Tinting & Ghost Actions',
    file: 'src/lessons/Step3RowStates.jsx',
    description:
      'Wire row selection checkboxes, tint selected rows with indigo-500/10, and use group-hover to reveal Edit/Remove actions only when a row is hovered.',
    Component: Step3RowStates,
    Target: TargetStep3,
  },
  {
    id: 'step4',
    group: 'Guided Lessons',
    label: '4. Sort & Filter',
    title: 'Lesson 4: Integrated Toolbar, Filter Pills & Sortable Headers',
    file: 'src/lessons/Step4SortAndFilter.jsx',
    description:
      'Connect search + status filter pills in the card header and make column headers clickable to toggle ascending/descending sort.',
    Component: Step4SortAndFilter,
    Target: TargetStep4,
  },
  {
    id: 'step5',
    group: 'Guided Lessons',
    label: '5. Skeletons & Empty',
    title: 'Lesson 5: Shimmer Row Skeletons, Empty State & Pagination Footer',
    file: 'src/lessons/Step5SkeletonsAndEmpty.jsx',
    description:
      'Eliminate layout shift with column-accurate animate-pulse skeleton rows, a colSpan empty state, and a pagination footer.',
    Component: Step5SkeletonsAndEmpty,
    Target: TargetStep5,
  },
  {
    id: 'q1',
    group: 'Practice Questions',
    label: 'Q1: Team Directory',
    title: 'Question 1: SaaS Team Directory (Build from Scratch)',
    file: 'src/questions/Question1TeamDirectory.jsx',
    description:
      'Build a complete Linear-style Team Directory table from scratch applying all 8 foundational rules.',
    Component: Question1TeamDirectory,
    Target: TargetQuestion1,
  },
  {
    id: 'q2',
    group: 'Practice Questions',
    label: 'Q2: Invoice Ledger',
    title: 'Question 2: Stripe-Style Invoice Ledger & Summary Footer (<tfoot>)',
    file: 'src/questions/Question2InvoiceLedger.jsx',
    description:
      'Build a financial statement table with monospace invoice IDs, status filter tabs, right-aligned tabular currency, and a live <tfoot> total row.',
    Component: Question2InvoiceLedger,
    Target: TargetQuestion2,
  },
  {
    id: 'q3',
    group: 'Practice Questions',
    label: 'Q3: Bulk Inventory',
    title: 'Question 3: Selectable Inventory & Contextual Bulk Action Bar',
    file: 'src/questions/Question3BulkInventory.jsx',
    description:
      'Implement Select All + row checkboxes and reveal a floating Bulk Action Bar to restock (+10) or delete selected items.',
    Component: Question3BulkInventory,
    Target: TargetQuestion3,
  },
  {
    id: 'q4',
    group: 'Practice Questions',
    label: 'Q4: Crypto Watchlist',
    title: 'Question 4: Sortable Market Watchlist (Custom Hook + Table UI)',
    file: 'src/questions/useCryptoTable.js + Question4CryptoWatchlist.jsx',
    description:
      'Encapsulate search, category filtering, and multi-column sorting in useCryptoTable.js, and render positive/negative 24h delta badges.',
    Component: Question4CryptoWatchlist,
    Target: TargetQuestion4,
  },
  {
    id: 'q5',
    group: 'Practice Questions',
    label: 'Q5: Expandable Orders',
    title: 'Question 5: Master-Detail Expandable Orders Table',
    file: 'src/questions/Question5ExpandableOrders.jsx',
    description:
      'Click any order row to rotate its chevron and smoothly expand a nested <td colSpan={6}> drawer showing line items and shipping details.',
    Component: Question5ExpandableOrders,
    Target: TargetQuestion5,
  },
  {
    id: 'q6',
    group: 'Practice Questions',
    label: 'Q6: Async Server Table',
    title: 'Question 6: Full-Stack Async Data Table (TanStack Query + Skeletons)',
    file: 'src/questions/useServerUsersTable.js + Question6AsyncServerTable.jsx',
    description:
      'Combine your Data Fetching skills with Beautiful Tables: query live users with search + pagination, shimmer loading skeletons, and empty states.',
    Component: Question6AsyncServerTable,
    Target: TargetQuestion6,
  },
]

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [compareMode, setCompareMode] = useState('workspace') // 'workspace' | 'target' | 'split'
  const [showCheatSheet, setShowCheatSheet] = useState(false)

  const current = ITEMS[activeIndex]
  const { Component, Target } = current

  const handleSelectStep = (idx) => {
    setActiveIndex(idx)
    if (!ITEMS[idx].Target) {
      setCompareMode('workspace')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
                  ⊞
                </span>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Beautiful Tables Mastery Lab
                </h1>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Learn modern UI table architecture, typography, alignment, and interactive patterns in React + Tailwind CSS
              </p>
            </div>

            <button
              onClick={() => setShowCheatSheet((v) => !v)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                showCheatSheet
                  ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-200'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {showCheatSheet ? '✕ Hide Tailwind Cheat Sheet' : '🎨 Tailwind Table Cheat Sheet'}
            </button>
          </div>

          {/* Collapsible Cheat Sheet Drawer */}
          {showCheatSheet && (
            <div className="mt-4 grid gap-3 rounded-xl border border-indigo-500/20 bg-slate-900/90 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">1. Card & Table Wrapper</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">2. Muted Header (thead)</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">3. Numeric / Currency Cell</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  px-6 py-4 text-right font-mono tabular-nums font-medium text-slate-100
                </code>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-indigo-300">4. Soft Status Pill Badge</div>
                <code className="block rounded bg-slate-950 p-2 text-[11px] text-slate-300 font-mono">
                  inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20
                </code>
              </div>
            </div>
          )}

          {/* Navigation Pills */}
          <div className="mt-5 space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Lessons:
              </span>
              {ITEMS.map((item, idx) =>
                item.group !== 'Practice Questions' ? (
                  <button
                    key={item.id}
                    onClick={() => handleSelectStep(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : null
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80">
                Questions:
              </span>
              {ITEMS.map((item, idx) =>
                item.group === 'Practice Questions' ? (
                  <button
                    key={item.id}
                    onClick={() => handleSelectStep(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : null
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Step Info & Mode Switcher Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-slate-900/40 p-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-white">{current.title}</h2>
              <code className="rounded bg-slate-950 px-2 py-0.5 text-xs text-indigo-300 font-mono border border-slate-800">
                {current.file}
              </code>
            </div>
            <p className="text-xs text-slate-400">{current.description}</p>
          </div>

          {/* Workspace vs Target Switcher */}
          {Target && (
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1 text-xs">
              {[
                { id: 'workspace', label: '🛠️ Your Workspace' },
                { id: 'target', label: '✨ Target Design' },
                { id: 'split', label: '⚖️ Split Compare' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCompareMode(m.id)}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    compareMode === m.id
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Render Area */}
        {!Target || compareMode === 'workspace' ? (
          <Component />
        ) : compareMode === 'target' ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
              ✨ Viewing Target Reference Design — Interact with the table below to see how it should look & behave!
            </div>
            <Target />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                🛠️ Your Workspace ({current.file})
              </div>
              <Component />
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                ✨ Target Design Reference
              </div>
              <Target />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
