import type { Metadata } from 'next'
import '@/styles/design-system.css'
import '@/styles/case.css'

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
          <div className="sw"><div className="chip" style={{ background: 'var(--ink)' }} /><div className="name">Ink</div><div className="hex">#0A0A0A</div></div>
          <div className="sw"><div className="chip" style={{ background: 'var(--paper)' }} /><div className="name">Paper</div><div className="hex">#FFFFFF</div></div>
          <div className="sw"><div className="chip" style={{ background: 'var(--accent)' }} /><div className="name">Accent</div><div className="hex">#EAFF00</div></div>
          <div className="sw"><div className="chip" style={{ background: 'var(--card)' }} /><div className="name">Card</div><div className="hex">#E5E5E5</div></div>
          <div className="sw"><div className="chip" style={{ background: 'var(--status)' }} /><div className="name">Status</div><div className="hex">#3EE07A</div></div>
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
        <h2>Кейс · текст</h2>
        <p className="ds-sub">Rich-text из редактора (Lexical) на детальной странице кейса — класс <b>.case-content</b></p>

        <div className="specimen">
          <div className="specimen-label">Заголовок H2 · .case-h2 (Condensed 900, есть .accent)</div>
          <h2 className="case-h2">Бизнес-задача <span className="accent">и контекст</span></h2>
        </div>

        <div className="specimen">
          <div className="specimen-label">Подзаголовок H3 · .case-sub</div>
          <h3 className="case-sub">Что было до редизайна</h3>
        </div>

        <div className="specimen">
          <div className="specimen-label">Абзац · .case-text (Mono) — strong + ссылка</div>
          <p className="case-text">
            Текст кейса набирается Roboto Mono. Ключевые слова — <strong>жирным</strong>, внешняя
            ссылка — <a href="#">вот так</a>. Читаемая строка до ~860px.
          </p>
        </div>

        <div className="specimen">
          <div className="specimen-label">Список с точками (тире) · .c-list.c-list--dot</div>
          <ul className="c-list c-list--dot">
            <li>Маркированный пункт с тире</li>
            <li>Второй пункт списка</li>
            <li>Третий пункт списка</li>
          </ul>
        </div>

        <div className="specimen">
          <div className="specimen-label">Нумерованный список (01, 02…) · .c-list</div>
          <ul className="c-list">
            <li>Первый шаг процесса</li>
            <li>Второй шаг процесса</li>
            <li>Третий шаг процесса</li>
          </ul>
        </div>

        <div className="specimen">
          <div className="specimen-label">Цитата · blockquote.case-text</div>
          <blockquote className="case-text">Короткая цитата или вывод по разделу кейса.</blockquote>
        </div>

        <div className="specimen">
          <div className="specimen-label">Разделитель · hr.case-hr</div>
          <hr className="case-hr" />
        </div>
      </section>

      <section className="ds-sec">
        <h2>Кейс · блоки</h2>
        <p className="ds-sub">Кастомные блоки редактора (src/blocks) — 1:1 с детальной страницей кейса</p>

        <div className="specimen">
          <div className="specimen-label">Процесс (шаги) · processSteps → .process / .step</div>
          <div className="case-block">
            <div className="process">
              {[
                { num: '01', name: 'Исследование', bullets: ['Интервью', 'Аналитика', 'JTBD'] },
                { num: '02', name: 'Гипотезы', bullets: ['CJM', 'Сценарии'] },
                { num: '03', name: 'Дизайн', bullets: ['Прототип', 'UI-kit'] },
                { num: '04', name: 'Тесты', bullets: ['Usability', 'Итерации'] },
              ].map((s) => (
                <div className="step" key={s.num}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-name">{s.name}</div>
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="specimen">
          <div className="specimen-label">До / После · beforeAfter → .ba (.ba-was / .ba-now) + вывод</div>
          <div className="case-block">
            <div className="ba">
              <div className="ba-col ba-was">
                <span className="ba-label">Было</span>
                <ul>
                  <li>13–14 шагов до завершения</li>
                  <li>Непонятные статусы</li>
                </ul>
              </div>
              <div className="ba-col ba-now">
                <span className="ba-label">Стало</span>
                <ul>
                  <li>6 шагов</li>
                  <li>Прозрачный прогресс</li>
                </ul>
              </div>
            </div>
            <p className="screen-note">Вывод: путь пользователя сократился более чем вдвое.</p>
          </div>
        </div>

        <div className="specimen">
          <div className="specimen-label">Экран · screen → .screen-head + .ba + .screen-note + .shots</div>
          <div className="screen" style={{ paddingTop: 0, borderTop: 'none' }}>
            <div className="screen-head">
              <span className="screen-num">01</span>
              <span className="screen-name">Карточка дела</span>
            </div>
            <div className="ba">
              <div className="ba-col ba-was">
                <span className="ba-label">Было</span>
                <ul>
                  <li>Данные раскиданы по вкладкам</li>
                </ul>
              </div>
              <div className="ba-col ba-now">
                <span className="ba-label">Стало</span>
                <ul>
                  <li>Всё на одном экране</li>
                </ul>
              </div>
            </div>
            <p className="screen-note">Описание экрана и принятых решений.</p>
            <div className="shots">
              <div className="shot" style={{ height: 220, display: 'grid', placeItems: 'center', color: '#bbb' }}>
                IMG
              </div>
            </div>
          </div>
        </div>

        <div className="specimen">
          <div className="specimen-label">Метрики · metrics → .metrics / .metric</div>
          <div className="case-block">
            <div className="metrics">
              <div className="metric">
                <div className="metric-num">−57%</div>
                <div className="metric-cap">шагов до завершения</div>
              </div>
              <div className="metric">
                <div className="metric-num">2.1×</div>
                <div className="metric-cap">быстрее открытие депозита</div>
              </div>
              <div className="metric">
                <div className="metric-num">+34%</div>
                <div className="metric-cap">конверсия в заявку</div>
              </div>
            </div>
          </div>
        </div>

        <div className="specimen">
          <div className="specimen-label">Изображение · imageBlock → figure + .shot + .case-cap (есть «во всю ширину»)</div>
          <figure className="case-block">
            <div className="shot" style={{ height: 260, display: 'grid', placeItems: 'center', color: '#bbb' }}>
              IMG
            </div>
            <figcaption className="case-cap">Подпись к изображению (необязательно).</figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
