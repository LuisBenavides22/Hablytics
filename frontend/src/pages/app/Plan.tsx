import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
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
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="What to actually do about it"
        description="Every gap in your report turns into something specific enough to start this week."
      />

      <Panel className="mb-4 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-mono">Progress</p>
            <p className="mt-3 font-mono text-2xl text-fg">
              {done}/{total}
            </p>
          </div>
          <p className="font-mono text-sm text-fg-faint">{pct}%</p>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-fg transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Panel>

      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
        {WEEKS.map(({ week, focus, detail }) => {
          const weekTasks = tasks.filter((t) => t.week === week)

          return (
            <div key={week} className="bg-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge>Week {week}</Badge>
                    <h3 className="text-[0.9375rem]">{focus}</h3>
                  </div>
                  <p className="mt-2 text-sm text-fg-subtle">{detail}</p>
                </div>
                <span className="label-mono shrink-0">
                  {weekTasks.length > 0 ? `${weekTasks.length} tasks` : 'Empty'}
                </span>
              </div>

              {weekTasks.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {weekTasks.map((task) => (
                    <li key={task.id} className="rounded-md border border-line p-3.5">
                      <p className="text-sm text-fg-muted">{task.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-fg-faint">{task.detail}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {total === 0 && (
        <EmptyState
          className="mt-4"
          title="No plan generated yet"
          description="Your plan is built from the gaps in your report, so it needs a scan first."
          action={
            <ButtonLink to="/app/connections" variant="outline" size="sm">
              Connect a source
            </ButtonLink>
          }
        />
      )}
    </div>
  )
}
