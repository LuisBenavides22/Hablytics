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
    title: 'See your type, then the fix',
    body: 'Your worker type, the habits behind it, and a 30 day plan specific enough to start on Monday.',
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
    name: 'Free',
    price: '$0',
    cadence: '',
    description: 'One source, one read. Find out your type before you pay for anything.',
    features: ['Connect one source', 'Your worker type', 'One strength and one gap, in full'],
    cta: 'See my type',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    cadence: '/mo',
    description: 'The whole profile. Every habit, every blind spot, and what to do about them.',
    features: [
      'Your full profile, nothing locked',
      'Every source connected',
      'A fresh read every week',
      '30 day improvement plans',
    ],
    cta: 'Unlock my full profile',
    featured: true,
  },
  {
    name: 'Elite',
    price: '$15',
    cadence: '/mo',
    description: 'Everything in Pro, plus where you rank against people chasing your roles.',
    features: [
      'Everything in Pro',
      'Peer benchmarking',
      'Rank against same role applicants',
      'Promotion pattern analysis',
    ],
    cta: 'Get benchmarks',
    featured: false,
  },
]

/* Illustrative content for the marketing site. Always shown labeled as a sample. */

export interface SampleTrait {
  tone: 'positive' | 'attention'
  label: string
  title: string
  body: string
}

export interface SampleSignal {
  label: string
  value: number
  locked: boolean
}

export const SAMPLE_PROFILE = {
  field: 'Software engineering',
  archetype: 'The Finisher',
  tagline:
    'You close what other people leave open, and you steer around anything without a clear edge.',
  traits: [
    {
      tone: 'positive',
      label: 'Carrying you',
      title: 'Review turnaround',
      body: 'You answer review requests faster than you open your own.',
    },
    {
      tone: 'attention',
      label: 'Gives you away',
      title: 'Ambiguity avoidance',
      body: 'You pick up tickets that come with a spec and leave the ones that do not.',
    },
  ] satisfies SampleTrait[],
  signals: [
    { label: 'Execution', value: 86, locked: false },
    { label: 'Communication', value: 61, locked: false },
    { label: 'Strategy', value: 38, locked: true },
    { label: 'Collaboration', value: 72, locked: true },
  ] satisfies SampleSignal[],
  locked: [
    {
      title: 'Your blind spot',
      body: 'You treat a merged pull request as the end of the work, so nobody hears what it changed.',
    },
    {
      title: 'How you read one level up',
      body: 'Dependable on defined work, untested on anything you had to define yourself.',
    },
    {
      title: 'The habit to break first',
      body: 'Waiting for a spec. Write the first draft of one yourself this week.',
    },
  ],
}

export interface SampleSection {
  label: string
  title: string
  visible: string
  locked: string[]
}

export const SAMPLE_SECTIONS: SampleSection[] = [
  {
    label: 'Hidden wins',
    title: 'Things you did and forgot to claim',
    visible:
      'You untangled a flaky test suite that three people had given up on. Nobody wrote it down, including you.',
    locked: [
      'Your review comments on the billing rewrite caught the bug that would have shipped.',
      'You onboarded two new teammates through pairing without being asked to.',
    ],
  },
  {
    label: 'Growth gaps',
    title: 'What is actually holding you back',
    visible: 'Your pull requests explain what changed and almost never why.',
    locked: [
      'You have not started a design discussion in the last six months of threads.',
      'Estimates you give in writing run short by about a third.',
    ],
  },
  {
    label: 'How you communicate',
    title: 'How you read to other people',
    visible:
      'You answer the question that was asked and stop. People one level up answer the next one too.',
    locked: [
      'Your longest messages go to the people who need them least.',
      'You follow up on your own requests about half as often as you are followed up on.',
    ],
  },
  {
    label: 'Who to know',
    title: 'People worth knowing better',
    visible:
      'Two reviewers approve most of your work. You have only ever talked to one of them about code.',
    locked: [
      'The person who assigns your team its roadmap has never seen your name on a proposal.',
      'One teammate keeps citing your work in threads you are not in.',
    ],
  },
]

/* Home page content. */

export const HOME_STEPS: MarketingStep[] = [
  ...STEPS,
  {
    step: '04',
    title: 'Open the rest on Pro',
    body: 'The blind spot, how you read one level up, and the 30 day plan. Stay a month or stay longer.',
  },
]

export const HERO_PROOF = [
  'Read from real work, not a questionnaire',
  'Read only access you can revoke at any time',
  'Your type first, the evidence right behind it',
]

export const PAINS = [
  {
    title: 'Feedback stays vague',
    body: 'Reviews say "keep it up" and "be more strategic". Neither tells you what to change.',
  },
  {
    title: 'Your wins go unclaimed',
    body: 'You did the work, moved on, and forgot it by the time anyone asked.',
  },
  {
    title: 'You are guessing at the gap',
    body: 'You can feel something is holding you back. You cannot name it.',
  },
]

export interface ProfileCard {
  title: string
  body: string
  plan: 'Free' | 'Pro' | 'Elite'
}

export const PROFILE_CARDS: ProfileCard[] = [
  {
    title: 'Your type',
    body: 'A one line read on how you work, named and explained. Built from what you did, not what you said.',
    plan: 'Free',
  },
  {
    title: 'What is carrying you',
    body: 'The strength doing most of the work for you, with the evidence behind it.',
    plan: 'Free',
  },
  {
    title: 'What gives you away',
    body: 'The habit other people have already noticed. You see the first one in full.',
    plan: 'Free',
  },
  {
    title: 'Hidden wins',
    body: 'The work you did and already forgot, written in language you can put straight into a review.',
    plan: 'Pro',
  },
  {
    title: 'How you communicate',
    body: 'Tone, structure, and follow-through, measured against how people one level up actually write.',
    plan: 'Pro',
  },
  {
    title: 'Who to know',
    body: 'The people already in your orbit worth building a real relationship with.',
    plan: 'Pro',
  },
  {
    title: 'Your 30 day plan',
    body: 'Every gap turned into something specific enough to start on Monday.',
    plan: 'Pro',
  },
  {
    title: 'Where you rank',
    body: 'How your profile compares with people chasing the same roles.',
    plan: 'Elite',
  },
]

export const FREE_READ_POINTS = [
  'Your worker type, named and explained',
  'The strength that is carrying you',
  'The habit that gives you away',
]

export interface Faq {
  question: string
  answer: string
}

export const FAQS: Faq[] = [
  {
    question: 'Is this a personality quiz?',
    answer:
      'No. There are no questions to answer. Hablytics reads the work you connect and reports what it sees, so the result is built from what you did rather than how you describe yourself.',
  },
  {
    question: 'What do I get for free?',
    answer:
      'One source and one read. You see your worker type, one strength in full, and one gap in full.',
  },
  {
    question: 'What does Pro add?',
    answer:
      'The full profile with nothing locked, every source connected, a fresh read every week, and 30 day improvement plans. Pro is $12 a month.',
  },
  {
    question: 'Can I go Pro for one month and cancel?',
    answer: 'Yes. Every plan can be cancelled at any time.',
  },
  {
    question: 'What can Hablytics do with my accounts?',
    answer:
      'Read, and nothing else. It never writes to a connected source and only reads what you approve during setup. Revoke a connection from settings and the data stops flowing immediately.',
  },
  {
    question: 'Which sources work today?',
    answer:
      'GitHub is live. Slack, Notion, Microsoft 365, Google Drive, Canvas, Gmail, and Zoom are on the way.',
  },
]
