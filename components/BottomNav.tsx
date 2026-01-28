'use client'

import { usePathname, useRouter } from 'next/navigation'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'Головна', icon: '🏠' },
    { path: '/videos', label: 'Відео', icon: '🎥' },
    { path: '/account', label: 'Акаунт', icon: '👤' },
    { path: '/calendar', label: 'Календар', icon: '📅' },
  ]

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`${styles.navItem} ${
            pathname === item.path ? styles.active : ''
          }`}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
