// Rich, realistic time-centric datasets for all Guided Lessons & Practice Questions

export const GLOBAL_TEAM_HUBS = [
  {
    id: 'hub-nyc',
    city: 'New York',
    country: 'United States',
    timeZone: 'America/New_York',
    lead: 'Elena Rostova',
    role: 'Staff Frontend Architect',
    avatar: 'ER',
    avatarColor: 'bg-indigo-500/20 text-indigo-300 ring-indigo-500/30',
    workStartHour: 9,
    workEndHour: 18,
  },
  {
    id: 'hub-lon',
    city: 'London',
    country: 'United Kingdom',
    timeZone: 'Europe/London',
    lead: 'Marcus Vance',
    role: 'Design Systems Lead',
    avatar: 'MV',
    avatarColor: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
    workStartHour: 9,
    workEndHour: 18,
  },
  {
    id: 'hub-khi',
    city: 'Karachi / Maldives',
    country: 'UTC+5 Region',
    timeZone: 'Asia/Karachi',
    lead: 'Zayd Al-Mansoor',
    role: 'Principal Systems Engineer',
    avatar: 'ZA',
    avatarColor: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
    workStartHour: 9,
    workEndHour: 18,
  },
  {
    id: 'hub-tyo',
    city: 'Tokyo',
    country: 'Japan',
    timeZone: 'Asia/Tokyo',
    lead: 'Sora Takahashi',
    role: 'Platform Engineering Manager',
    avatar: 'ST',
    avatarColor: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
    workStartHour: 9,
    workEndHour: 18,
  },
  {
    id: 'hub-syd',
    city: 'Sydney',
    country: 'Australia',
    timeZone: 'Australia/Sydney',
    lead: 'Liam Thorne',
    role: 'Site Reliability Lead',
    avatar: 'LT',
    avatarColor: 'bg-rose-500/20 text-rose-300 ring-rose-500/30',
    workStartHour: 9,
    workEndHour: 18,
  },
]

export const KNOWLEDGE_BASE_ARTICLES = [
  {
    id: 'kb-1',
    title: 'Preventing Stale Closures in setInterval',
    category: 'React Hooks',
    readTimeSec: 180,
    summary: 'Why functional state updates setCount(c => c + 1) or useRef callbacks keep long-running intervals accurate.',
  },
  {
    id: 'kb-2',
    title: 'Drift-Free Timers with Date.now() & performance.now()',
    category: 'Browser Timing',
    readTimeSec: 240,
    summary: 'Background tabs throttle setInterval to 1000ms+. Always subtract an anchor timestamp instead of counting ticks.',
  },
  {
    id: 'kb-3',
    title: 'Mastering Intl.RelativeTimeFormat & Intl.DurationFormat',
    category: 'Internationalization',
    readTimeSec: 210,
    summary: 'Zero-dependency localized "5 minutes ago" and "2 hr, 15 min" strings built right into modern JavaScript.',
  },
  {
    id: 'kb-4',
    title: 'Why Mutating a Date Object Breaks React Re-renders',
    category: 'State Immutability',
    readTimeSec: 150,
    summary: 'Calling date.setDate(date.getDate() + 1) mutates in-place; Object.is sees the same reference and skips rendering.',
  },
  {
    id: 'kb-5',
    title: 'Safe Time Zone Conversions with IANA & Temporal',
    category: 'Time Zones',
    readTimeSec: 300,
    summary: 'Use IANA names like America/New_York and Temporal.ZonedDateTime so Daylight Saving Time transitions never break.',
  },
  {
    id: 'kb-6',
    title: 'Debouncing Search Inputs vs Throttling Scroll Events',
    category: 'Performance',
    readTimeSec: 195,
    summary: 'Use clearTimeout in a useEffect cleanup to wait until typing pauses before firing expensive network queries.',
  },
]

// Helper that generates activity feed items anchored to when the component mounts
export function createInitialActivityFeed(anchorMs = Date.now()) {
  return [
    {
      id: 'act-1',
      actor: 'Elena Rostova',
      avatar: 'ER',
      avatarColor: 'bg-indigo-500/20 text-indigo-300 ring-indigo-500/30',
      action: 'Deployed edge-router v4.12.0 to production',
      environment: 'production',
      createdAtMs: anchorMs - 14 * 1000, // 14 seconds ago
    },
    {
      id: 'act-2',
      actor: 'Marcus Vance',
      avatar: 'MV',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
      action: 'Merged PR #842: Drift-free stopwatch hook',
      environment: 'staging',
      createdAtMs: anchorMs - 4 * 60 * 1000, // 4 minutes ago
    },
    {
      id: 'act-3',
      actor: 'Sora Takahashi',
      avatar: 'ST',
      avatarColor: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
      action: 'Rotated database read-replica TLS certificates',
      environment: 'production',
      createdAtMs: anchorMs - 48 * 60 * 1000, // 48 minutes ago
    },
    {
      id: 'act-4',
      actor: 'Amara Okafor',
      avatar: 'AO',
      avatarColor: 'bg-rose-500/20 text-rose-300 ring-rose-500/30',
      action: 'Resolved P1 latency spike in eu-central-1',
      environment: 'production',
      createdAtMs: anchorMs - 5 * 3600 * 1000, // 5 hours ago
    },
    {
      id: 'act-5',
      actor: 'Liam Thorne',
      avatar: 'LT',
      avatarColor: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
      action: 'Published Q4 infrastructure benchmark report',
      environment: 'internal',
      createdAtMs: anchorMs - 3 * 86400 * 1000, // 3 days ago
    },
  ]
}

export const POMODORO_PHASES = {
  focus: {
    id: 'focus',
    label: 'Deep Focus',
    durationSeconds: 25 * 60,
    badgeClass: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30',
    ringStroke: '#6366f1',
  },
  shortBreak: {
    id: 'shortBreak',
    label: 'Short Break',
    durationSeconds: 5 * 60,
    badgeClass: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    ringStroke: '#10b981',
  },
  longBreak: {
    id: 'longBreak',
    label: 'Long Recharge',
    durationSeconds: 15 * 60,
    badgeClass: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    ringStroke: '#f59e0b',
  },
}

// Generates analytics deployment events relative to a reference timestamp
export function createDeploymentEvents(referenceMs = Date.now()) {
  const HOUR = 3600 * 1000
  const DAY = 24 * HOUR

  return [
    {
      id: 'dep-901',
      service: 'auth-gateway',
      branch: 'main',
      author: 'Elena Rostova',
      status: 'Success',
      durationSeconds: 94,
      timestampMs: referenceMs - 3 * HOUR, // 3 hours ago (Within 24h)
    },
    {
      id: 'dep-902',
      service: 'billing-worker',
      branch: 'feat/stripe-webhooks',
      author: 'Marcus Vance',
      status: 'Success',
      durationSeconds: 145,
      timestampMs: referenceMs - 16 * HOUR, // 16 hours ago (Within 24h)
    },
    {
      id: 'dep-903',
      service: 'search-indexer',
      branch: 'perf/vector-cache',
      author: 'Sora Takahashi',
      status: 'Failed',
      durationSeconds: 312,
      timestampMs: referenceMs - 3 * DAY, // 3 days ago (Within 7d)
    },
    {
      id: 'dep-904',
      service: 'realtime-sync',
      branch: 'main',
      author: 'Liam Thorne',
      status: 'Success',
      durationSeconds: 118,
      timestampMs: referenceMs - 5 * DAY, // 5 days ago (Within 7d)
    },
    {
      id: 'dep-905',
      service: 'analytics-pipeline',
      branch: 'chore/temporal-migration',
      author: 'Amara Okafor',
      status: 'Success',
      durationSeconds: 205,
      timestampMs: referenceMs - 14 * DAY, // 14 days ago (Within 30d)
    },
    {
      id: 'dep-906',
      service: 'edge-cdn-router',
      branch: 'main',
      author: 'Elena Rostova',
      status: 'Success',
      durationSeconds: 76,
      timestampMs: referenceMs - 24 * DAY, // 24 days ago (Within 30d)
    },
    {
      id: 'dep-907',
      service: 'legacy-monolith',
      branch: 'release/2026-q3',
      author: 'Marcus Vance',
      status: 'Failed',
      durationSeconds: 420,
      timestampMs: referenceMs - 40 * DAY, // 40 days ago (Older than 30d)
    },
  ]
}

export const INITIAL_BOOKED_MEETINGS = [
  {
    id: 'mtg-1',
    title: 'Architecture Design Review',
    organizer: 'Elena Rostova',
    startMinutes: 9 * 60 + 30, // 09:30 (570)
    endMinutes: 10 * 60 + 30, // 10:30 (630)
  },
  {
    id: 'mtg-2',
    title: 'Design Token Sync',
    organizer: 'Marcus Vance',
    startMinutes: 11 * 60, // 11:00 (660)
    endMinutes: 12 * 60, // 12:00 (720)
  },
  {
    id: 'mtg-3',
    title: 'Incident Post-Mortem',
    organizer: 'Amara Okafor',
    startMinutes: 14 * 60, // 14:00 (840)
    endMinutes: 15 * 60 + 30, // 15:30 (930)
  },
]
