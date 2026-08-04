import { Gauge, Lock, Sparkles } from 'lucide-react'
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
  'Follow-through',
]

export function Benchmarks() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Benchmarks"
        title="Where you rank"
        description="How your output compares to people chasing the same roles, and to people who just got promoted out of yours."
        action={
          !hasBenchmarkAccess ? (
            <Button>
              <Sparkles className="size-4" strokeWidth={2} />
              Unlock benchmarks
            </Button>
          ) : undefined
        }
      />

      {!hasBenchmarkAccess && (
        <Panel className="mb-5 flex items-start gap-4 border-flux-400/25 bg-flux-500/6 p-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-flux-400/10">
            <Lock className="size-4.5 text-flux-300" strokeWidth={1.75} />
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-sm font-medium text-ash-100">Benchmark plan required</p>
              <Badge tone="flux">$15/mo</Badge>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ash-400">
              Peer ranking compares you against other users targeting your roles. It needs the
              Benchmark plan to turn on.
            </p>
          </div>
        </Panel>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel>
          <PanelHeader label="Dimensions" title="What gets compared" />
          <div className="divide-y divide-white/6">
            {DIMENSIONS.map((d) => (
              <div key={d} className="flex items-center gap-4 px-5 py-4">
                <p className="min-w-0 flex-1 truncate text-sm text-ash-200">{d}</p>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/6">
                  <div className="h-full w-0 rounded-full bg-linear-to-r from-signal-400 to-flux-400" />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-xs text-ash-500">
                  &mdash;
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader label="Your percentile" title="Against your target role" />
          <div className="p-5">
            <EmptyState
              icon={<Gauge className="size-5" strokeWidth={1.5} />}
              title="Not enough signal yet"
              description="Ranking needs a scan on your side and enough users targeting the same roles."
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}
