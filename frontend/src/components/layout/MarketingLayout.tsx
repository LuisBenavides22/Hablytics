import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const LINKS = [
  { to: '/#how', label: 'How it works' },
  { to: '/#sources', label: 'Sources' },
  { to: '/#pricing', label: 'Pricing' },
]

export function MarketingLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-white/6 bg-void/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className="rounded-lg px-3 py-2 text-sm text-ash-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink
              to="/login"
              className={cn('rounded-lg px-3 py-2 text-sm text-ash-300 transition-colors hover:text-white')}
            >
              Log in
            </NavLink>
            <ButtonLink to="/signup" size="sm">
              Run my first scan
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-white/10 text-ash-300 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/6 bg-abyss px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ash-300"
                >
                  {l.label}
                </a>
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

      <footer className="border-t border-white/6 bg-abyss/40">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-ash-400">
                Reads how you actually work. Tells you what's costing you the job.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="label-mono mb-3 text-ash-500">Product</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/#how" className="text-ash-400 hover:text-white">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="/#pricing" className="text-ash-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <Link to="/signup" className="text-ash-400 hover:text-white">
                      Get started
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="label-mono mb-3 text-ash-500">Account</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/login" className="text-ash-400 hover:text-white">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link to="/forgot-password" className="text-ash-400 hover:text-white">
                      Reset password
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/6 pt-6">
            <p className="label-mono text-ash-500">
              &copy; {new Date().getFullYear()} Hablytics
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
