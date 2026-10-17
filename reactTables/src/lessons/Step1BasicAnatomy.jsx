// STEP 1: Table Anatomy, Card Wrapper, Typography & Tabular Numbers
//
// An unstyled HTML <table> looks cramped because cells have no padding,
// headers look identical to data cells, and numbers don't line up vertically.
//
// TODO 1 (Card Wrapper):
//   Style the outer wrapper <div> so it frames the table cleanly:
//   - "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
//
// TODO 2 (Table & Header Hierarchy):
//   - On <table>: add "w-full text-left text-sm"
//   - On <thead>: add "border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
//   - On each <th> in <thead>: add `scope="col"` and "px-4 py-3" (plus "text-right" on the Amount header!)
//
// TODO 3 (Body Dividers, Row Hover & Semantic Row Header):
//   - On <tbody>: add "divide-y divide-slate-200 dark:divide-slate-800"
//   - On each <tr>: add "transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
//   - Change the first cell (Invoice ID) to `<th scope="row">` with "px-4 py-3.5 font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
//
// TODO 4 (Right-Aligned Tabular Numbers):
//   - On the Amount <td>, add:
//     "px-4 py-3.5 text-right font-mono font-medium tabular-nums text-slate-900 dark:text-slate-100"
//   - Notice how `tabular-nums` forces every digit to have the exact same width so decimals align!

const PAYMENTS = [
  { id: 'INV-1042', customer: 'Linear Orbit Inc.', plan: 'Enterprise Annual', date: 'Oct 12, 2026', amount: '$14,800.00' },
  { id: 'INV-1043', customer: 'Raycast Studio', plan: 'Pro Monthly', date: 'Oct 14, 2026', amount: '$49.50' },
  { id: 'INV-1044', customer: 'Vercel Labs', plan: 'Team Annual', date: 'Oct 15, 2026', amount: '$2,400.00' },
  { id: 'INV-1045', customer: 'Supabase Cloud', plan: 'Usage Tier 3', date: 'Oct 16, 2026', amount: '$811.25' },
  { id: 'INV-1046', customer: 'Figma Design Co.', plan: 'Enterprise Annual', date: 'Oct 17, 2026', amount: '$119,005.00' },
]

export default function Step1BasicAnatomy() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Step 1: Card Framing, Typography &amp; Tabular Numbers
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open <code>src/lessons/Step1BasicAnatomy.jsx</code> and complete TODOs 1–4 to transform this raw table.
        </p>
      </div>

      {/* TODO 1: Add card wrapper classes here */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* TODO 2: Add table & thead classes */}
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3">Invoice</th>
              <th scope="col" className="px-4 py-3">Customer</th>
              <th scope="col" className="px-4 py-3">Plan</th>
              <th scope="col" className="px-4 py-3">Date</th>
              <th scope="col" className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>

          {/* TODO 3 & 4: Add tbody divide-y, row hover, <th scope="row">, and right-aligned tabular-nums */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {PAYMENTS.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <th scope="row" className="px-4 py-3.5 font-mono text-xs font-medium text-slate-500 dark:text-slate-400">{item.id}</th>
                <td className="px-4 py-3.5">{item.customer}</td>
                <td className="px-4 py-3.5">{item.plan}</td>
                <td className="px-4 py-3.5">{item.date}</td>
                <td className="px-4 py-3.5 text-right font-mono font-medium tabular-nums text-slate-900 dark:text-slate-100">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
