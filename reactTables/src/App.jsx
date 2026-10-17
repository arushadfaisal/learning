import { useState } from 'react'
import Step1BasicAnatomy from './lessons/Step1BasicAnatomy'
import Step2BadgesAndStackedCells from './lessons/Step2BadgesAndStackedCells'
import Step3StickyHeadersAndColumns from './lessons/Step3StickyHeadersAndColumns'
import Step4SortFilterAndSelect from './lessons/Step4SortFilterAndSelect'
import Step5ContainerQueryResponsive from './lessons/Step5ContainerQueryResponsive'
import Question1InvoiceLedger from './questions/Question1InvoiceLedger'
import Question2TeamDirectory from './questions/Question2TeamDirectory'
import Question3StickyMetricsGrid from './questions/Question3StickyMetricsGrid'
import Question4SelectableOrders from './questions/Question4SelectableOrders'
import Question5SortableInventory from './questions/Question5SortableInventory'
import Question6ResponsiveCardTable from './questions/Question6ResponsiveCardTable'

const steps = [
  { label: '1. Card & Alignment', Component: Step1BasicAnatomy },
  { label: '2. Badges & Stacked Cells', Component: Step2BadgesAndStackedCells },
  { label: '3. Sticky 2D Headers', Component: Step3StickyHeadersAndColumns },
  { label: '4. Sort, Filter & :has()', Component: Step4SortFilterAndSelect },
  { label: '5. @container Cards', Component: Step5ContainerQueryResponsive },
  { label: 'Q1: Invoice Ledger', Component: Question1InvoiceLedger },
  { label: 'Q2: Team Directory', Component: Question2TeamDirectory },
  { label: 'Q3: Sticky Metrics Grid', Component: Question3StickyMetricsGrid },
  { label: 'Q4: Bulk Select Orders', Component: Question4SelectableOrders },
  { label: 'Q5: Sortable Inventory', Component: Question5SortableInventory },
  { label: 'Q6: @container Table', Component: Question6ResponsiveCardTable },
]

export default function App() {
  const [active, setActive] = useState(0)
  const { Component } = steps[active]

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-8 text-left">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Tables &amp; Formatting in React + Tailwind
      </h1>
      <nav className="mb-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              i === active
                ? 'border-indigo-600 bg-indigo-600 font-semibold text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <Component />
    </div>
  )
}
