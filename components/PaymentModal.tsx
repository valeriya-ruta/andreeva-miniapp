'use client'

import { useEffect } from 'react'
import styles from './PaymentModal.module.css'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  price: string
}

export default function PaymentModal({
  isOpen,
  onClose,
  price,
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
          <button className={styles.paymentButton}>
            Ця кнопка веде на оплату
          </button>
        </div>
      </div>
    </div>
  )
}
