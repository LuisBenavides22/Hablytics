import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { CtaButton } from '@/components/marketing/CtaButton'
import { SiteSearch } from '@/components/marketing/SiteSearch'
import { cn } from '@/lib/cn'

const LINKS = [
  { to: '/sample', label: 'Sample profile' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/sources', label: 'Sources' },
  { to: '/pricing', label: 'Pricing' },
]

export function MarketingLayout() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)

  // No reserved scrollbar strip on marketing pages, so sections reach the right edge.
  useEffect(() => {
    document.documentElement.classList.add('no-page-scrollbar')
    return () => document.documentElement.classList.remove('no-page-scrollbar')
  }, [])

  // "/" opens search from anywhere on the page, unless the visitor is already typing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null
      const typing = el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setOpen(false)
        setSearching(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const searchButton = (
    <button
      type="button"
      onClick={() => {
        setOpen(false)
        setSearching(true)
      }}
      aria-label="Search the site"
      className="grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-raised hover:text-fg"
    >
      <Search className="size-[1.125rem]" strokeWidth={2} />
    </button>
  )

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Blueprint backdrop. Fixed so content scrolls over it, dimmed so text contrast holds. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/marketing-bg.jpg')] bg-cover bg-center opacity-55"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(9_9_11/0.35),rgb(9_9_11/0.7))]"
      />

      {searching && (
        <div
          aria-hidden
          onClick={() => setSearching(false)}
          className="fixed inset-0 z-40 bg-void/60 backdrop-blur-[2px]"
        />
      )}

      <header className="sticky top-0 z-50 px-4 pt-3">
        <div
          className={cn(
            'relative mx-auto flex h-14 max-w-5xl items-center gap-4 rounded-2xl border bg-surface/85 pr-2.5 pl-5 backdrop-blur-md transition-colors',
            searching ? 'border-line-strong' : 'justify-between border-line',
          )}
        >
          <Logo showWordmark={!searching} className={cn(searching && 'max-sm:hidden')} />

          {searching ? (
            <SiteSearch onClose={() => setSearching(false)} />
          ) : (
            <>
              <nav className="hidden items-center gap-6 md:flex">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        'text-sm transition-colors hover:text-fg',
                        isActive ? 'text-fg' : 'text-fg-subtle',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                {searchButton}
                <Link
                  to="/login"
                  className="text-sm text-fg-subtle transition-colors hover:text-fg"
                >
                  Log in
                </Link>
                <CtaButton to="/signup" size="sm">
                  See my type
                </CtaButton>
              </div>

              <div className="flex items-center gap-1 md:hidden">
                {searchButton}
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="grid size-9 place-items-center rounded-full text-fg-muted hover:bg-raised"
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>
              </div>
            </>
          )}
        </div>

        {open && !searching && (
          <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-line bg-surface p-3 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn('rounded-xl px-3 py-2.5 text-sm', isActive ? 'text-fg' : 'text-fg-muted')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <CtaButton to="/login" variant="outline" size="sm" onClick={() => setOpen(false)}>
                  Log in
                </CtaButton>
                <CtaButton to="/signup" size="sm" onClick={() => setOpen(false)}>
                  See my type
                </CtaButton>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-fg-subtle">
                Reads how you actually work. Tells you what kind of worker that makes you.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="label-mono mb-3">Product</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/sample" className="text-fg-subtle hover:text-fg">
                      Sample profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-fg-subtle hover:text-fg">
                      How it works
                    </Link>
                  </li>
                  <li>
                    <Link to="/sources" className="text-fg-subtle hover:text-fg">
                      Sources
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-fg-subtle hover:text-fg">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="label-mono mb-3">Account</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/login" className="text-fg-subtle hover:text-fg">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-fg-subtle hover:text-fg">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-line pt-6">
            <p className="label-mono">{new Date().getFullYear()} Hablytics</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
