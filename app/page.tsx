'use client'

import { useTelegram } from '@/hooks/useTelegram'
import BottomNav from '@/components/BottomNav'
import styles from './dashboard.module.css'

export default function Home() {
  const { username } = useTelegram()

  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Привіт, {username || 'користувач'}</h1>
      </div>
      <div className={styles.dashboardContent}>
        <p>Ласкаво просимо до демо платформи контенту!</p>
      </div>
      <BottomNav />
    </main>
  )
}
