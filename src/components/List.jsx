import React, { useEffect, useState } from 'react'
import TransactionList from './TransactionList'
import css from './List.module.css' // ✅ 스타일 파일 임포트 (선택)

const List = () => {
  const [transactions, setTransactions] = useState([])

  const loadTransactions = () => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const parsed = JSON.parse(saved).map(item => ({
        ...item,
        amount: Number(item.amount) || 0,
      }))
      setTransactions(parsed)
    }
  }

  useEffect(() => {
    loadTransactions()

    const handleUpdate = () => {
      loadTransactions()
    }

    window.addEventListener('transactionsUpdated', handleUpdate)
    return () => {
      window.removeEventListener('transactionsUpdated', handleUpdate)
    }
  }, [])

  const handleDelete = id => {
    const filtered = transactions.filter(item => item.id !== id)
    setTransactions(filtered)
    localStorage.setItem('transactions', JSON.stringify(filtered))
    window.dispatchEvent(new Event('transactionsUpdated'))
  }

  return (
    <div className={transactions.length === 0 ? css.wrapper : ''}>
      {transactions.length === 0 ? (
        <div className={css.empty}>
          <span>💬</span>
          <span>내역이 없습니다</span>
        </div>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default List
