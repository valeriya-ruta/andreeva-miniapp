'use client'

import BottomNav from '@/components/BottomNav'
import styles from './account.module.css'

export default function AccountPage() {
  return (
    <main className={styles.accountPage}>
      <div className={styles.header}>
        <h1>Акаунт</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.placeholderText}>тут будуть деталі аккаунту</p>
      </div>
      <BottomNav />
    </main>
  )
}
