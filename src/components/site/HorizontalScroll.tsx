'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

// -----------------------------------------
// HORIZONTAL SCROLLING SECTIONS (Osmo Supply)
// Adapted for Next.js: wired to the existing Lenis smooth-scroll.
// -----------------------------------------

export default function HorizontalScroll() {
  // Keep ScrollTrigger in sync with Lenis
  useLenis(() => ScrollTrigger.update())

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isMobile: '(max-width:479px)',
        isMobileLandscape: '(max-width:767px)',
        isTablet: '(max-width:991px)',
        isDesktop: '(min-width:992px)',
      },
      (context) => {
        const c = context.conditions as {
          isMobile: boolean
          isMobileLandscape: boolean
          isTablet: boolean
        }

        const ctx = gsap.context(() => {
          const wrappers = document.querySelectorAll<HTMLElement>('[data-horizontal-scroll-wrap]')
          if (!wrappers.length) return

          wrappers.forEach((wrap) => {
            const disable = wrap.getAttribute('data-horizontal-scroll-disable')
            if (
              (disable === 'mobile' && c.isMobile) ||
              (disable === 'mobileLandscape' && c.isMobileLandscape) ||
              (disable === 'tablet' && c.isTablet)
            ) {
              return // skip this wrapper on specified breakpoint
            }

            const panels = gsap.utils.toArray<HTMLElement>('[data-horizontal-scroll-panel]', wrap)
            if (panels.length < 2) return

            gsap.to(panels, {
              x: () => -(wrap.scrollWidth - window.innerWidth),
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: () => '+=' + (wrap.scrollWidth - window.innerWidth),
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
              },
            })
          })
        })

        return () => ctx.revert()
      },
    )

    // Refresh once images/layout have settled
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      window.clearTimeout(t)
      mm.revert()
    }
  }, [])

  return null
}
