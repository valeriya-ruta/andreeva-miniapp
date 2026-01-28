'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
        }
        ready: () => void
        expand: () => void
        close: () => void
      }
    }
  }
}

export function useTelegram() {
  const [username, setUsername] = useState<string>('')

  const updateUsername = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()

      const user = tg.initDataUnsafe?.user
      if (user?.username) {
        setUsername(`@${user.username}`)
      } else if (user?.first_name) {
        setUsername(user.first_name)
      }
    }
  }

  useEffect(() => {
    // Try to get username immediately
    updateUsername()

    // Wait for Telegram SDK to load if not available yet
    let checkInterval: NodeJS.Timeout | null = null
    if (typeof window !== 'undefined' && !window.Telegram?.WebApp) {
      checkInterval = setInterval(() => {
        if (window.Telegram?.WebApp) {
          updateUsername()
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
        }
      }, 100)

      // Clear after 5 seconds if still not loaded
      setTimeout(() => {
        if (checkInterval) {
          clearInterval(checkInterval)
        }
      }, 5000)
    }

    // Update on every entry/exit
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateUsername()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { username }
}
