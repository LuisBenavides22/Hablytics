import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import type { Report, WorkspaceConnection } from '@/types'

const connections: WorkspaceConnection[] = []
const reports: Report[] = []

const SIGNALS = [
  { label: 'Sources connected', value: connections.length },
  { label: 'Reports generated', value: reports.length },
  { label: 'Open action items', value: null },
]

export function Dashboard() {
  const latest = reports[0] ?? null

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Your read, so far"
        description="Everything here fills in once you connect a source and run your first scan."
        action={<ButtonLink to="/app/connections">Connect a source</ButtonLink>}
      />

      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {SIGNALS.map(({ label, value }) => (
          <div key={label} className="bg-surface p-5">
            <p className="label-mono">{label}</p>
            <p className="mt-4 font-mono text-2xl text-fg">
              {value === null ? <span className="text-fg-faint">0</span> : value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHeader
            label="Latest report"
            title={latest ? 'Most recent read' : 'Nothing read yet'}
            action={
              reports.length > 0 ? (
                <Link to="/app/reports" className="text-sm text-fg-subtle hover:text-fg">
                  View all
                </Link>
              ) : undefined
            }
          />
          <div className="p-5">
            {latest ? null : (
              <EmptyState
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
                title="No sources connected"
                description="Hablytics cannot tell you anything until it can see your work."
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
    </div>
  )
}
