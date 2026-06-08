'use client'

import { useEffect } from 'react'

// Switches the page theme (html[data-theme]) to match whichever
// [data-theme] section currently crosses the vertical center of the viewport.
// The background + section text transition smoothly via CSS.
export default function ThemeOnScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme]'))
    if (!sections.length) return

    const apply = (theme: string) => {
      if (document.documentElement.getAttribute('data-theme') !== theme) {
        document.documentElement.setAttribute('data-theme', theme)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) apply(e.target.getAttribute('data-theme') || 'dark')
        })
      },
      // A 0px-tall band at the vertical center of the viewport
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return null
}
