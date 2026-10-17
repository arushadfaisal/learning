import { useState } from 'react'

// STEP 5: Container-Query Responsive Stacked Table (@container)
//
// Why @container instead of @media (md:...)?
// Because a table might live inside a narrow 420px sidebar or split-pane on a desktop screen!
//
// TODO 1 (Enable Container Queries):
//   Add `@container` to the `.table-wrapper` div so children can respond to its width.
//
// TODO 2 (Hide <thead> on Narrow Containers):
//   Add `@max-[600px]:hidden` to `<thead>` so column headers disappear when stacked.
//
// TODO 3 (Transform Rows & Cells into Stacked Cards below 600px):
//   - On `<table>` and `<tbody>`: add `@max-[600px]:block`
//   - On each `<tr>`: add `@max-[600px]:mb-4 @max-[600px]:block @max-[600px]:rounded-lg @max-[600px]:border @max-[600px]:border-slate-200 dark:@max-[600px]:border-slate-800`
//   - On each `<td>`: add `responsive-td @max-[600px]:flex @max-[600px]:items-center @max-[600px]:justify-between`
//   (Check `src/index.css` to see how `.responsive-td::before` injects `--label-2`, `--label-3`, `--label-4`!)

const DEPLOYMENTS = [
  { id: 'dep-91', branch: 'main @ 8f3a1c2', env: 'Production', duration: '48s', author: 'Alex Rivera' },
  { id: 'dep-90', branch: 'feat/table-polish', env: 'Preview', duration: '31s', author: 'Priya Patel' },
  { id: 'dep-89', branch: 'fix/sticky-border', env: 'Staging', duration: '52s', author: 'Marcus Vance' },
]

export default function Step5ContainerQueryResponsive() {
  const [containerWidth, setContainerWidth] = useState(100) // percentage

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Step 5: <code>@container</code> Responsive Stacked Cards
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open <code>src/lessons/Step5ContainerQueryResponsive.jsx</code>, complete TODOs 1–3, then drag the width slider below!
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/50">
        <label htmlFor="width-slider" className="font-medium text-slate-700 dark:text-slate-300">
          Simulate Container Width: <span className="font-mono">{containerWidth}%</span>
        </label>
        <input
          id="width-slider"
          type="range"
          min="45"
          max="100"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="accent-indigo-600 cursor-pointer"
        />
        <span className="text-slate-500">
          {containerWidth < 65 ? '📱 Narrow Container (<600px)' : '🖥️ Wide Container (≥600px)'}
        </span>
      </div>

      {/* TODO 1: Add @container to this wrapper div */}
      <div
        style={{ width: `${containerWidth}%` }}
        className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900"
      >
        {/* TODO 3: Add @max-[600px]:block on table & tbody */}
        <table
          style={{
            '--label-2': '"Environment"',
            '--label-3': '"Duration"',
            '--label-4': '"Author"',
          }}
          className="w-full border-separate border-spacing-0 text-left text-sm"
        >
          {/* TODO 2: Add @max-[600px]:hidden to thead */}
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">Branch</th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">Environment</th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right dark:border-slate-800">Duration</th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">Author</th>
            </tr>
          </thead>
          <tbody className="@max-[600px]:p-3">
            {DEPLOYMENTS.map((dep) => (
              // TODO 3: Add @max-[600px]:block and card border classes on <tr>
              <tr
                key={dep.id}
                className="bg-white transition-colors hover:bg-slate-50/80 dark:bg-slate-900 dark:hover:bg-slate-800/50"
              >
                <th
                  scope="row"
                  className="border-b border-slate-100 px-4 py-3 font-mono text-xs font-semibold text-indigo-600 @max-[600px]:block @max-[600px]:bg-slate-50 dark:border-slate-800 dark:text-indigo-400 dark:@max-[600px]:bg-slate-800/70"
                >
                  {dep.branch}
                </th>
                {/* TODO 3: Add responsive-td @max-[600px]:flex @max-[600px]:items-center @max-[600px]:justify-between to each <td> */}
                <td className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  {dep.env}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums dark:border-slate-800">
                  {dep.duration}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                  {dep.author}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
