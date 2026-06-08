import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import '@/styles/case.css'
import { getCaseBySlug, getCases, getNextCase, getContacts, mediaUrl } from '@/lib/data'
import RichText from '@/components/site/RichText'
import RefreshOnSave from '@/components/site/RefreshOnSave'

export const dynamic = 'force-dynamic'

type Params = { slug: string }
type Search = { preview?: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const c = await getCaseBySlug(slug)
  if (!c) return { title: 'Кейс не найден' }
  return {
    title: `${c.title} — кейс · Дмитрий Ли-Литвинов`,
    description: c.overview || c.cardDescription || undefined,
  }
}

function MetaItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="m-item">
      <div className="m-label">{label}</div>
      <div className="m-val">{value}</div>
    </div>
  )
}

export default async function CasePage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<Search>
}) {
  const { slug } = await params
  const { preview } = await searchParams
  const draft = preview === 'true'

  const [c, all, contacts] = await Promise.all([
    getCaseBySlug(slug, draft),
    getCases(),
    getContacts(),
  ])
  if (!c) notFound()

  const meta = c.meta || {}
  const next = await getNextCase(c, all)
  const coverUrl = mediaUrl(c.cover)

  return (
    <div className="case-page">
      {draft ? <RefreshOnSave /> : null}
      <a className="back" href="/#cases">
        <span>← к кейсам</span>
      </a>

      <article className="case">
        {coverUrl ? <img className="case-cover case-cover--top" src={coverUrl} alt={c.title} /> : null}

        <header className="case-hero">
          {c.eyebrow ? <span className="case-eyebrow">{c.eyebrow}</span> : null}
          <h1 className="case-title">{c.title}</h1>
          {c.overview ? <p className="case-overview">{c.overview}</p> : null}
          <div className="case-meta">
            <MetaItem label="Роль" value={meta.role} />
            <MetaItem label="Дата" value={meta.date} />
            <MetaItem label="Инструмент" value={meta.tool} />
            <MetaItem label="Чтение" value={meta.readingTime} />
          </div>
        </header>

        <RichText content={c.content} />

        {next ? (
          <a className="next-case" href={`/cases/${next.slug}`}>
            {mediaUrl(next.cover) ? <img src={mediaUrl(next.cover)} alt={next.title} /> : null}
            <div className="nc-inner">
              <div className="nc-label">Следующий кейс</div>
              <div className="nc-name">{next.title}</div>
              <div className="nc-go">Открыть →</div>
            </div>
          </a>
        ) : null}

        <footer className="case-foot">
          <a className="foot-back" href="/#cases">
            ← Все кейсы
          </a>
          <a
            className="foot-cta"
            href={contacts.telegram || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Обсудить проект →
          </a>
        </footer>
      </article>
    </div>
  )
}
