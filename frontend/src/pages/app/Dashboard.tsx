import { Link } from 'react-router-dom'
import { Plug, FileText, Target, Trophy, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import type { Report, WorkspaceConnection } from '@/types'

const connections: WorkspaceConnection[] = []
const reports: Report[] = []

const SIGNALS = [
  { label: 'Sources connected', value: connections.length, icon: Plug },
  { label: 'Reports generated', value: reports.length, icon: FileText },
  { label: 'Open action items', value: null, icon: Target },
]

export function Dashboard() {
  const latest = reports[0] ?? null

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Overview"
        title="Your read, so far"
        description="Everything here fills in once you connect a source and run your first scan."
        action={
          <ButtonLink to="/app/connections">
            Connect a source
            <ArrowRight className="size-4" strokeWidth={2} />
          </ButtonLink>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {SIGNALS.map(({ label, value, icon: Icon }) => (
          <Panel key={label} className="hairline-top p-5">
            <div className="flex items-start justify-between">
              <p className="label-mono text-ash-500">{label}</p>
              <Icon className="size-4 text-ash-500" strokeWidth={1.75} />
            </div>
            <p className="mt-4 font-mono text-3xl text-white">
              {value === null ? <span className="text-ash-500">&mdash;</span> : value}
            </p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHeader
            label="Latest report"
            title={latest ? 'Most recent read' : 'Nothing read yet'}
            action={
              reports.length > 0 ? (
                <Link
                  to="/app/reports"
                  className="text-sm text-signal-400 transition-colors hover:text-signal-300"
                >
                  View all
                </Link>
              ) : undefined
            }
          />
          <div className="p-5">
            {latest ? null : (
              <EmptyState
                icon={<FileText className="size-5" strokeWidth={1.5} />}
                title="No report generated yet"
                description="Connect at least one source, then run a scan to get your first read."
                action={
                  <ButtonLink to="/app/connections" variant="outline" size="sm">
                    Connect a source
                  </ButtonLink>
                }
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Connected sources" title="Where we read from" />
          <div className="p-5">
            {connections.length > 0 ? null : (
              <EmptyState
                compact
                icon={<Plug className="size-5" strokeWidth={1.5} />}
                title="No sources connected"
                description="Hablytics can't tell you anything until it can see your work."
                action={
                  <ButtonLink to="/app/connections" variant="outline" size="sm">
                    Browse sources
                  </ButtonLink>
                }
              />
            )}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {[
          { icon: Trophy, tone: 'strong' as const, label: 'Hidden wins', to: '/app/reports' },
          { icon: TrendingUp, tone: 'gap' as const, label: 'Growth gaps', to: '/app/plan' },
          { icon: Users, tone: 'flux' as const, label: 'People to know', to: '/app/reports' },
        ].map(({ icon: Icon, tone, label, to }) => (
          <Link key={label} to={to}>
            <Panel className="h-full p-5 transition-colors hover:border-white/16">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-white/8 bg-white/4">
                  <Icon className="size-4.5 text-ash-300" strokeWidth={1.5} />
                </span>
                <Badge tone={tone}>&mdash;</Badge>
              </div>
              <p className="mt-4 text-sm font-medium text-ash-100">{label}</p>
              <p className="mt-1 text-xs text-ash-500">Available after your first scan</p>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  )
}
