'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import VideoCard from '@/components/VideoCard'
import PaymentModal from '@/components/PaymentModal'
import styles from './videos.module.css'

const videos = [
  {
    id: 1,
    title: 'Вступний урок',
    description: 'Ознайомлення з платформою та основними функціями',
    type: 'watch' as const,
  },
  {
    id: 2,
    title: 'Продвинутий курс',
    description: 'Глибоке занурення в тему для досвідчених користувачів',
    type: 'price' as const,
    price: '299 грн',
  },
  {
    id: 3,
    title: 'Базовий туторіал',
    description: 'Покроковий гайд для початківців',
    type: 'watch' as const,
  },
  {
    id: 4,
    title: 'Преміум контент',
    description: 'Ексклюзивні матеріали та інсайти',
    type: 'price' as const,
    price: '499 грн',
  },
  {
    id: 5,
    title: 'Безкоштовний урок',
    description: 'Спробуйте наш контент безкоштовно',
    type: 'watch' as const,
  },
]

export default function VideosPage() {
  const [showModal, setShowModal] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<string>('')

  const handlePriceClick = (price: string) => {
    setSelectedPrice(price)
    setShowModal(true)
  }

  return (
    <main className={styles.videosPage}>
      <div className={styles.header}>
        <h1>Відео</h1>
      </div>
      <div className={styles.videosList}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPriceClick={handlePriceClick}
          />
        ))}
      </div>
      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        price={selectedPrice}
      />
      <BottomNav />
    </main>
  )
}
