'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'purchased_videos'

export function usePurchasedVideos() {
  const [purchasedVideos, setPurchasedVideos] = useState<Set<number>>(new Set())

  // Load purchased videos from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const videoIds = JSON.parse(stored) as number[]
          setPurchasedVideos(new Set(videoIds))
        } catch (error) {
          console.error('Error loading purchased videos:', error)
        }
      }
    }
  }, [])

  // Save purchased video to localStorage
  const purchaseVideo = (videoId: number) => {
    setPurchasedVideos((prev) => {
      const newPurchased = new Set(prev)
      newPurchased.add(videoId)

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newPurchased)))
      }

      return newPurchased
    })
  }

  // Check if video is purchased
  const isPurchased = (videoId: number) => {
    return purchasedVideos.has(videoId)
  }

  // Reset all purchases
  const resetPurchases = () => {
    setPurchasedVideos(new Set())
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return { purchaseVideo, isPurchased, purchasedVideos, resetPurchases }
}
