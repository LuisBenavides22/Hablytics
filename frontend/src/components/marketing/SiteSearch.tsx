import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { INTEGRATIONS } from '@/lib/integrations'
import { FAQS, PROFILE_CARDS, TIERS } from '@/lib/marketing'
import { cn } from '@/lib/cn'

interface SearchItem {
  group: 'Pages' | 'Your profile' | 'Sources' | 'Plans' | 'Questions'
  title: string
  hint: string
  to: string
}

const PAGES: SearchItem[] = [
  {
    group: 'Pages',
    title: 'Sample profile',
    hint: 'What a read looks like',
    to: '/sample',
  },
  {
    group: 'Pages',
    title: 'How it works',
    hint: 'From connecting to your type',
    to: '/how-it-works',
  },
  {
    group: 'Pages',
    title: 'Sources',
    hint: 'Where Hablytics reads from',
    to: '/sources',
  },
  {
    group: 'Pages',
    title: 'Pricing',
    hint: 'Free, Pro, and Elite',
    to: '/pricing',
  },
  { group: 'Pages', title: 'Sign up', hint: 'See my type', to: '/signup' },
  { group: 'Pages', title: 'Log in', hint: 'Already using it', to: '/login' },
]

const INDEX: SearchItem[] = [
  ...PAGES,
  ...PROFILE_CARDS.map<SearchItem>((card) => ({
    group: 'Your profile',
    title: card.title,
    hint: `${card.plan} · ${card.body}`,
    to: '/sample',
  })),
  ...INTEGRATIONS.map<SearchItem>((i) => ({
    group: 'Sources',
    title: i.name,
    hint: `${i.available ? 'Live' : 'Soon'} · ${i.reads}`,
    to: '/sources',
  })),
  ...TIERS.map<SearchItem>((tier) => ({
    group: 'Plans',
    title: `${tier.name} plan`,
    hint: `${tier.price}${tier.cadence} · ${tier.description}`,
    to: '/pricing',
  })),
  ...FAQS.map<SearchItem>((faq) => ({
    group: 'Questions',
    title: faq.question,
    hint: faq.answer,
    to: '/#faq',
  })),
]

const MAX_RESULTS = 8

function match(query: string): SearchItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return PAGES
  return (
    INDEX.map((item) => {
      const title = item.title.toLowerCase()
      const all = `${title} ${item.hint.toLowerCase()} ${item.group.toLowerCase()}`
      if (!terms.every((t) => all.includes(t))) return null
      // Title hits outrank hits in the description.
      const score = terms.reduce(
        (n, t) => n + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1),
        0,
      )
      return { item, score }
    })
      .filter((r): r is { item: SearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((r) => r.item)
      // Keep each group together, in the order its best match appeared.
      .reduce<SearchItem[][]>((groups, item) => {
        const group = groups.find((g) => g[0].group === item.group)
        if (group) group.push(item)
        else groups.push([item])
        return groups
      }, [])
      .flat()
  )
}

interface SiteSearchProps {
  onClose: () => void
}

/**
 * Search that takes over the nav bar in place: the links give way to an input and
 * results drop from the bar. The parent bar must be `relative`.
 */
export function SiteSearch({ onClose }: SiteSearchProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => match(query), [query])
  const current = Math.min(active, Math.max(results.length - 1, 0))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function go(item: SearchItem) {
    onClose()
    navigate(item.to)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(results.length ? (current + 1) % results.length : 0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(results.length ? (current - 1 + results.length) % results.length : 0)
    } else if (e.key === 'Enter' && results[current]) {
      e.preventDefault()
      go(results[current])
    }
  }

  return (
    <>
      <div role="search" className="flex min-w-0 flex-1 items-center gap-3">
        <Search className="size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          placeholder="Search pages, sources, plans, questions…"
          aria-label="Search the site"
          aria-controls="site-search-results"
          autoComplete="off"
          spellCheck={false}
          className="h-9 min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-faint focus:outline-none"
        />
        <kbd className="hidden rounded border border-line-strong px-1.5 py-0.5 font-mono text-[0.6875rem] text-fg-subtle sm:block">
          Esc
        </kbd>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="grid size-8 shrink-0 place-items-center rounded-full text-fg-muted transition-colors hover:bg-raised hover:text-fg"
        >
          <X className="size-4" strokeWidth={2} />
        </button>
      </div>

      <div
        id="site-search-results"
        className="absolute inset-x-0 top-full mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_80px_-16px_rgb(0_0_0/0.85)]"
      >
        {results.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-fg-subtle">Nothing matches “{query}”.</p>
        ) : (
          <ul>
            {results.map((item, i) => {
              const showGroup = i === 0 || results[i - 1].group !== item.group
              return (
                <li key={`${item.group}-${item.title}`}>
                  {showGroup && (
                    <p className="label-mono px-3 pt-3 pb-2">
                      {query.trim() ? item.group : 'Jump to'}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      i === current ? 'bg-raised' : 'hover:bg-raised',
                    )}
                  >
                    <span className="shrink-0 text-sm text-fg">{item.title}</span>
                    <span className="min-w-0 truncate text-[0.8125rem] text-fg-subtle">
                      {item.hint}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
