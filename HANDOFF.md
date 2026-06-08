# HANDOFF — Portfolio CMS (Дмитрий Ли-Литвинов)

Контекст для продолжения работы в новой сессии. Читать вместе с планом:
`/Users/dmitriy/.claude/plans/distributed-crafting-axolotl.md`.

---

## STATUS (обновлено 2026-06-08, сессия 3)

Сессия 3 = большой UX/контент-пасс по главной + полное наполнение кейсов. Всё ниже
сделано поверх готовых Фаз A–F из сессии 2 (см. «СЕССИЯ 2» дальше).

### Порт сменён на 3005
3000/3001 заняты (GOAT перехватывает 3000). Сейчас везде **3005**:
`.env` `NEXT_PUBLIC_SERVER_URL=http://localhost:3005`, `package.json` dev/devsafe `-p 3005`,
`.claude/launch.json` cms-конфиг. Если медиа/админка/Live-Preview не грузятся — проверь, что serverURL и порт совпадают.

### Главная — сделано в этой сессии
- **Scroll-driven page theme** (`src/components/site/ThemeOnScroll.tsx`, NEW): IntersectionObserver с
  `rootMargin:'-50% 0px -50% 0px'` ловит секцию, пересёкшую вертикальный центр, и ставит
  `html[data-theme="dark|light"]`. `home.css` переписан на CSS-переменные `--fg/--dim/--line`,
  `html` получил `background-color .5s ease`, `html[data-theme="light"]` — белый фон + тёмный текст.
  Швы между тёмными/светлыми секциями исчезают: фон плавно перетекает. Секции прозрачные
  (`background:transparent`), цвет текста = `var(--fg)`. Hero-видео `.bg` стало `position:absolute`
  (только в хиро, не fixed) — иначе перекрывало секции. Из `html,body` убран непрозрачный `background`.
  6 секций размечены `data-theme`: cases=dark, about=dark, experience=light, support=dark,
  education=light, contacts=dark. ⚠️ Проверять переход надо в ВИДИМОЙ вкладке — скрытая
  automation-вкладка тротлит CSS-transitions (давала ложные «застряло»).
- **Кейсы → Pragmatica-style вертикальные сплит-слайды** (горизонтальный pin УБРАН по просьбе —
  `HorizontalScroll.tsx` больше не импортируется). Каждый кейс = `.case-slide` на всю высоту:
  текст слева (тэги/заголовок/описание/кнопка), мокап справа, разделитель `border-top:1px var(--line)`.
  Контейнер выровнен по общей сетке: `.case-slide` и `.section-inner` оба `width:61.5162vw; margin:0 auto`.
  Мобилка (`max-width:900px`): колонка, `width:88vw`, медиа `aspect-ratio:4/3`.
- **Бургер-меню** (`SideNav.tsx` + `sidenav.css`, Osmo wipe): две полоски → крестик через чистый CSS
  (`.sidenav__button.is-open .sidenav__bar` rotate ±45°), текст «МЕНЮ». Кнопка «связаться» и hero-нав
  УБРАНЫ — справа только акцентная кнопка (всё в хедере). Текст ссылок в меню обрезан clamp,
  чтобы не вылезал.
- **Кнопка text-swap hover** (Osmo, без стрелки/доп.элементов): маска `.btn-label{overflow:hidden;
  line-height:1.25em}` + `.btn-label__text{text-shadow:0 1.25em currentColor; transition:transform .45s}`
  + `@media(hover){:hover .btn-label__text{translateY(-1.25em)}}`. В page.tsx все кнопки обёрнуты
  `<span class="btn-label"><span class="btn-label__text">…</span></span>`. Был баг — дубль текста торчал
  в покое (из-за паддинга кнопки-маски); исправлено выделенной однострочной маской.
- **Copy-email** (`CopyEmail.tsx` + `copy-email.css`, Osmo) в секции контактов.
- **Pixel-wave page transition** (`PageTransition.tsx` + `transition.css`, Osmo) в цвете **#EAFF00**.
- **Секция «Опыт»** переделана в настоящую сетку (`.xp-row`/`.xp-main`/`.xp-co`/`.xp-desc`/`.xp-role`/`.xp-date`):
  под названием компании — строка-описание. Месяцы добавлены к датам. Добавлен **Bankai Agency**
  (Ноябрь 2025 — наст.; role/description пока ПЛЕЙСХОЛДЕРЫ — подтвердить у пользователя).
  **Qimica** = «Ноябрь 2024 — Ноябрь 2025». Блок **«Стек» удалён**.
- **Новые секции с super.site**: «Поддержка и развитие дизайна» (lead + 6 проектов),
  «Образование», «Метаданные» (4 тоггла-`<details>`: Скиллы/Инструменты/Библиотека/Языки).
  Схема: `HomeContent.ts` получил группы `support`, `education[]`, `metadata[]`; `data.ts` Home-тип обновлён.

### Кейсы — наполнены ПОЛНОСТЬЮ (`src/seed/run.ts`)
- **Forte Bank**: обложка заменена на Figma-экспорт (node 40-203, metal-mesh «65%») —
  `assets/cases/forte-cover.jpg`, только изображение на обложке, весь текст под ней. 9 экранов.
- **CRM**: полный текст с https://dmitriy-li-litvinov.super.site/crm + 6 скриншотов, скачанных с super.so CDN:
  `assets/cases/crm/crm-{flow-1,flow-2,cards,debtor,import,reports}.png` (flow1/flow2 = imageBlock,
  остальные — в screen-блоках).
- **Docly**: полный текст + баннер `assets/cases/docly/docly-banner.png`.
- **Atmos**: на super.site сам по себе заглушка — только «Бизнес-задача» + «Мои задачи», без картинок.
  Сверстано verbatim. Пересид: `GET /seed`.

### Готово ещё в СЕССИИ 2 (всё проверено в браузере)
- **importMap** чинится роутом `GET /importmap` (генерит `generateImportMap` из `payload` внутри Next;
  CLI `payload generate:importmap` НЕ работает из-за tsx-резолва `@payload-config`).
- **Фаза C** — детальная `/cases/[slug]`: `RichText.tsx` (Lexical→React + блоки), хиро/мета/обложка,
  full-bleed «следующий кейс» по `order`. `case.css` заскоуплен `body{}`→`.case-page{}`.
- **Фаза E** — Live Preview: `RefreshOnSave.tsx` при `?preview=true`, draft через `getCaseBySlug(slug,true)`.
- **Фаза F** — ревалидация: оставлен `force-dynamic` (решение пользователя; ISR не внедряли).
- **Фаза D** — `/cv` и `/design-system` в группе `(standalone)` со своим root-layout (scoped `.cv-body`/`.ds-body`);
  design-system `robots:noindex,nofollow`.
- **Деплой-подготовка**: `next build` проходит (TS чистый; `GRAPHQL_OPTIONS`→`REST_OPTIONS` исправлено).
  `.gitignore` закрывает `.env*`/`portfolio.db`/`media/`. `/seed` и `/importmap` защищены `devGuard.ts`
  (в проде нужен `?secret=$SEED_SECRET`). favicon `src/app/icon.svg`.

Git: репо `portfolio-cms`, ветка main, БЕЗ remote. Сессия 3 ещё НЕ закоммичена.

### НАДО ПРОВЕРИТЬ / ДОДЕЛАТЬ
- **Theme-on-scroll в реальном браузере**: убедиться, что фон реально доезжает до белого на светлых
  секциях и текст флипается (в automation-вкладке транзишны тротлятся — `rgb(15,15,15)` на «Опыт»
  это, скорее всего, артефакт тротла, а не баг). При необходимости подстроить скорость `.5s`.
- **Bankai Agency** role + description в опыте — пока плейсхолдеры, спросить у пользователя.

### ОСТАЛОСЬ: выполнить деплой — Фаза G (нужен доступ пользователя)
Подход: схему Neon и медиа в Blob **сидим ЛОКАЛЬНО** (dev-режим postgres сам делает `push` схемы; ассеты лежат локально), Vercel только читает. Шаги:
1. **GitHub**: создать НОВЫЙ репозиторий (напр. `portfolio-cms`) — НЕ перетирать `capitalism13/portfolio` (там статика-референс). Отозвать засветившийся PAT, залогиниться `gh auth login`. Учесть конфликт GitHub-app между 2 тимами.
   `git add -A && git commit -m "..." && git remote add origin <url> && git push -u origin main`
2. **Neon**: Vercel → Storage → Postgres (Neon). Скопировать pooled `POSTGRES_URL`.
3. **Blob**: Vercel → Storage → Blob. Скопировать `BLOB_READ_WRITE_TOKEN`.
4. **Сид прода локально**: в `.env` временно задать `POSTGRES_URL` + `BLOB_READ_WRITE_TOKEN` (+ оставить PAYLOAD_SECRET), `pnpm dev`, открыть `/seed` (создаст схему в Neon через push, зальёт 13 картинок в Blob, упсертнёт 4 кейса/глобалы/админа). Затем вернуть `.env` на sqlite.
5. **Vercel проект**: импортировать репо в нужную тиму. Env: `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://<домен>`, `SEED_SECRET`; `POSTGRES_URL`/`BLOB_READ_WRITE_TOKEN` подтянутся из интеграций. Deploy.
6. **Проверка**: `/`, `/cases/forte-bank`, `/admin` (логин admin), Live Preview. Сменить пароль админа.

## Что строим
CMS для управления контентом портфолио-сайта. Менять можно всё из одной точки;
кейсы собираются как в Notion с превью 1:1. Стек выбран пользователем:
**Next.js + Payload CMS + Neon Postgres (Vercel) + Vercel Blob**. Объём — «всё сразу».
Логин админки: **admin / 358401vanya**.

## Каталоги
- `/Users/dmitriy/portfolio-site` — СТАРЫЙ статический сайт (HTML/CSS/JS). Это **референс дизайна** (откуда берём CSS/ассеты/контент). Запушен в GitHub `capitalism13/portfolio` (public).
- `/Users/dmitriy/portfolio-cms` — **НОВЫЙ проект** (Next 16 + Payload 3.85). Тут вся активная работа.
- cwd сессии — `/Users/dmitriy/GOAT_moving` (чужой проект, к нам не относится; его AGENTS.md про «кастомный Next» к portfolio-cms НЕ применяется — у нас обычный Next 16 из npm).

## Стек / версии (portfolio-cms)
- Next **16.2.7**, React 19, TypeScript, pnpm. Payload **3.85.0** (+ @payloadcms/next, db-sqlite, db-postgres, richtext-lexical, storage-vercel-blob, ui). `lenis` (smooth scroll). sharp 0.34.5.
- ВАЖНО: Payload 3.85 совместим с Next `15.4.x` или `>=16.2.6 <17`. Поэтому именно 16.2.7 (не 15.5!).
- Node v24, pnpm 10.33. Локального Postgres/Docker НЕТ → локально работаем на **SQLite**.

## Конфиги
- `src/payload.config.ts` — БД по env: если есть `POSTGRES_URL`/`DATABASE_URL` → postgres, иначе sqlite (`DATABASE_URI=file:./portfolio.db`). Vercel Blob включается, если есть `BLOB_READ_WRITE_TOKEN`. serverURL=NEXT_PUBLIC_SERVER_URL.
- `tsconfig.json` — добавлены `baseUrl: "."`, paths `@/*` и `@payload-config`.
- `next.config.ts` — обёрнут `withPayload`, images.remotePatterns для `*.public.blob.vercel-storage.com`.
- `.env` (gitignored): DATABASE_URI=file:./portfolio.db, PAYLOAD_SECRET=<сгенерён>, NEXT_PUBLIC_SERVER_URL=http://localhost:3001, SEED_ADMIN_LOGIN=admin, SEED_ADMIN_PASSWORD=358401vanya. Прод (закомментировано): POSTGRES_URL, BLOB_READ_WRITE_TOKEN.
- `package.json` dev = `next dev -p 3001`. ⚠️ скрипт `"seed"` ссылается на удалённый `./src/seed/index.ts` — НЕ рабочий; сид делается через роут (см. ниже).

## Схема Payload
- Globals: `src/globals/Contacts.ts` (telegram, instagram, cvUrl, email, availabilityStatus, avatarInitials — ЕДИНЫЙ источник контактов), `src/globals/HomeContent.ts` (hero{eyebrow,name,intro,introAccent,tickerPhrases[]}, about{lead,accentPhrase,stats[],approach[]}, experience[], stack[], contactsSection).
- Collections: `src/collections/Users.ts` (loginWithUsername=admin, без email), `Media.ts` (upload), `Cases.ts` (tabs «Карточка»/«Детальная»: title, slug, order, cover, cardDescription, tags[{label,isAccent}], eyebrow, overview, meta{role,date,tool,readingTime}, content=lexical с блоками; versions.drafts.autosave; admin.livePreview.url → `/cases/[slug]?preview=true`, breakpoints mobile/desktop).
- Блоки кейса: `src/blocks/index.ts` — processSteps, beforeAfter, screen, metrics, imageBlock (1:1 с классами `cases/case.css`).

## Сид (выполнен ✅)
- `src/seed/run.ts` — функция `seedData(payload)` (helpers для Lexical-узлов). 
- `src/app/seed/route.ts` — GET `/seed` запускает сид в рантайме Next (тут резолв модулей рабочий; `payload run`/tsx НЕ смог из-за `@payload-config` и extensionless-импортов).
- Засижено: админ-юзер (admin/358401vanya), Contacts, HomeContent (полный контент главной), 4 кейса (forte-bank, crm, atmos-fit, docly) с обложками (загружены из `portfolio-site/assets/cases/*.png`). Forte — с lexical-контентом и блоками (processSteps/beforeAfter/metrics). CRM/Atmos/Docly — карточки + минимальный контент.
- Повторный заход на `/seed` обновляет глобалы/админа, кейсы НЕ дублирует (есть гард).

## Публичный фронт — Фаза A+B (главная) ГОТОВА ✅
- CSS в `src/styles/`: `home.css` (=старый styles.css), `contact-widget.css`, `case.css` (для Фазы C). Видео `public/hero.mp4`.
- `src/lib/data.ts` — фетчеры: getContacts/getHome/getCases/getCaseBySlug/getNextCase, mediaUrl().
- Компоненты `src/components/site/`: SmoothScroll (ReactLenis), Ticker (бегущая строка), ContactWidget (читает Contacts; Telegram + CV карточки).
- `src/app/(frontend)/layout.tsx` — шрифты (Google Fonts Roboto Condensed/Mono), импорт CSS, SmoothScroll + ContactWidget (на всех frontend-страницах).
- `src/app/(frontend)/page.tsx` — ГЛАВНАЯ: hero(видео,нав,eyebrow,name,intro+accent,ticker) + кейсы + обо мне + опыт/стек + контакты — всё из CMS. Проверено: `GET /` → 200, контент и медиа рендерятся.

## Что РАБОТАЕТ сейчас
- Dev на **http://localhost:3005**. `/admin` → логин admin/358401vanya. `/` → главная из CMS. `/api/...` REST. `/seed` → пересид. `/importmap` → регенерация importMap.

## ОСТАЛОСЬ (по порядку)
1. **Фаза G — Деплой** (единственное крупное; нужен доступ пользователя — см. блок «ОСТАЛОСЬ: выполнить деплой» вверху).
2. **Проверить theme-on-scroll** в реальном браузере (не automation-вкладке) и при необходимости подстроить скорость.
3. **Bankai Agency** role/description — уточнить у пользователя (сейчас плейсхолдеры).
(Фазы A–F, importMap, контент кейсов, новые секции — ВЫПОЛНЕНЫ, см. STATUS вверху.)

## Известные нюансы / подводные камни
- **Скриншоты главной через Claude-in-Chrome висят** на `document_idle` (автоплей-видео + Lenis rAF). Для визуальной проверки: либо Claude Preview (preview_start "cms" падает, т.к. 3001 уже занят запущенным dev — нужно остановить dev и дать preview поднять его, или autoPort), либо curl для проверки контента.
- `payload run` и tsx строго требуют расширения/не резолвят `@payload-config` — поэтому сид через Next-роут.
- GitHub PAT юзера был прислан в чат (ghp_…) — рекомендовано отозвать/пересоздать. CMS в репо ЕЩЁ не пушили (это отдельный проект portfolio-cms).
- launch.json (`GOAT_moving/.claude/launch.json`) содержит: goat-moving(3000, автостартит GOAT и периодически перехватывает 3000), portfolio(5050, старая статика), cms(3001).

## Как запустить / проверить
```
cd /Users/dmitriy/portfolio-cms
set -a; . ./.env; set +a
pnpm dev            # http://localhost:3005  (админка /admin, сайт /)
# первый сид (если БД пустая): открыть http://localhost:3005/seed
# регенерация importMap при изменении блоков/полей: http://localhost:3005/importmap
```
