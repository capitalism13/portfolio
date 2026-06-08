'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import type { Contacts } from '@/lib/data'

gsap.registerPlugin(CustomEase)
CustomEase.create('sidenavMain', '0.65, 0.01, 0.05, 0.99')

type NavLink = { heading: string; eyebrow: string; href: string }

const LINKS: NavLink[] = [
  { heading: 'Обо мне', eyebrow: '01', href: '/#about' },
  { heading: 'Кейсы', eyebrow: '02', href: '/#cases' },
  { heading: 'Контакты', eyebrow: '03', href: '/#contacts' },
  { heading: 'CV', eyebrow: '04', href: '/cv' },
]

export default function SideNav({ contacts }: { contacts: Contacts }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const navWrap = root.querySelector<HTMLElement>('[data-sidenav-wrap]')
    if (!navWrap) return
    const overlay = navWrap.querySelector('[data-sidenav-overlay]')
    const menu = navWrap.querySelector('[data-sidenav-menu]')
    const bgPanels = navWrap.querySelectorAll('[data-sidenav-panel]')
    const menuToggles = root.querySelectorAll('[data-sidenav-toggle]')
    const menuLinks = navWrap.querySelectorAll('[data-sidenav-link]')
    const fadeTargets = navWrap.querySelectorAll('[data-sidenav-fade]')
    const menuButton = root.querySelector('[data-sidenav-button]')

    const tl = gsap.timeline({ defaults: { ease: 'sidenavMain', duration: 0.7 } })

    const openNav = () => {
      navWrap.setAttribute('data-nav-state', 'open')
      menuButton?.classList.add('is-open') // CSS morphs the two bars → X
      tl.clear()
        .set(navWrap, { display: 'block' })
        .set(menu, { xPercent: 0 }, '<')
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
        .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
        .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')
        .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, '<+=0.2')
    }

    const closeNav = () => {
      navWrap.setAttribute('data-nav-state', 'closed')
      menuButton?.classList.remove('is-open')
      tl.clear()
        .to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 120 }, '<')
        .set(navWrap, { display: 'none' })
    }

    const onToggle = () => {
      const state = navWrap.getAttribute('data-nav-state')
      if (state === 'open') closeNav()
      else openNav()
    }

    const toggleHandlers: Array<() => void> = []
    menuToggles.forEach((toggle) => {
      const h = () => onToggle()
      toggle.addEventListener('click', h)
      toggleHandlers.push(() => toggle.removeEventListener('click', h))
    })

    // Close the menu when a navigation link is clicked
    const linkHandlers: Array<() => void> = []
    menuLinks.forEach((link) => {
      const h = () => {
        if (navWrap.getAttribute('data-nav-state') === 'open') closeNav()
      }
      link.addEventListener('click', h)
      linkHandlers.push(() => link.removeEventListener('click', h))
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navWrap.getAttribute('data-nav-state') === 'open') closeNav()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      toggleHandlers.forEach((fn) => fn())
      linkHandlers.forEach((fn) => fn())
      document.removeEventListener('keydown', onKey)
      tl.kill()
    }
  }, [])

  return (
    <div className="sidenav" ref={rootRef}>
      <header className="sidenav__header">
        <button
          type="button"
          data-sidenav-toggle
          data-sidenav-button
          aria-label="Открыть меню"
          className="sidenav__button"
        >
          <span className="sidenav__button-label">Меню</span>
          <div data-sidenav-icon className="sidenav__button-icon">
            <span data-sidenav-bar className="sidenav__bar" />
            <span data-sidenav-bar className="sidenav__bar" />
          </div>
        </button>
      </header>
      <div data-sidenav-wrap data-nav-state="closed" className="sidenav__nav">
        <div data-sidenav-overlay data-sidenav-toggle className="sidenav__overlay" />
        <nav data-sidenav-menu className="sidenav__menu">
          <div className="sidenav__menu-bg">
            <div data-sidenav-panel className="sidenav__menu-bg-panel is--first" />
            <div data-sidenav-panel className="sidenav__menu-bg-panel is--second" />
            <div data-sidenav-panel className="sidenav__menu-bg-panel" />
          </div>
          <div className="sidenav__menu-inner">
            <ul className="sidenav__menu-list">
              {LINKS.map((l) => (
                <li className="sidenav__menu-list-item" key={l.eyebrow}>
                  <a data-sidenav-link href={l.href} className="sidenav__menu-link">
                    <p className="sidenav__menu-link-heading">{l.heading}</p>
                    <p className="sidenav__menu-link-eyebrow">{l.eyebrow}</p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="sidenav__menu-details">
              <p data-sidenav-fade className="sidenav__button-label">
                Соцсети
              </p>
              <div className="sidenav__menu-socials">
                {contacts.telegram ? (
                  <a data-sidenav-fade href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="sidenav__button-label">
                    Telegram
                  </a>
                ) : null}
                {contacts.instagram ? (
                  <a data-sidenav-fade href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="sidenav__button-label">
                    Instagram
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
