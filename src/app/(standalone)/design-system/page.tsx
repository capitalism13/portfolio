import type { Metadata } from 'next'
import '@/styles/design-system.css'

export const metadata: Metadata = {
  title: 'Дизайн-система · Дмитрий Ли-Литвинов',
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <div className="ds-body">
      <header className="ds-head">
        <h1>
          Дизайн
          <br />
          система
        </h1>
        <p className="ds-note">
          Внутренняя страница. <b>Не индексируется</b> (noindex) и доступна только по прямой ссылке.
          Здесь собраны все компоненты, цвета и типографика проекта — строго наши шрифты:{' '}
          <b>Roboto Condensed</b> + <b>Roboto Mono</b>.
        </p>
      </header>

      <section className="ds-sec">
        <h2>Цвета</h2>
        <p className="ds-sub">Палитра</p>
        <div className="ds-grid">
          <div className="sw"><div className="chip" style={{ background: '#0a0a0a' }} /><div className="name">Ink</div><div className="hex">#0A0A0A</div></div>
          <div className="sw"><div className="chip" style={{ background: '#ffffff' }} /><div className="name">Paper</div><div className="hex">#FFFFFF</div></div>
          <div className="sw"><div className="chip" style={{ background: '#eaff00' }} /><div className="name">Accent</div><div className="hex">#EAFF00</div></div>
          <div className="sw"><div className="chip" style={{ background: '#e5e5e5' }} /><div className="name">Card</div><div className="hex">#E5E5E5</div></div>
          <div className="sw"><div className="chip" style={{ background: '#3ee07a' }} /><div className="name">Status</div><div className="hex">#3EE07A</div></div>
        </div>
      </section>

      <section className="ds-sec">
        <h2>Типографика</h2>
        <p className="ds-sub">Roboto Condensed 900 — заголовки · Roboto Mono 400/500/600 — текст и подписи</p>
        <div className="specimen"><div className="specimen-label">Display XL — Condensed 900</div><div className="type-cond t-xl">Дмитрий</div></div>
        <div className="specimen"><div className="specimen-label">Display L — Condensed 900</div><div className="type-cond t-l">Заголовок секции</div></div>
        <div className="specimen"><div className="specimen-label">Display M — Condensed 900</div><div className="type-cond t-m">Подзаголовок</div></div>
        <div className="specimen"><div className="specimen-label">Body — Mono 500 / 17px</div><div className="type-mono" style={{ fontWeight: 500, fontSize: 17, lineHeight: 1.7, maxWidth: 680 }}>Текст кейса набирается Roboto Mono — читаемо, с межстрочным 1.6–1.7. Акцентные слова выделяются <b style={{ fontWeight: 600 }}>жирным</b>.</div></div>
        <div className="specimen"><div className="specimen-label">Label / UPPERCASE — Mono 600 / 14px</div><div className="type-mono" style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Роль · Дата · Инструмент</div></div>
      </section>

      <section className="ds-sec">
        <h2>Кнопки</h2>
        <p className="ds-sub">Радиус 8px · Mono 600 16px · padding 14/42 · мягкий переливающийся ховер (наведи)</p>
        <div className="ds-grid">
          <div>
            <div className="ds-stage">
              <a className="btn btn--nav" href="#"><span>обо мне</span></a>
              <a className="btn btn--nav" href="#"><span>кейсы</span></a>
            </div>
            <div className="ds-cap">Nav-кнопка · default → ховер жёлтый перелив</div>
          </div>
          <div>
            <div className="ds-stage"><a className="btn btn--contact" href="#"><span>связаться</span></a></div>
            <div className="ds-cap">Контакт · жёлтая → ховер чёрный перелив</div>
          </div>
        </div>
        <div className="ds-grid" style={{ marginTop: 20 }}>
          <div>
            <div className="ds-stage ds-stage--dark"><a className="btn btn--white" href="#"><span>открыть кейс</span></a></div>
            <div className="ds-cap">CTA на карточке (поверх фото) · белая</div>
          </div>
          <div>
            <div className="ds-stage"><a className="btn btn--foot" href="#"><span>обсудить проект →</span></a></div>
            <div className="ds-cap">CTA в футере кейса · чёрная → жёлтая</div>
          </div>
        </div>
      </section>

      <section className="ds-sec">
        <h2>Теги</h2>
        <p className="ds-sub">Прямоугольные, радиус 6–8px</p>
        <div className="ds-grid">
          <div>
            <div className="ds-stage--dark ds-stage">
              <span className="tag tag--accent">Тестовое задание</span>
              <span className="tag tag--glass">Финтех</span>
            </div>
            <div className="ds-cap">Теги карточки (на фото) · акцентный + стеклянный</div>
          </div>
          <div>
            <div className="ds-stage" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
              <span className="tag tag--stack">Figma</span>
              <span className="tag tag--stack">Notion</span>
              <span className="tag tag--stack">Miro</span>
            </div>
            <div className="ds-cap">Теги стека (опыт) · обводка</div>
          </div>
          <div>
            <div className="ds-stage" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
              <span className="tag tag--accent">Тестовое задание · Финтех</span>
            </div>
            <div className="ds-cap">Eyebrow-плашка (страница кейса)</div>
          </div>
        </div>
      </section>

      <section className="ds-sec">
        <h2>Блоки</h2>
        <p className="ds-sub">Метрика · карточка</p>
        <div className="ds-grid">
          <div>
            <div className="metric-demo"><div className="n">−57%</div><div className="c">шагов до завершения<br />с ~13–14 до 6</div></div>
            <div className="ds-cap">Метрика результата</div>
          </div>
          <div>
            <div style={{ width: 300, height: 200, borderRadius: 16, background: '#e5e5e5', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 18, bottom: 18 }}>
                <span className="tag tag--accent" style={{ fontSize: 11, padding: '5px 10px' }}>Кейс</span>
                <div className="type-cond" style={{ fontSize: 36, marginTop: 10 }}>Forte Bank</div>
              </div>
            </div>
            <div className="ds-cap">Карточка кейса (упрощённо) · radius 36 / фото + текст</div>
          </div>
        </div>
      </section>
    </div>
  )
}
