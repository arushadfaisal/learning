// Mock datasets & helpers for React + Tailwind Table Practice Challenges

export const INVOICES = [
  { id: 'INV-2041', client: 'Linear Orbit Inc.', plan: 'Enterprise Annual', issuedAt: '2026-10-02', status: 'Paid', amount: 18400.0 },
  { id: 'INV-2042', client: 'Raycast Studio', plan: 'Team Monthly', issuedAt: '2026-10-05', status: 'Paid', amount: 420.5 },
  { id: 'INV-2043', client: 'Vercel Cloud', plan: 'Pro Usage', issuedAt: '2026-10-09', status: 'Pending', amount: 3190.75 },
  { id: 'INV-2044', client: 'Supabase Labs', plan: 'Dedicated DB', issuedAt: '2026-10-12', status: 'Overdue', amount: 950.0 },
  { id: 'INV-2045', client: 'Retool Systems', plan: 'Enterprise Annual', issuedAt: '2026-10-15', status: 'Paid', amount: 104250.25 },
]

export const EMPLOYEES = [
  { id: 'EMP-101', initials: 'AR', name: 'Alex Rivera', email: 'alex.rivera@acme.dev', role: 'Principal Engineer', department: 'Platform Architecture', status: 'Active', location: 'San Francisco, US' },
  { id: 'EMP-102', initials: 'PP', name: 'Priya Patel', email: 'priya.patel@acme.dev', role: 'Staff Product Designer', department: 'Design Systems', status: 'On Leave', location: 'London, UK' },
  { id: 'EMP-103', initials: 'MV', name: 'Marcus Vance', email: 'marcus.vance@acme.dev', role: 'VP of Engineering', department: 'Core Infrastructure', status: 'Active', location: 'New York, US' },
  { id: 'EMP-104', initials: 'ER', name: 'Elena Rostova', email: 'elena.rostova@acme.dev', role: 'ML Research Scientist', department: 'Applied AI', status: 'Offline', location: 'Berlin, DE' },
  { id: 'EMP-105', initials: 'DK', name: 'Devon Kim', email: 'devon.kim@acme.dev', role: 'Senior Security Engineer', department: 'Cloud Security', status: 'Active', location: 'Seoul, KR' },
]

export const SAAS_COHORTS = [
  { cohort: 'Jan 2026', signups: 4210, m1: '94.2%', m2: '89.1%', m3: '85.4%', netRetention: '118.4%', expansionDelta: 18.4, arr: 412000 },
  { cohort: 'Feb 2026', signups: 3890, m1: '91.8%', m2: '86.0%', m3: '81.2%', netRetention: '96.2%', expansionDelta: -3.8, arr: 345000 },
  { cohort: 'Mar 2026', signups: 5120, m1: '95.5%', m2: '92.0%', m3: '89.7%', netRetention: '124.1%', expansionDelta: 24.1, arr: 589000 },
  { cohort: 'Apr 2026', signups: 4780, m1: '93.1%', m2: '88.4%', m3: '84.0%', netRetention: '109.5%', expansionDelta: 9.5, arr: 461000 },
  { cohort: 'May 2026', signups: 6040, m1: '96.0%', m2: '93.1%', m3: '90.8%', netRetention: '131.0%', expansionDelta: 31.0, arr: 710000 },
  { cohort: 'Jun 2026', signups: 5510, m1: '90.4%', m2: '84.2%', m3: '78.9%', netRetention: '92.8%', expansionDelta: -7.2, arr: 398000 },
  { cohort: 'Jul 2026', signups: 6890, m1: '95.8%', m2: '92.4%', m3: '90.1%', netRetention: '127.6%', expansionDelta: 27.6, arr: 794000 },
  { cohort: 'Aug 2026', signups: 7320, m1: '96.4%', m2: '94.0%', m3: '91.5%', netRetention: '134.2%', expansionDelta: 34.2, arr: 882000 },
]

export const ORDERS = [
  { id: 'ORD-901', customer: 'Hannah Abbott', items: 3, channel: 'Online Store', status: 'Ready to Ship', total: 289.0 },
  { id: 'ORD-902', customer: 'Liam Chen', items: 1, channel: 'Mobile App', status: 'Processing', total: 74.5 },
  { id: 'ORD-903', customer: 'Sophia Martinez', items: 6, channel: 'B2B Wholesale', status: 'Ready to Ship', total: 1420.0 },
  { id: 'ORD-904', customer: 'Noah Takahashi', items: 2, channel: 'Online Store', status: 'Flagged', total: 512.8 },
  { id: 'ORD-905', customer: 'Amara Okafor', items: 4, channel: 'Mobile App', status: 'Ready to Ship', total: 365.25 },
]

export const INVENTORY = [
  { sku: 'HW-490', name: 'Pro Studio Display 27"', category: 'Hardware', stock: 42, maxStock: 50, price: 1599 },
  { sku: 'AU-210', name: 'Studio Condenser Mic', category: 'Audio', stock: 6, maxStock: 40, price: 249 },
  { sku: 'AC-108', name: 'Thunderbolt 5 Braided Cable', category: 'Accessories', stock: 85, maxStock: 100, price: 69 },
  { sku: 'HW-512', name: 'Mechanical Split Keyboard', category: 'Hardware', stock: 4, maxStock: 30, price: 329 },
  { sku: 'AU-305', name: 'Open-Back Reference Headphones', category: 'Audio', stock: 19, maxStock: 40, price: 499 },
  { sku: 'AC-204', name: 'Anodized Aluminum Laptop Stand', category: 'Accessories', stock: 0, maxStock: 50, price: 119 },
]

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
