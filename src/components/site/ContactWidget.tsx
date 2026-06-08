'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Contacts } from '@/lib/data'

const Envelope = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3v5h5" />
    <path d="M7 3h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M9 13h6M9 17h6" />
  </svg>
)

export default function ContactWidget({ contacts }: { contacts: Contacts }) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)

  const open = useCallback(() => {
    setMounted(true)
    requestAnimationFrame(() => setShown(true))
  }, [])
  const close = useCallback(() => {
    setShown(false)
    setTimeout(() => setMounted(false), 320)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <>
      <button className="cw-trigger" type="button" aria-label="Связаться" onClick={open}>
        <Envelope />
      </button>

      <div
        className={`cw-overlay${shown ? ' cw-show' : ''}`}
        hidden={!mounted}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="cw-panel" role="dialog" aria-modal="true" aria-label="Контакты">
          <button className="cw-close" type="button" aria-label="Закрыть" onClick={close}>
            ✕
          </button>
          <div className="cw-head">
            <div className="cw-avatar">{contacts.avatarInitials || 'ДЛ'}</div>
            <div className="cw-hello">
              Привет,
              <br />
              поговорим?
            </div>
          </div>
          <div className="cw-cards">
            <a className="cw-card" href={contacts.telegram || '#'} target="_blank" rel="noopener noreferrer">
              <Envelope />
              <span className="cw-card-t">
                Написать
                <br />в Telegram
              </span>
            </a>
            <a className="cw-card" href={contacts.cvUrl || '/cv'}>
              <FileIcon />
              <span className="cw-card-t">
                Открыть
                <br />
                CV
              </span>
            </a>
          </div>
          <div className="cw-status">
            <span className="cw-dot" />
            {contacts.availabilityStatus || 'Открыт к работе и проектам'}
          </div>
        </div>
      </div>
    </>
  )
}
