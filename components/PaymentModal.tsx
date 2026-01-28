'use client'

import { useEffect } from 'react'
import styles from './PaymentModal.module.css'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  price: string
  videoId: number
  onPaymentComplete: (videoId: number) => void
}

export default function PaymentModal({
  isOpen,
  onClose,
  price,
  videoId,
  onPaymentComplete,
}: PaymentModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handlePaymentClick = () => {
    // Simulate payment completion
    onPaymentComplete(videoId)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Оплата</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.priceText}>Ціна: {price}</p>
          <button className={styles.paymentButton} onClick={handlePaymentClick}>
            Ця кнопка веде на оплату
          </button>
        </div>
      </div>
    </div>
  )
}
