import type { Platform } from '@/types'

export interface IntegrationMeta {
  platform: Platform
  name: string
  reads: string
  audience: 'college' | 'career' | 'both'
  available: boolean
}

export const INTEGRATIONS: IntegrationMeta[] = [
  {
    platform: 'GITHUB',
    name: 'GitHub',
    reads: 'Commits, pull requests, review comments',
    audience: 'career',
    available: true,
  },
  {
    platform: 'SLACK',
    name: 'Slack',
    reads: 'Channel messages, threads, response patterns',
    audience: 'career',
    available: true,
  },
  {
    platform: 'NOTION',
    name: 'Notion',
    reads: 'Docs, specs, meeting notes, project pages',
    audience: 'both',
    available: false,
  },
  {
    platform: 'MICROSOFT',
    name: 'Microsoft 365',
    reads: 'Outlook mail, Teams messages, Word documents',
    audience: 'career',
    available: false,
  },
  {
    platform: 'GOOGLE_DRIVE',
    name: 'Google Drive',
    reads: 'Docs, Sheets, Slides you authored',
    audience: 'college',
    available: false,
  },
  {
    platform: 'CANVAS',
    name: 'Canvas',
    reads: 'Submitted assignments, essays, project feedback',
    audience: 'college',
    available: false,
  },
  {
    platform: 'GMAIL',
    name: 'Gmail',
    reads: 'Sent mail tone, structure, follow-through',
    audience: 'both',
    available: false,
  },
  {
    platform: 'ZOOM',
    name: 'Zoom',
    reads: 'Meeting transcripts, talk-time balance',
    audience: 'career',
    available: false,
  },
]

export const INTEGRATION_BY_PLATFORM = Object.fromEntries(
  INTEGRATIONS.map((i) => [i.platform, i]),
) as Record<Platform, IntegrationMeta>
