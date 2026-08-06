import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Plug,
  FileText,
  Target,
  Gauge,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/connections', label: 'Connections', icon: Plug, end: false },
  { to: '/app/reports', label: 'Reports', icon: FileText, end: false },
  { to: '/app/plan', label: '30 day plan', icon: Target, end: false },
  { to: '/app/benchmarks', label: 'Benchmarks', icon: Gauge, end: false },
  { to: '/app/settings', label: 'Settings', icon: Settings, end: false },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-0.5">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              isActive ? 'bg-raised text-fg' : 'text-fg-subtle hover:bg-raised/60 hover:text-fg-muted',
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-r bg-accent" />
              )}
              <Icon
                className={cn('size-4 shrink-0', isActive && 'text-accent')}
                strokeWidth={1.5}
              />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function PlanCard() {
  return (
    <div className="rounded-md border border-line p-4">
      <p className="label-mono">Free plan</p>
      <p className="mt-2.5 text-sm leading-snug text-fg-subtle">
        One source, one snapshot. Upgrade for weekly tracking and benchmarks.
      </p>
      <Button size="sm" className="mt-4 w-full">
        Upgrade
      </Button>
    </div>
  )
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line lg:flex">
        <div className="flex h-14 items-center px-5">
          <Logo to="/app" />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <NavItems />
        </div>
        <div className="p-3">
          <PlanCard />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-line bg-void/85 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-8 place-items-center rounded-md border border-line text-fg-muted lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4" strokeWidth={1.5} />
            </button>
            <div className="lg:hidden">
              <Logo to="/app" />
            </div>
          </div>

          <Link
            to="/app/settings"
            className="grid size-8 place-items-center rounded-full border border-line text-xs text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Account settings"
          >
            <span className="sr-only">Account</span>
          </Link>
        </header>

        <main className="min-w-0 flex-1 px-4 py-10 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-void/80"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-line bg-void">
            <div className="flex h-14 items-center justify-between px-5">
              <Logo to="/app" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid size-8 place-items-center rounded-md text-fg-subtle"
                aria-label="Close navigation"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="p-3">
              <PlanCard />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
