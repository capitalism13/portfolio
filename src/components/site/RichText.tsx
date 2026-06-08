import { Fragment, type ReactNode } from 'react'
import { mediaUrl, type Media } from '@/lib/data'

/* Lexical text-format bitmask */
const BOLD = 1
const ITALIC = 2
const STRIKE = 4
const UNDERLINE = 8
const CODE = 16

type LexNode = {
  type: string
  version?: number
  text?: string
  format?: number | string
  tag?: string
  listType?: 'bullet' | 'number' | 'check'
  fields?: Record<string, unknown> & { blockType?: string }
  children?: LexNode[]
  [key: string]: unknown
}

/* Splits "a\nb" into ["a", <br/>, "b"] */
function withBreaks(text: string): ReactNode {
  const parts = text.split('\n')
  if (parts.length === 1) return text
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ))
}

function renderText(node: LexNode, key: number): ReactNode {
  const text = node.text ?? ''
  const fmt = typeof node.format === 'number' ? node.format : 0
  let el: ReactNode = withBreaks(text)
  if (fmt & CODE) el = <code key={key}>{el}</code>
  if (fmt & STRIKE) el = <s key={key}>{el}</s>
  if (fmt & UNDERLINE) el = <u key={key}>{el}</u>
  if (fmt & ITALIC) el = <em key={key}>{el}</em>
  if (fmt & BOLD) el = <strong key={key}>{el}</strong>
  return <Fragment key={key}>{el}</Fragment>
}

function renderInline(children?: LexNode[]): ReactNode {
  if (!children) return null
  return children.map((child, i) => {
    if (child.type === 'text') return renderText(child, i)
    if (child.type === 'linebreak') return <br key={i} />
    if (child.type === 'link') {
      const url = (child.fields as { url?: string } | undefined)?.url ?? '#'
      return (
        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
          {renderInline(child.children)}
        </a>
      )
    }
    // unknown inline node: render its children if any
    return <Fragment key={i}>{renderInline(child.children)}</Fragment>
  })
}

/* ---------- Custom blocks (1:1 with case.css) ---------- */
type Row<T> = T & { id?: string }
type Bullet = { text?: string }
type Step = { num?: string; name?: string; bullets?: Row<Bullet>[] }

function CaseBlock({ fields }: { fields: Record<string, unknown> & { blockType?: string } }) {
  switch (fields.blockType) {
    case 'processSteps': {
      const steps = (fields.steps as Row<Step>[]) ?? []
      return (
        <div className="case-block">
          <div className="process">
            {steps.map((s, i) => (
              <div className="step" key={s.id ?? i}>
                {s.num ? <div className="step-num">{s.num}</div> : null}
                <div className="step-name">{s.name}</div>
                <ul>
                  {(s.bullets ?? []).map((b, j) => (
                    <li key={b.id ?? j}>{b.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'beforeAfter': {
      const was = (fields.was as Row<Bullet>[]) ?? []
      const now = (fields.now as Row<Bullet>[]) ?? []
      const note = fields.note as string | undefined
      const img = mediaUrl(fields.image as Media | string | undefined)
      return (
        <div className="case-block">
          <div className="ba">
            <div className="ba-col ba-was">
              <span className="ba-label">Было</span>
              <ul>
                {was.map((b, i) => (
                  <li key={b.id ?? i}>{b.text}</li>
                ))}
              </ul>
            </div>
            <div className="ba-col ba-now">
              <span className="ba-label">Стало</span>
              <ul>
                {now.map((b, i) => (
                  <li key={b.id ?? i}>{b.text}</li>
                ))}
              </ul>
            </div>
          </div>
          {note ? <p className="screen-note">{withBreaks(note)}</p> : null}
          {img ? <img className="shot" src={img} loading="lazy" alt={note || 'before / after'} /> : null}
        </div>
      )
    }
    case 'screen': {
      const num = fields.num as string | undefined
      const name = fields.name as string | undefined
      const note = fields.note as string | undefined
      const was = (fields.was as Row<Bullet>[]) ?? []
      const now = (fields.now as Row<Bullet>[]) ?? []
      const hasBa = was.length > 0 || now.length > 0
      const images = (fields.images as Row<{ image?: Media | string }>[]) ?? []
      return (
        <div className="screen">
          <div className="screen-head">
            <span className="screen-num">{num || '—'}</span>
            <span className="screen-name">{name}</span>
          </div>
          {hasBa ? (
            <div className="ba">
              <div className="ba-col ba-was">
                <span className="ba-label">Было</span>
                <ul>
                  {was.map((b, i) => (
                    <li key={b.id ?? i}>{b.text}</li>
                  ))}
                </ul>
              </div>
              <div className="ba-col ba-now">
                <span className="ba-label">Стало</span>
                <ul>
                  {now.map((b, i) => (
                    <li key={b.id ?? i}>{b.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          {note ? <p className="screen-note">{withBreaks(note)}</p> : null}
          <div className="shots">
            {images.map((im, i) => {
              const url = mediaUrl(im.image)
              return url ? <img className="shot" key={im.id ?? i} src={url} loading="lazy" alt={name || 'screen'} /> : null
            })}
          </div>
        </div>
      )
    }
    case 'metrics': {
      const items = (fields.items as Row<{ num?: string; cap?: string }>[]) ?? []
      return (
        <div className="case-block">
          <div className="metrics">
            {items.map((m, i) => (
              <div className="metric" key={m.id ?? i}>
                <div className="metric-num">{m.num}</div>
                <div className="metric-cap">{withBreaks(m.cap ?? '')}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'imageBlock': {
      const url = mediaUrl(fields.image as Media | string | undefined)
      const caption = fields.caption as string | undefined
      const fullBleed = Boolean(fields.fullBleed)
      if (!url) return null
      return (
        <figure className={`case-block${fullBleed ? ' case-fullbleed' : ''}`}>
          <img className={fullBleed ? '' : 'shot'} src={url} loading="lazy" alt={caption || ''} />
          {caption ? <figcaption className="case-cap">{caption}</figcaption> : null}
        </figure>
      )
    }
    default:
      return null
  }
}

/* ---------- Block-level node dispatch ---------- */
function renderNode(node: LexNode, key: number): ReactNode {
  switch (node.type) {
    case 'heading': {
      const inner = renderInline(node.children)
      if (node.tag === 'h2') return <h2 className="case-h2" key={key}>{inner}</h2>
      if (node.tag === 'h3') return <h3 className="case-sub" key={key}>{inner}</h3>
      return <h2 className="case-h2" key={key}>{inner}</h2>
    }
    case 'paragraph': {
      if (!node.children || node.children.length === 0) return null
      return <p className="case-text" key={key}>{renderInline(node.children)}</p>
    }
    case 'list': {
      const dot = node.listType !== 'number'
      return (
        <ul className={`c-list${dot ? ' c-list--dot' : ''}`} key={key}>
          {(node.children ?? []).map((li, i) => (
            <li key={i}>{renderInline(li.children)}</li>
          ))}
        </ul>
      )
    }
    case 'quote':
      return <blockquote className="case-text" key={key}>{renderInline(node.children)}</blockquote>
    case 'horizontalrule':
      return <hr className="case-hr" key={key} />
    case 'block':
      return node.fields ? <CaseBlock fields={node.fields} key={key} /> : null
    default:
      return null
  }
}

export default function RichText({ content }: { content?: { root?: { children?: unknown[] } } | null }) {
  const children = content?.root?.children as LexNode[] | undefined
  if (!children?.length) return null
  return <div className="case-content">{children.map((n, i) => renderNode(n, i))}</div>
}
