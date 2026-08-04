import { Target, CircleDashed } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import type { PlanTask } from '@/types'

const tasks: PlanTask[] = []

const WEEKS = [
  { week: 1 as const, focus: 'Stop the bleeding', detail: 'The fastest visible change to how you work.' },
  { week: 2 as const, focus: 'Build the habit', detail: 'Repeat it until it stops feeling deliberate.' },
  { week: 3 as const, focus: 'Raise the ceiling', detail: 'Push into the skill you have been avoiding.' },
  { week: 4 as const, focus: 'Make it visible', detail: 'Put the change somewhere other people will see it.' },
]

export function Plan() {
  const done = tasks.filter((t) => t.done).length
  const total = tasks.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="30-day plan"
        title="What to actually do about it"
        description="Every gap in your report turns into something specific enough to start this week."
      />

      <Panel className="mb-6 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-mono text-ash-500">Progress</p>
            <p className="mt-3 font-mono text-3xl text-white">
              {total > 0 ? `${done}/${total}` : <span className="text-ash-500">&mdash;</span>}
            </p>
          </div>
          <p className="font-mono text-sm text-ash-500">{pct}%</p>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-linear-to-r from-signal-400 to-flux-400 transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Panel>

      <div className="space-y-4">
        {WEEKS.map(({ week, focus, detail }) => {
          const weekTasks = tasks.filter((t) => t.week === week)

          return (
            <Panel key={week} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <Badge tone="signal">Week {week}</Badge>
                    <h3 className="text-base">{focus}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ash-400">{detail}</p>
                </div>
                <span className="label-mono shrink-0 text-ash-500">
                  {weekTasks.length > 0 ? `${weekTasks.length} tasks` : '—'}
                </span>
              </div>

              <div className="mt-4">
                {weekTasks.length > 0 ? (
                  <ul className="space-y-2">
                    {weekTasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/2 p-3.5"
                      >
                        <CircleDashed
                          className={cn(
                            'mt-0.5 size-4 shrink-0',
                            task.done ? 'text-strong-400' : 'text-ash-500',
                          )}
                          strokeWidth={1.75}
                        />
                        <div>
                          <p className="text-sm text-ash-100">{task.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-ash-500">{task.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/8 px-4 py-5 text-center">
                    <p className="text-xs text-ash-500">Fills in after your first report</p>
                  </div>
                )}
              </div>
            </Panel>
          )
        })}
      </div>

      {total === 0 && (
        <Panel className="mt-5 p-5">
          <EmptyState
            icon={<Target className="size-5" strokeWidth={1.5} />}
            title="No plan generated yet"
            description="Your plan is built from the gaps in your report, so it needs a scan first."
            action={
              <ButtonLink to="/app/connections" variant="outline" size="sm">
                Connect a source
              </ButtonLink>
            }
          />
        </Panel>
      )}
    </div>
  )
}
