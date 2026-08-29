export interface MarketingStep {
  step: string
  title: string
  body: string
}

export const STEPS: MarketingStep[] = [
  {
    step: '01',
    title: 'Connect your real work',
    body: 'GitHub, Slack, Notion, Drive, Canvas, your inbox. Read only, revocable, scoped to what you approve.',
  },
  {
    step: '02',
    title: 'We read what you shipped',
    body: 'Not your resume. The commits, the docs, the threads, the essays. The evidence of how you actually operate.',
  },
  {
    step: '03',
    title: 'Get the gap and the fix',
    body: 'A weekly report on what is holding you back, plus a 30 day plan specific enough to start on Monday.',
  },
]

export interface MarketingPillar {
  label: string
  body: string
}

export const PILLARS: MarketingPillar[] = [
  {
    label: 'Hidden wins',
    body: 'The work you did and already forgot. Pulled out and written in language you can put straight into a review.',
  },
  {
    label: 'Growth gaps',
    body: 'Where your output falls short of the role you want, split across technical, strategic, and soft skills.',
  },
  {
    label: 'How you communicate',
    body: 'Tone, structure, and follow-through, measured against how people one level up actually write.',
  },
  {
    label: 'Who to know',
    body: 'The people already in your orbit worth building a real relationship with.',
  },
]

export interface MarketingTier {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  cta: string
  featured: boolean
}

export const TIERS: MarketingTier[] = [
  {
    name: 'Snapshot',
    price: 'Free',
    cadence: '',
    description: 'One source, one read. See what it finds before you commit.',
    features: ['Connect one source', 'One time skill snapshot', 'Top gaps surfaced'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Tracking',
    price: '$12',
    cadence: '/mo',
    description: 'The full loop. Weekly reads, role matching, and a plan that updates as you do.',
    features: [
      'Every source connected',
      'Weekly tracking reports',
      'Role and posting matching',
      '30 day improvement plans',
    ],
    cta: 'Start tracking',
    featured: true,
  },
  {
    name: 'Benchmark',
    price: '$15',
    cadence: '/mo',
    description: 'Everything in Tracking, plus where you rank against people chasing your roles.',
    features: [
      'Everything in Tracking',
      'Peer benchmarking',
      'Rank against same role applicants',
      'Promotion pattern analysis',
    ],
    cta: 'Get benchmarks',
    featured: false,
  },
]
