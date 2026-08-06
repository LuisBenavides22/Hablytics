import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Report } from '@/types'

const report: Report | null = null

export function ReportDetail() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/app/reports"
        className="mb-8 inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        All reports
      </Link>

      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl">{report ? 'Your read' : 'Nothing to show yet'}</h1>
          <p className="mt-2.5 text-sm text-fg-subtle">
            {report
              ? 'Generated from the sources you connected.'
              : 'This is the shape your report takes once a scan has run.'}
          </p>
        </div>
        <Button variant="outline" disabled={!report}>
          Export
        </Button>
      </div>

      <div className="space-y-4">
        <Panel>
          <PanelHeader label="Summary" title="Where you stand right now" />
          <div className="p-5">
            {report ? (
              <p className="leading-relaxed text-fg-muted">{report.summary}</p>
            ) : (
              <EmptyState
                compact
                title="No summary yet"
                description="Two sentences on how you are actually operating, once we have something to read."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            label="Hidden wins"
            title="Things you did and forgot to claim"
            action={<Badge tone="positive">{report?.hiddenWins.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.hiddenWins.length > 0 ? (
              <ul className="space-y-3">
                {report.hiddenWins.map((win, i) => (
                  <li key={i} className="text-sm leading-relaxed text-fg-muted">
                    {win}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                title="No wins surfaced yet"
                description="Achievements worth putting in a review or on a resume will land here."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            label="Growth opportunities"
            title="What is actually holding you back"
            action={<Badge tone="attention">{report?.growthOpportunities.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.growthOpportunities.length > 0 ? (
              <div className="space-y-3">
                {report.growthOpportunities.map((op, i) => (
                  <div key={i} className="rounded-md border border-line p-4">
                    <Badge>{op.category}</Badge>
                    <p className="mt-3 text-sm leading-relaxed text-fg-subtle">{op.observation}</p>
                    <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fg-muted">
                      {op.action_item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                compact
                title="No gaps identified yet"
                description="Each gap comes with the observation behind it and one concrete thing to do."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            label="Networking targets"
            title="People worth knowing better"
            action={<Badge>{report?.networkingTargets.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.networkingTargets.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {report.networkingTargets.map((target, i) => (
                  <li key={i} className="rounded-md border border-line px-3 py-1.5 text-sm text-fg-muted">
                    {target}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                title="No targets identified yet"
                description="Names and roles already showing up in your work, worth investing in."
              />
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}
