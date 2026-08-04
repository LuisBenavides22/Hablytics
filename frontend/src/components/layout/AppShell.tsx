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
  Sparkles,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/connections', label: 'Connections', icon: Plug, end: false },
  { to: '/app/reports', label: 'Reports', icon: FileText, end: false },
  { to: '/app/plan', label: '30-Day Plan', icon: Target, end: false },
  { to: '/app/benchmarks', label: 'Benchmarks', icon: Gauge, end: false },
  { to: '/app/settings', label: 'Settings', icon: Settings, end: false },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
              isActive
                ? 'bg-white/6 text-white'
                : 'text-ash-400 hover:bg-white/4 hover:text-ash-100',
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-linear-to-b from-signal-400 to-flux-400" />
              )}
              <Icon
                className={cn('size-4 shrink-0', isActive ? 'text-signal-400' : 'text-ash-500')}
                strokeWidth={1.75}
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
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-linear-to-br from-flux-500/12 to-signal-500/8 p-4">
      <p className="label-mono text-flux-300">Free plan</p>
      <p className="mt-2 text-sm leading-snug text-ash-300">
        One source, one snapshot. Upgrade for weekly tracking and benchmarks.
      </p>
      <Button size="sm" className="mt-3 w-full">
        <Sparkles className="size-3.5" strokeWidth={2} />
        Upgrade
      </Button>
    </div>
  )
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/6 bg-abyss/60 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo to="/app" />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <NavItems />
        </div>
        <div className="p-3">
          <PlanCard />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-white/6 bg-void/70 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-white/10 text-ash-300 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4" strokeWidth={1.75} />
            </button>
            <div className="lg:hidden">
              <Logo to="/app" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge tone="signal" dot>
              Idle
            </Badge>
            <Link
              to="/app/settings"
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-ash-300 transition-colors hover:border-signal-400/40 hover:text-white"
              aria-label="Account settings"
            >
              &mdash;
            </Link>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-white/8 bg-abyss">
            <div className="flex h-16 items-center justify-between px-5">
              <Logo to="/app" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid size-9 place-items-center rounded-lg text-ash-400"
                aria-label="Close navigation"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2">
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
