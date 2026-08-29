import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/sources', label: 'Sources' },
  { to: '/pricing', label: 'Pricing' },
]

export function MarketingLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-line bg-void/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Logo />

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

          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login" className="text-sm text-fg-subtle transition-colors hover:text-fg">
              Log in
            </Link>
            <ButtonLink to="/signup" size="sm">
              Run my first scan
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 place-items-center rounded-md border border-line text-fg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-line px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-2 py-2.5 text-sm',
                      isActive ? 'text-fg' : 'text-fg-muted',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ButtonLink to="/login" variant="outline" size="sm">
                  Log in
                </ButtonLink>
                <ButtonLink to="/signup" size="sm">
                  Sign up
                </ButtonLink>
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
                Reads how you actually work. Tells you what is costing you the job.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="label-mono mb-3">Product</p>
                <ul className="space-y-2 text-sm">
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
