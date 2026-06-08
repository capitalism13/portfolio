'use client'

import { useEffect, useRef } from 'react'

// -----------------------------------------
// COPY EMAIL TO CLIPBOARD (Osmo Supply)
// -----------------------------------------

export default function CopyEmail({ email, eyebrow = 'Почта:' }: { email?: string; eyebrow?: string }) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const copyEmail = () => {
      const value =
        button.getAttribute('data-copy-email') ||
        button.querySelector('[data-copy-email-element]')?.textContent?.trim()
      if (value && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
          button.setAttribute('data-copy-button', 'copied')
          button.setAttribute('aria-label', 'Почта скопирована!')
        })
      }
    }

    const handleInteraction = (e: Event) => {
      const ke = e as KeyboardEvent
      if (e.type === 'click' || (e.type === 'keydown' && (ke.key === 'Enter' || ke.key === ' '))) {
        e.preventDefault()
        copyEmail()
      }
    }

    const onLeave = () => {
      button.removeAttribute('data-copy-button')
      button.blur()
      button.setAttribute('aria-label', 'Скопировать почту')
    }
    const onBlur = () => {
      button.removeAttribute('data-copy-button')
      button.setAttribute('aria-label', 'Скопировать почту')
    }

    button.addEventListener('click', handleInteraction)
    button.addEventListener('keydown', handleInteraction)
    button.addEventListener('mouseleave', onLeave)
    button.addEventListener('blur', onBlur)

    return () => {
      button.removeEventListener('click', handleInteraction)
      button.removeEventListener('keydown', handleInteraction)
      button.removeEventListener('mouseleave', onLeave)
      button.removeEventListener('blur', onBlur)
    }
  }, [])

  if (!email) return null

  return (
    <div className="copy-email-wrapper">
      <p className="copy-email-eyebrow">{eyebrow}</p>
      <button
        ref={ref}
        type="button"
        aria-label="Скопировать почту"
        data-copy-button
        data-copy-email={email}
        className="copy-email-button"
      >
        <div className="copy-email-icon__wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 2H8V5H16V2Z"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 3H17.5L19 4.5V19.5L17.5 21H6.5L5 19.5V4.5L6.5 3H8"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="copy-email-text__wrap">
          <span data-copy-email-element className="copy-email-text__el">
            {email}
          </span>
          <span className="copy-email-text__el">Нажми, чтобы скопировать</span>
          <span className="copy-email-text__el">Скопировано!</span>
        </div>
      </button>
    </div>
  )
}
