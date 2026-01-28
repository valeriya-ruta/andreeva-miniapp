'use client'

import { useRouter } from 'next/navigation'
import styles from './VideoCard.module.css'

interface VideoCardProps {
  video: {
    id: number
    title: string
    description: string
    type: 'watch' | 'price'
    price?: string
  }
  onPriceClick: (videoId: number, price: string) => void
}

export default function VideoCard({ video, onPriceClick }: VideoCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (video.type === 'price' && video.price) {
      onPriceClick(video.id, video.price)
    } else {
      router.push(`/videos/${video.id}`)
    }
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.description}>{video.description}</p>
      </div>
      <div className={styles.action}>
        {video.type === 'price' ? (
          <span className={styles.price}>{video.price}</span>
        ) : (
          <span className={styles.watch}>Дивитися</span>
        )}
      </div>
    </div>
  )
}
