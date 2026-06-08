import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/styles/tokens.css'
import '@/styles/home.css'
import '@/styles/contact-widget.css'
import '@/styles/transition.css'
import '@/styles/sidenav.css'
import '@/styles/copy-email.css'
import 'lenis/dist/lenis.css'

import SmoothScroll from '@/components/site/SmoothScroll'
import ContactWidget from '@/components/site/ContactWidget'
import PageTransition from '@/components/site/PageTransition'
import SideNav from '@/components/site/SideNav'
import { getContacts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Дмитрий Ли-Литвинов — продуктовый дизайнер',
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const contacts = await getContacts()
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Anti-flash: instantly cover the screen on transition arrivals, before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('px-transition')==='1'){document.documentElement.classList.add('px-pre')}}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&family=Roboto+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div data-transition-wrap className="transition">
          <div data-transition-panel className="transition__panel">
            <div data-transition-col className="transition__col">
              <div data-transition-pixel className="transition__pixel" />
            </div>
          </div>
        </div>
        <PageTransition />
        <SideNav contacts={contacts} />
        <SmoothScroll>{children}</SmoothScroll>
        <ContactWidget contacts={contacts} />
      </body>
    </html>
  )
}
