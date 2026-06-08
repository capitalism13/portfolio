import { getPayload } from 'payload'
import config from '@payload-config'

/* ---- Лёгкие типы под то, что используем на фронте ---- */
export type Media = { url?: string | null; alt?: string | null; width?: number; height?: number }

export type Contacts = {
  telegram?: string
  instagram?: string
  cvUrl?: string
  email?: string
  availabilityStatus?: string
  avatarInitials?: string
}

export type Home = {
  hero?: {
    eyebrow?: string
    name?: string
    intro?: string
    introAccent?: string
    tickerPhrases?: { text: string }[]
  }
  about?: {
    lead?: string
    accentPhrase?: string
    stats?: { num: string; cap: string }[]
    approach?: { title: string; text: string }[]
  }
  experience?: { company: string; role?: string; description?: string; date?: string }[]
  stack?: { name: string }[]
  support?: { lead?: string; items?: { name: string; description?: string }[] }
  education?: { title: string; date?: string }[]
  metadata?: { title: string; body?: string }[]
  contactsSection?: { status?: string; title?: string; sub?: string; ctaLabel?: string }
}

export type CaseTag = { label: string; isAccent?: boolean }
export type CaseDoc = {
  id: string
  title: string
  slug: string
  order?: number
  cover?: Media | string
  cardDescription?: string
  eyebrow?: string
  overview?: string
  tags?: CaseTag[]
  meta?: { role?: string; date?: string; tool?: string; readingTime?: string }
  content?: { root?: { children?: unknown[] } }
}

export const mediaUrl = (m?: Media | string | null): string => {
  if (!m) return ''
  if (typeof m === 'string') return m
  return m.url ?? ''
}

async function client() {
  return getPayload({ config })
}

export async function getContacts(): Promise<Contacts> {
  const p = await client()
  return (await p.findGlobal({ slug: 'contacts' })) as unknown as Contacts
}

export async function getHome(): Promise<Home> {
  const p = await client()
  return (await p.findGlobal({ slug: 'home' })) as unknown as Home
}

export async function getCases(): Promise<CaseDoc[]> {
  const p = await client()
  const res = await p.find({
    collection: 'cases',
    where: { _status: { equals: 'published' } },
    sort: 'order',
    depth: 1,
    limit: 100,
  })
  return res.docs as unknown as CaseDoc[]
}

export async function getCaseBySlug(slug: string, draft = false): Promise<CaseDoc | null> {
  const p = await client()
  const res = await p.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return (res.docs?.[0] as unknown as CaseDoc) ?? null
}

/** Следующий кейс по порядку (зациклено). */
export async function getNextCase(current: CaseDoc, all?: CaseDoc[]): Promise<CaseDoc | null> {
  const list = all ?? (await getCases())
  if (list.length < 2) return null
  const idx = list.findIndex((c) => c.id === current.id)
  if (idx === -1) return list[0]
  return list[(idx + 1) % list.length]
}
