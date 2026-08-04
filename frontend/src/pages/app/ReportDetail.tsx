import { Link } from 'react-router-dom'
import { ArrowLeft, Trophy, TrendingUp, Users, FileText, Download } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { GrowthCategory, Report } from '@/types'

const report: Report | null = null

const CATEGORY_TONE: Record<GrowthCategory, 'signal' | 'flux' | 'gap'> = {
  Technical: 'signal',
  Strategic: 'flux',
  'Soft Skill': 'gap',
}

export function ReportDetail() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/app/reports"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ash-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        All reports
      </Link>

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="label-mono text-signal-400">Report</p>
          <h1 className="mt-3 text-2xl sm:text-3xl">
            {report ? 'Your read' : 'Nothing to show yet'}
          </h1>
          <p className="mt-2.5 text-sm text-ash-400">
            {report
              ? 'Generated from the sources you connected.'
              : 'This is the shape your report takes once a scan has run.'}
          </p>
        </div>
        <Button variant="outline" disabled={!report}>
          <Download className="size-4" strokeWidth={1.75} />
          Export
        </Button>
      </div>

      <div className="space-y-5">
        <Panel className="hairline-top">
          <PanelHeader label="Summary" title="Where you stand right now" />
          <div className="p-5">
            {report ? (
              <p className="leading-relaxed text-ash-200">{report.summary}</p>
            ) : (
              <EmptyState
                compact
                icon={<FileText className="size-5" strokeWidth={1.5} />}
                title="No summary yet"
                description="Two sentences on how you're actually operating, once we have something to read."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            label="Hidden wins"
            title="Things you did and forgot to claim"
            action={<Badge tone="strong">{report?.hiddenWins.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.hiddenWins.length > 0 ? (
              <ul className="space-y-3">
                {report.hiddenWins.map((win, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Trophy className="mt-0.5 size-4 shrink-0 text-strong-400" strokeWidth={1.75} />
                    <span className="text-sm leading-relaxed text-ash-200">{win}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                icon={<Trophy className="size-5" strokeWidth={1.5} />}
                title="No wins surfaced yet"
                description="Achievements worth putting in a review or on a résumé will land here."
              />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            label="Growth opportunities"
            title="What's actually holding you back"
            action={<Badge tone="gap">{report?.growthOpportunities.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.growthOpportunities.length > 0 ? (
              <div className="space-y-4">
                {report.growthOpportunities.map((op, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/2 p-4">
                    <Badge tone={CATEGORY_TONE[op.category]}>{op.category}</Badge>
                    <p className="mt-3 text-sm leading-relaxed text-ash-300">{op.observation}</p>
                    <div className="mt-3 flex items-start gap-2.5 border-t border-white/6 pt-3">
                      <TrendingUp
                        className="mt-0.5 size-4 shrink-0 text-signal-400"
                        strokeWidth={1.75}
                      />
                      <p className="text-sm leading-relaxed text-ash-100">{op.action_item}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                compact
                icon={<TrendingUp className="size-5" strokeWidth={1.5} />}
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
            action={<Badge tone="flux">{report?.networkingTargets.length ?? 0}</Badge>}
          />
          <div className="p-5">
            {report && report.networkingTargets.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {report.networkingTargets.map((target, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-ash-200"
                  >
                    {target}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                compact
                icon={<Users className="size-5" strokeWidth={1.5} />}
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
