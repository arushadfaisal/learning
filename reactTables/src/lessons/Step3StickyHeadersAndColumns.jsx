// STEP 3: Sticky Column Headers & Sticky Row Headers (2D Scrolling)
//
// When a table has many rows AND many columns, users lose context when scrolling.
//
// CRITICAL CSS GOTCHA:
//   If a <table> uses `border-collapse`, sticky header borders will detach and disappear!
//   You MUST use `border-separate border-spacing-0` on the <table> and put `border-b` on each cell.
//
// TODO 1 (Scrollable Container):
//   On the wrapper <div>, constrain both height and width with scrolling:
//   "max-h-72 max-w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
//
// TODO 2 (Separate Borders on <table>):
//   On <table>, use: "w-full border-separate border-spacing-0 text-left text-sm"
//
// TODO 3 (Sticky Top <thead>):
//   On <thead>, make it stick to the top above row headers:
//   "sticky top-0 z-20 bg-slate-50/95 text-xs font-semibold tracking-wider text-slate-500 uppercase backdrop-blur-xs dark:bg-slate-800/95 dark:text-slate-400"
//
// TODO 4 (Sticky Left Row Header <th scope="row">):
//   - Give each <tr> an explicit opaque background ("bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80")
//   - On the first cell (<th scope="row">), add:
//     "sticky start-0 z-10 bg-inherit border-e border-b border-slate-200 px-4 py-3 font-medium whitespace-nowrap text-slate-900 dark:border-slate-800 dark:text-slate-100"
//   - Notice how `bg-inherit` automatically matches both the normal row background AND the hover state!

const SERVICES = [
  { name: 'api-gateway-prod', region: 'us-east-1', rps: '14,290', p95: '18ms', p99: '42ms', errorRate: '0.01%', uptime: '99.99%' },
  { name: 'auth-token-service', region: 'us-east-1', rps: '8,110', p95: '11ms', p99: '24ms', errorRate: '0.00%', uptime: '100.00%' },
  { name: 'billing-webhook-worker', region: 'eu-west-1', rps: '1,420', p95: '85ms', p99: '210ms', errorRate: '0.14%', uptime: '99.92%' },
  { name: 'realtime-socket-hub', region: 'ap-south-1', rps: '31,500', p95: '9ms', p99: '19ms', errorRate: '0.02%', uptime: '99.98%' },
  { name: 'search-indexer-v2', region: 'us-west-2', rps: '3,890', p95: '64ms', p99: '140ms', errorRate: '0.05%', uptime: '99.95%' },
  { name: 'media-transcoder', region: 'eu-central-1', rps: '640', p95: '310ms', p99: '890ms', errorRate: '0.28%', uptime: '99.85%' },
  { name: 'notification-dispatcher', region: 'us-east-1', rps: '9,450', p95: '22ms', p99: '51ms', errorRate: '0.01%', uptime: '99.99%' },
  { name: 'analytics-ingest-stream', region: 'us-west-2', rps: '54,120', p95: '7ms', p99: '15ms', errorRate: '0.00%', uptime: '99.99%' },
]

export default function Step3StickyHeadersAndColumns() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Step 3: Sticky Column &amp; Row Headers (2D Scroll)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open <code>src/lessons/Step3StickyHeadersAndColumns.jsx</code> and complete TODOs 1–4. Then scroll both vertically and horizontally!
        </p>
      </div>

      {/* TODO 1: Constrain height (max-h-72) & enable overflow-auto */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800">
        {/* TODO 2: Use border-separate border-spacing-0 */}
        <table className="w-full text-left text-sm">
          {/* TODO 3: Make thead sticky top-0 z-20 */}
          <thead className="bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 whitespace-nowrap dark:border-slate-800">
                Service Name
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 whitespace-nowrap dark:border-slate-800">
                Region
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right whitespace-nowrap dark:border-slate-800">
                Req / sec
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right whitespace-nowrap dark:border-slate-800">
                p95 Latency
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right whitespace-nowrap dark:border-slate-800">
                p99 Latency
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right whitespace-nowrap dark:border-slate-800">
                Error Rate
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 text-right whitespace-nowrap dark:border-slate-800">
                Uptime
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((svc) => (
              <tr
                key={svc.name}
                className="bg-white transition-colors hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80"
              >
                {/* TODO 4: Make this <th scope="row"> sticky start-0 z-10 with bg-inherit */}
                <th
                  scope="row"
                  className="border-b border-slate-100 px-4 py-3 font-mono text-xs font-medium whitespace-nowrap text-slate-900 dark:border-slate-800 dark:text-slate-100"
                >
                  {svc.name}
                </th>
                <td className="border-b border-slate-100 px-4 py-3 whitespace-nowrap text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  {svc.region}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap dark:border-slate-800">
                  {svc.rps}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap dark:border-slate-800">
                  {svc.p95}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap dark:border-slate-800">
                  {svc.p99}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap dark:border-slate-800">
                  {svc.errorRate}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap text-emerald-600 dark:border-slate-800 dark:text-emerald-400">
                  {svc.uptime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
