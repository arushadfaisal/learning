# React + Tailwind CSS Tables — Practice Challenges

Master the **5 Pillars of Production Table Design** in React and Tailwind CSS v4:

---

## The Rules of Beautiful Table Formatting:
> **1. Never render a bare `<table>`.**
> Always wrap it in a card container (`rounded-xl border border-slate-200 overflow-hidden shadow-xs`) or a scroll/container-query wrapper (`@container overflow-auto`).
>
> **2. Right-align numbers with `tabular-nums`.**
> Currency, quantities, percentages, and latencies must use `text-right font-mono tabular-nums` so digits and decimal points line up vertically down the column.
>
> **3. Use `border-separate border-spacing-0` when using `sticky` headers.**
> `border-collapse` causes borders to detach and vanish when scrolling past sticky `<thead>` or `<th scope="row">` cells.
>
> **4. Stack related metadata instead of adding 10 cramped columns.**
> Combine Avatar + Name + Email in one cell, and use soft translucent badges (`ring-1 ring-inset`) with a status dot.

---

## Round 1 Challenges (Core Formatting & Hierarchy)

### Challenge 1: SaaS Invoice Ledger (`Question1InvoiceLedger.jsx`)
- **Concept**: Card framing, `<thead />` hierarchy, semantic `<th scope="row">`, right-aligned `tabular-nums` currency, and a `<tfoot />` summary row calculating the grand total.

### Challenge 2: Team Directory — Stacked Cells, Badges & Hover Actions (`Question2TeamDirectory.jsx`)
- **Concept**: Condense 7 data fields into 4 clean columns using Flexbox cell stacking, `ring-1 ring-inset` status pills, and a row-level `group` hover state (`opacity-0 group-hover:opacity-100`) to reveal an "Edit" button only when hovering a row.

### Challenge 3: 2D Sticky Cohort Metrics Grid (`Question3StickyMetricsGrid.jsx`)
- **Concept**: Build a scrollable metrics grid with a sticky top `<thead />` (`sticky top-0 z-20`) AND a sticky left `<th scope="row">` (`sticky start-0 z-10 bg-inherit`) using `border-separate border-spacing-0`, plus positive/negative delta badges (`+24.1%` vs `-3.8%`).

---

## Round 2 Challenges (Interactive State & Responsive Containers)

### Challenge 4: Bulk Order Selection & `:has(:checked)` (`Question4SelectableOrders.jsx`)
- **Concept**: Implement "Select All" + per-row checkboxes, highlight selected rows purely with Tailwind's `has-[:checked]:bg-indigo-50/70`, and show a contextual bulk action bar when 1 or more orders are selected.

### Challenge 5: Filterable & Sortable Inventory with Stock Bars (`Question5SortableInventory.jsx`)
- **Concept**: Combine category filter pills, search input, multi-column sorting (`price` and `stock`), visual stock-level progress bars inside cells, and a `<td colSpan={5}>` empty state when no items match.

### Challenge 6: `@container` Query Stacked Mobile Cards (`Question6ResponsiveCardTable.jsx`)
- **Concept**: Transform a data table into stacked cards based on its **container width** (`@container` + `@max-[600px]:...`) rather than the browser viewport, hiding `<thead />` and injecting accessible labels via CSS variables (`--label-*`).
