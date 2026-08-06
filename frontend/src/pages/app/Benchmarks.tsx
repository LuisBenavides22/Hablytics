import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Plan } from '@/types'

const currentPlan = 'FREE' as Plan
const hasBenchmarkAccess = currentPlan === 'ELITE'

const DIMENSIONS = [
  'Written structure',
  'Data in decisions',
  'Proactive communication',
  'Scope of ownership',
  'Follow through',
]

export function Benchmarks() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Where you rank"
        description="How your output compares to people chasing the same roles, and to people who just got promoted out of yours."
        action={!hasBenchmarkAccess ? <Button>Unlock benchmarks</Button> : undefined}
      />

      {!hasBenchmarkAccess && (
        <Panel className="mb-4 p-5">
          <div className="flex items-center gap-3">
            <p className="text-sm text-fg">Benchmark plan required</p>
            <Badge>$15/mo</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-subtle">
            Peer ranking compares you against other users targeting your roles. It needs the
            Benchmark plan to turn on.
          </p>
        </Panel>
      )}

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHeader label="Dimensions" title="What gets compared" />
          <div className="divide-y divide-line">
            {DIMENSIONS.map((d) => (
              <div key={d} className="flex items-center gap-4 px-5 py-3.5">
                <p className="min-w-0 flex-1 truncate text-sm text-fg-muted">{d}</p>
                <div className="h-1 w-28 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-0 rounded-full bg-fg" />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-xs text-fg-faint">0</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Your percentile" title="Against your target role" />
          <div className="p-5">
            <EmptyState
              compact
              title="Not enough signal yet"
              description="Ranking needs a scan on your side and enough users targeting the same roles."
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}
