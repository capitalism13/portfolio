'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

// -----------------------------------------
// PIXELATED WAVE PAGE TRANSITION (Osmo Supply)
// Adapted for Next.js App Router: fires on real navigation
// (cover-on-click → reveal-on-load) instead of Barba.js.
// -----------------------------------------

const pixelHorizontalAmount = 12
const transitionDuration = 0.6
const pixelFadeDuration = 0.18

// Helper: Create the PixelGrid (verbatim from the resource)
function pixelGrid(isPortrait: boolean) {
  const panel = document.querySelector<HTMLElement>('[data-transition-panel]')
  if (!panel) return

  const rect = panel.getBoundingClientRect()
  panel.style.flexDirection = isPortrait ? 'column' : 'row'

  const lineSizePx = isPortrait
    ? rect.height / pixelHorizontalAmount
    : rect.width / pixelHorizontalAmount
  const crossAmount = Math.ceil((isPortrait ? rect.width : rect.height) / lineSizePx)

  let lines = panel.querySelectorAll<HTMLElement>('[data-transition-col]')
  const lineTemplate = lines[0]
  const pixelTemplate = lineTemplate.querySelector('[data-transition-pixel]')!

  if (lines.length !== pixelHorizontalAmount) {
    const frag = document.createDocumentFragment()
    for (let i = 0; i < pixelHorizontalAmount; i++) {
      frag.appendChild(lineTemplate.cloneNode(false))
    }
    panel.replaceChildren(frag)
    lines = panel.querySelectorAll<HTMLElement>('[data-transition-col]')
  }

  lines.forEach((line) => {
    line.style.flexDirection = isPortrait ? 'row' : 'column'
    line.style.flex = '1 1 auto'
    line.style.justifyContent = 'center'

    const diff = crossAmount - line.childElementCount

    if (diff > 0) {
      const frag = document.createDocumentFragment()
      for (let i = 0; i < diff; i++) {
        frag.appendChild(pixelTemplate.cloneNode(true))
      }
      line.appendChild(frag)
    } else if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        line.lastElementChild!.remove()
      }
    }
  })
}

function getParts() {
  const panel = document.querySelector<HTMLElement>('[data-transition-panel]')
  if (!panel) return null
  const lines = Array.from(panel.querySelectorAll<HTMLElement>('[data-transition-col]'))
  const allPixels = panel.querySelectorAll('[data-transition-pixel]')
  return { panel, lines, allPixels }
}

// Pixels wave IN column-by-column and stay → screen fills (cover)
function playCover(): Promise<void> {
  return new Promise((resolve) => {
    const isPortrait = window.innerHeight > window.innerWidth
    pixelGrid(isPortrait)
    const parts = getParts()
    if (!parts) return resolve()
    const { panel, lines, allPixels } = parts

    gsap.set(allPixels, { opacity: 0, willChange: 'opacity' })
    gsap.set(panel, { opacity: 1, backgroundColor: 'transparent' })

    const stepDur = transitionDuration / Math.max(1, lines.length)
    const tl = gsap.timeline({ onComplete: () => resolve() })

    lines.forEach((line, i) => {
      const pixels = Array.from(line.querySelectorAll('[data-transition-pixel]'))
      if (!pixels.length) return
      tl.to(
        pixels,
        {
          opacity: 1,
          duration: pixelFadeDuration,
          ease: 'none',
          stagger: { amount: pixelFadeDuration, from: 'random' },
        },
        i * stepDur,
      )
    })
  })
}

// Pixels wave OUT column-by-column → screen reveals (enter)
function playReveal() {
  const isPortrait = window.innerHeight > window.innerWidth
  pixelGrid(isPortrait)
  const parts = getParts()
  if (!parts) return
  const { panel, lines, allPixels } = parts

  gsap.set(allPixels, { opacity: 1, willChange: 'opacity' })
  gsap.set(panel, { opacity: 1, backgroundColor: 'transparent' })
  document.documentElement.classList.remove('px-pre')

  const stepDur = transitionDuration / Math.max(1, lines.length)

  // Safety net: never leave the page stuck under the overlay (e.g. if the tab
  // is backgrounded mid-transition and rAF/GSAP throttles).
  const safety = window.setTimeout(
    () => {
      gsap.set(panel, { opacity: 0, clearProps: 'willChange' })
      gsap.set(allPixels, { opacity: 0, clearProps: 'willChange' })
    },
    (transitionDuration + pixelFadeDuration) * 1000 + 400,
  )

  const tl = gsap.timeline({
    onComplete: () => {
      window.clearTimeout(safety)
      gsap.set(panel, { opacity: 0, clearProps: 'willChange' })
      gsap.set(allPixels, { clearProps: 'willChange' })
    },
  })

  lines.forEach((line, i) => {
    const pixels = Array.from(line.querySelectorAll('[data-transition-pixel]'))
    if (!pixels.length) return
    tl.to(
      pixels,
      {
        opacity: 0,
        duration: pixelFadeDuration,
        ease: 'none',
        stagger: { amount: pixelFadeDuration, from: 'random' },
      },
      i * stepDur,
    )
  })
}

function hideOverlay() {
  const panel = document.querySelector<HTMLElement>('[data-transition-panel]')
  document.documentElement.classList.remove('px-pre')
  if (panel) gsap.set(panel, { opacity: 0 })
}

const FLAG = 'px-transition'

export default function PageTransition() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ENTER: arriving via a transition → reveal; otherwise ensure hidden
    let arrived = false
    try {
      arrived = sessionStorage.getItem(FLAG) === '1'
      if (arrived) sessionStorage.removeItem(FLAG)
    } catch {}

    if (arrived && !reducedMotion) playReveal()
    else hideOverlay()

    if (reducedMotion) return

    // LEAVE: intercept internal navigations
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      if (a.target === '_blank' || a.hasAttribute('download')) return

      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // in-page hash on the same path → let the browser scroll
      if (url.pathname === window.location.pathname && url.hash) return
      if (url.href === window.location.href) return

      e.preventDefault()
      try {
        sessionStorage.setItem(FLAG, '1')
      } catch {}
      // Safety: never trap the user if something stalls
      const fallback = window.setTimeout(() => {
        window.location.href = url.href
      }, 1500)
      playCover().then(() => {
        window.clearTimeout(fallback)
        window.location.href = url.href
      })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
