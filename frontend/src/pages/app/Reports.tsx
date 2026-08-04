import { Link } from 'react-router-dom'
import { FileText, Play } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { PlatformMark } from '@/components/PlatformMark'
import type { Report } from '@/types'

const reports: Report[] = []

export function Reports() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Reports"
        title="Every read, in order"
        description="Each scan is kept so you can see whether the gaps are actually closing."
        action={
          <Button>
            <Play className="size-4" strokeWidth={2} />
            Run a scan
          </Button>
        }
      />

      {reports.length === 0 ? (
        <Panel className="p-5">
          <EmptyState
            icon={<FileText className="size-5" strokeWidth={1.5} />}
            title="No reports yet"
            description="Once a source is connected, run your first scan and it will show up here."
            action={
              <ButtonLink to="/app/connections" variant="outline" size="sm">
                Connect a source
              </ButtonLink>
            }
          />
        </Panel>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <Link key={report.id} to={`/app/reports/${report.id}`}>
              <Panel className="flex items-center gap-4 p-5 transition-colors hover:border-white/16">
                {report.platform && <PlatformMark platform={report.platform} size="sm" />}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ash-100">{report.summary}</p>
                  <p className="label-mono mt-1.5 text-ash-500">{report.createdAt}</p>
                </div>
                <Badge tone="gap">{report.growthOpportunities.length} gaps</Badge>
              </Panel>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
