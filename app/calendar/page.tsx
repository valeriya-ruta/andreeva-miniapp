'use client'

import BottomNav from '@/components/BottomNav'
import styles from './calendar.module.css'

export default function CalendarPage() {
  return (
    <main className={styles.calendarPage}>
      <div className={styles.header}>
        <h1>Календар</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.placeholderText}>тут буде календар заходів</p>
      </div>
      <BottomNav />
    </main>
  )
}
