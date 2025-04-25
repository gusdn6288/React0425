import React, { useEffect, useState } from 'react'
import TransactionList from './TransactionList'

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

    // 🔔 삭제 후에도 커스텀 이벤트 발생
    window.dispatchEvent(new Event('transactionsUpdated'))
  }

  return (
    <div>
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  )
}

export default List
