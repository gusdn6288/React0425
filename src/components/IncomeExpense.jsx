import React, { useEffect, useState } from 'react'
import css from './IncomeExpense.module.css'

const IncomeExpense = () => {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  const calculateTotals = () => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const transactions = JSON.parse(saved)

      const incomeTotal = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, item) => sum + Number(item.amount), 0)

      const expenseTotal = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, item) => sum + Number(item.amount), 0)

      setIncome(incomeTotal)
      setExpense(expenseTotal)
    }
  }

  useEffect(() => {
    // 초기 계산
    calculateTotals()

    // 커스텀 이벤트 수신
    const handleUpdate = () => {
      calculateTotals()
    }

    window.addEventListener('transactionsUpdated', handleUpdate)

    return () => {
      window.removeEventListener('transactionsUpdated', handleUpdate)
    }
  }, [])

  return (
    <div className={css.container}>
      <div className={css.section}>
        <strong>수입</strong>
        <div className={css.income}>₩{income.toLocaleString()}</div>
      </div>
      <div className={css.separator} />
      <div className={css.section}>
        <strong>지출</strong>
        <div className={css.expense}>₩{expense.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default IncomeExpense
