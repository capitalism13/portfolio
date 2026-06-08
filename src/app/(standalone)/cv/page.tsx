import type { Metadata } from 'next'
import '@/styles/cv.css'

export const metadata: Metadata = {
  title: 'CV · Дмитрий Ли-Литвинов',
}

export default function CvPage() {
  return (
    <div className="cv-body">
      <a className="back" href="/">
        ← на главную
      </a>
      <main>
        <h1>CV</h1>
        <p>Резюме скоро появится</p>
      </main>
    </div>
  )
}
