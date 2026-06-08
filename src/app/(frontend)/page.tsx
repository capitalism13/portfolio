import { getHome, getCases, getContacts, mediaUrl } from '@/lib/data'
import Ticker from '@/components/site/Ticker'
import CopyEmail from '@/components/site/CopyEmail'
import ThemeOnScroll from '@/components/site/ThemeOnScroll'

export const dynamic = 'force-dynamic'

function NameLines({ name }: { name: string }) {
  const parts = (name || '').trim().split(' ')
  const first = parts[0] || ''
  const rest = parts.slice(1).join(' ')
  return (
    <>
      {first}
      <br />
      {rest}
    </>
  )
}

function IntroText({ intro, accent }: { intro?: string; accent?: string }) {
  if (!intro) return null
  if (accent && intro.includes(accent)) {
    const idx = intro.indexOf(accent)
    return (
      <>
        {intro.slice(0, idx)}
        <span className="accent">{accent}</span>
        {intro.slice(idx + accent.length)}
      </>
    )
  }
  return <>{intro}</>
}

export default async function HomePage() {
  const [home, cases, contacts] = await Promise.all([getHome(), getCases(), getContacts()])
  const hero = home.hero || {}
  const about = home.about || {}
  const cs = home.contactsSection || {}
  const phrases = (hero.tickerPhrases || []).map((p) => p.text).filter(Boolean)

  return (
    <>
      <ThemeOnScroll />
      <video className="bg" src="/hero.mp4" autoPlay muted loop playsInline preload="auto" />

      <main className="stage">
        <div className="eyebrow">{hero.eyebrow}</div>
        <h1 className="name">
          <NameLines name={hero.name || ''} />
        </h1>
        <p className="intro">
          <IntroText intro={hero.intro} accent={hero.introAccent} />
          {phrases.length > 0 && <Ticker phrases={phrases} />}
        </p>
      </main>

      <section className="cases" id="cases" data-theme="dark">
        {cases.map((c) => (
          <article className="case-slide" key={c.id}>
            <div className="case-slide__text">
              {c.tags?.length ? (
                <div className="case-tags">
                  {c.tags.map((t, i) => (
                    <span key={i} className={`case-tag${t.isAccent ? ' case-tag--accent' : ''}`}>
                      {t.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <h3 className="case-slide__title">{c.title}</h3>
              {c.cardDescription ? <p className="case-slide__desc">{c.cardDescription}</p> : null}
              <a className="case-btn" href={`/cases/${c.slug}`}>
                <span className="btn-label">
                  <span className="btn-label__text">открыть кейс</span>
                </span>
              </a>
            </div>
            <div className="case-slide__media">
              {mediaUrl(c.cover) ? <img src={mediaUrl(c.cover)} alt={c.title} /> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="section section--dark" id="about" data-theme="dark">
        <div className="section-inner">
          <h2 className="section-title">обо мне</h2>
          <p className="about-lead">
            {about.lead}{' '}
            {about.accentPhrase ? <span className="accent">{about.accentPhrase}</span> : null}
          </p>
          <div className="stats">
            {(about.stats || []).map((s, i) => (
              <div className="stat" key={i}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-cap">{s.cap}</span>
              </div>
            ))}
          </div>
          <div className="approach">
            {(about.approach || []).map((a, i) => (
              <div className="appr" key={i}>
                <h3 className="appr-title">{a.title}</h3>
                <p className="appr-text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" id="experience" data-theme="light">
        <div className="section-inner">
          <h2 className="section-title">опыт</h2>
          <ul className="xp">
            {(home.experience || []).map((e, i) => (
              <li className="xp-row" key={i}>
                <div className="xp-main">
                  <span className="xp-co">{e.company}</span>
                  {e.description ? <span className="xp-desc">{e.description}</span> : null}
                </div>
                <span className="xp-role">{e.role}</span>
                <span className="xp-date">{e.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {home.support?.items?.length ? (
        <section className="section section--dark" id="support" data-theme="dark">
          <div className="section-inner">
            <h2 className="section-title">поддержка и развитие дизайна</h2>
            {home.support.lead ? <p className="support-lead">{home.support.lead}</p> : null}
            <ul className="support-list">
              {home.support.items.map((it, i) => (
                <li className="support-item" key={i}>
                  <span className="support-name">{it.name}</span>
                  {it.description ? <span className="support-desc">{it.description}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {home.education?.length || home.metadata?.length ? (
        <section className="section section--light" id="education" data-theme="light">
          <div className="section-inner">
            {home.education?.length ? (
              <div className="cv-block">
                <h2 className="section-title">образование</h2>
                <ul className="edu-list">
                  {home.education.map((e, i) => (
                    <li className="edu-item" key={i}>
                      <span className="edu-title">{e.title}</span>
                      {e.date ? <span className="edu-date">{e.date}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {home.metadata?.length ? (
              <div className="cv-block">
                <h2 className="section-title">метаданные</h2>
                <div className="meta-toggles">
                  {home.metadata.map((m, i) => (
                    <details className="meta-toggle" key={i}>
                      <summary className="meta-summary">{m.title}</summary>
                      {m.body ? <p className="meta-body">{m.body}</p> : null}
                    </details>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section section--dark contacts" id="contacts" data-theme="dark">
        <div className="section-inner contacts-inner">
          <p className="contacts-status">
            <span className="dot" />
            {cs.status || contacts.availabilityStatus}
          </p>
          <h2 className="contacts-title">{cs.title}</h2>
          {cs.sub ? <p className="contacts-sub">{cs.sub}</p> : null}
          <div className="contacts-links">
            {contacts.telegram ? (
              <a className="contact-link" href={contacts.telegram} target="_blank" rel="noopener noreferrer">
                Telegram ↗
              </a>
            ) : null}
            {contacts.instagram ? (
              <a className="contact-link" href={contacts.instagram} target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
            ) : null}
            {contacts.cvUrl ? (
              <a className="contact-link" href={contacts.cvUrl}>
                CV ↗
              </a>
            ) : null}
          </div>
          <a className="contacts-cta case-btn" href={contacts.telegram || '#'} target="_blank" rel="noopener noreferrer">
            <span className="btn-label">
              <span className="btn-label__text">{cs.ctaLabel || 'написать в telegram'}</span>
            </span>
          </a>
          {contacts.email ? <CopyEmail email={contacts.email} /> : null}
        </div>
      </section>
    </>
  )
}
