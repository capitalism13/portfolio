'use client'

import { useEffect, useState } from 'react'

export default function Ticker({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (phrases.length < 2) return
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setI((p) => (p + 1) % phrases.length)
        setVisible(true)
      }, 350)
    }, 2600)
    return () => clearInterval(id)
  }, [phrases.length])

  if (!phrases.length) return null

  return (
    <span className="ticker">
      <span className="tick-pre">//</span>{' '}
      <span className="tick" style={{ opacity: visible ? 1 : 0 }}>
        {phrases[i]}
      </span>
    </span>
  )
}
