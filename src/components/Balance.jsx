import React, { useEffect, useState } from 'react'
import css from './Balance.module.css'

const Balance = () => {
  const [balance, setBalance] = useState(0)

  const calculateBalance = () => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const transactions = JSON.parse(saved)
      const total = transactions.reduce((sum, item) => {
        const amount = Number(item.amount)
        return item.type === 'income' ? sum + amount : sum - amount
      }, 0)
      setBalance(total)
    }
  }

  useEffect(() => {
    calculateBalance()

    const handleUpdate = () => {
      calculateBalance()
    }

    window.addEventListener('transactionsUpdated', handleUpdate)
    return () => {
      window.removeEventListener('transactionsUpdated', handleUpdate)
    }
  }, [])

  return (
    <div className={css.container}>
      <strong className={css.label}>잔액</strong>
      <div className={`${css.amount} ${balance >= 0 ? css.positive : css.negative}`}>
        ₩ {balance.toLocaleString()}
      </div>
    </div>
  )
}

export default Balance
