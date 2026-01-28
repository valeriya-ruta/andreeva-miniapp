'use client'

import { useParams, useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import styles from './video-detail.module.css'

const videoData: Record<string, { title: string; description: string }> = {
  '1': {
    title: 'Вступний урок',
    description: 'Ознайомлення з платформою та основними функціями',
  },
  '2': {
    title: 'Продвинутий курс',
    description: 'Глибоке занурення в тему для досвідчених користувачів',
  },
  '3': {
    title: 'Базовий туторіал',
    description: 'Покроковий гайд для початківців',
  },
  '4': {
    title: 'Преміум контент',
    description: 'Ексклюзивні матеріали та інсайти',
  },
  '5': {
    title: 'Безкоштовний урок',
    description: 'Спробуйте наш контент безкоштовно',
  },
}

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params.id as string
  const video = videoData[videoId] || {
    title: 'Відео',
    description: 'Опис відео',
  }

  return (
    <main className={styles.videoDetailPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          ← Назад
        </button>
        <h1>{video.title}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.videoPlaceholder}>
          <span className={styles.placeholderText}>🎥</span>
          <p>Плейсхолдер для відео</p>
        </div>
        <div className={styles.description}>
          <h2>Опис</h2>
          <p>{video.description}</p>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
