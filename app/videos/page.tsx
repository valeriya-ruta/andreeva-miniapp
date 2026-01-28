'use client'

import { useState, useMemo } from 'react'
import BottomNav from '@/components/BottomNav'
import VideoCard from '@/components/VideoCard'
import PaymentModal from '@/components/PaymentModal'
import { usePurchasedVideos } from '@/hooks/usePurchasedVideos'
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
  const [selectedVideo, setSelectedVideo] = useState<{
    id: number
    price: string
  } | null>(null)
  const { purchaseVideo, isPurchased, purchasedVideos, resetPurchases } = usePurchasedVideos()

  // Transform videos based on purchased status
  const displayVideos = useMemo(() => {
    return videos.map((video) => {
      // If video was originally priced but is now purchased, change to watch type
      if (video.type === 'price' && purchasedVideos.has(video.id)) {
        return {
          ...video,
          type: 'watch' as const,
        }
      }
      return video
    })
  }, [purchasedVideos])

  const handlePriceClick = (videoId: number, price: string) => {
    setSelectedVideo({ id: videoId, price })
    setShowModal(true)
  }

  const handlePaymentComplete = (videoId: number) => {
    purchaseVideo(videoId)
    setSelectedVideo(null)
  }

  return (
    <main className={styles.videosPage}>
      <div className={styles.header}>
        <h1>Відео</h1>
      </div>
      <div className={styles.videosList}>
        {displayVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPriceClick={(price) => handlePriceClick(video.id, price)}
          />
        ))}
      </div>
      <div className={styles.resetContainer}>
        <button className={styles.resetButton} onClick={resetPurchases}>
          скинути оплати
        </button>
      </div>
      <PaymentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedVideo(null)
        }}
        price={selectedVideo?.price || ''}
        videoId={selectedVideo?.id || 0}
        onPaymentComplete={handlePaymentComplete}
      />
      <BottomNav />
    </main>
  )
}
