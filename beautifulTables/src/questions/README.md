# Beautiful Tables in React & Tailwind CSS — Practice Guide

Welcome to your **Beautiful Tables Mastery Lab**!

## Why This Lab Works Better for Learning UI
Unlike pure data-fetching logic, **table design is visual**. In this app, every single Lesson and Question includes a live **View Mode Switcher** in the top-right corner:
- **🛠️ Your Workspace**: Renders the file you are currently editing in `src/lessons/` or `src/questions/`.
- **✨ Target Design**: Shows the finished, Linear/Stripe-grade reference table so you can inspect the exact spacing, alignment, hover states, and interactions.
- **⚖️ Split Compare**: Stacks **Your Workspace** right above the **Target Design** so you can compare your work pixel-for-pixel without spoiling the code!
- **🎨 Tailwind Table Cheat Sheet**: A collapsible reference drawer at the top of the app with the core Tailwind formulas.

---

## The 8 Golden Rules of Beautiful Tables
Start on Tab **0. Visual Guide (8 Rules)** in the browser and toggle each switch to see why raw HTML tables look dated and how pros fix them:
1. **Card Frame & Overflow Clip**: `overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg`
2. **Kill Vertical Grid Boxes**: Never put `border` on every `<td>`. Use horizontal hairline dividers: `divide-y divide-slate-800` on `<table>` and `divide-y divide-slate-800/70` on `<tbody>`.
3. **Muted Uppercase Header (`<thead>`)**: Headers are labels, not data. Style with `bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400`.
4. **Generous Breathing Room**: Use `px-6 py-3.5` on `<th>` and `px-6 py-4 whitespace-nowrap` on `<td>`.
5. **Multi-Line Composite Cells**: Combine Avatar + Name (`font-medium text-slate-100`) + Email (`text-xs text-slate-400`) in one cell instead of wasting 3 columns.
6. **Translucent Ring-Inset Status Pills**: Use `bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20` with a `h-1.5 w-1.5 rounded-full` dot.
7. **Right-Aligned Tabular Numbers**: Always align currency, quantities, and percentages right (`text-right font-mono tabular-nums`) so digits line up vertically.
8. **Row Hover & Ghost Action Reveal**: Put `group hover:bg-slate-800/50` on `<tr>` and `opacity-0 group-hover:opacity-100` on row action buttons so they only appear when hovered.

---

## Part 1: Guided Refactoring Lessons (`src/lessons/`)
- **Lesson 1 (`Step1Foundation.jsx`)**: Refactor a 1995 bordered HTML table into a clean card-framed table with subtle dividers.
- **Lesson 2 (`Step2CellsAndBadges.jsx`)**: Upgrade flat text cells into Avatar composite cells, soft status pills, and right-aligned tabular currency.
- **Lesson 3 (`Step3RowStates.jsx`)**: Add multi-row checkbox selection, selected row tinting (`bg-indigo-500/10`), and hover-reveal ghost buttons.
- **Lesson 4 (`Step4SortAndFilter.jsx`)**: Connect an integrated search/filter toolbar and clickable sortable column headers (`↑` / `↓`).
- **Lesson 5 (`Step5SkeletonsAndEmpty.jsx`)**: Replace jarring `"Loading..."` text with column-accurate `animate-pulse` skeleton rows, an empty state, and a pagination footer.

---

## Part 2: Practice Challenges (`src/questions/`)
- **Q1: SaaS Team Directory (`Question1TeamDirectory.jsx`)**: Build a Linear-style member directory table from scratch.
- **Q2: Stripe-Style Invoice Ledger (`Question2InvoiceLedger.jsx`)**: Build a billing table with status filtering, monospace IDs, tabular currency, and a semantic `<tfoot>` summary row that totals the visible invoices.
- **Q3: Selectable Bulk-Action Inventory (`Question3BulkInventory.jsx`)**: Build a warehouse inventory table with "Select All" and a contextual Bulk Action Bar (`+10 Restock Selected` / `Delete Selected`).
- **Q4: Sortable Crypto Market Watchlist (`useCryptoTable.js` & `Question4CryptoWatchlist.jsx`)**: Build a custom table state hook for search, category filtering, and column sorting, paired with emerald/rose 24h delta badges.
- **Q5: Expandable Master-Detail Orders (`Question5ExpandableOrders.jsx`)**: Click any order row to rotate its chevron (`▶`) and expand a nested `<td colSpan={6}>` detail drawer showing the order's line items and shipping address.
- **Q6: Full-Stack Async Server Table (`useServerUsersTable.js` & `Question6AsyncServerTable.jsx`)**: Combine **TanStack Query** with **Beautiful Tables** — live search, pagination, shimmer row skeletons, and empty state recovery!
