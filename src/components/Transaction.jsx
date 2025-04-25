import React, { useState, useEffect } from 'react'
import css from './Transaction.module.css'

const Transaction = () => {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('income')
  const [, setTransactions] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const parsed = JSON.parse(saved).map(item => ({
        ...item,
        amount: Number(item.amount) || 0,
      }))
      setTransactions(parsed)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const parsedAmount = Number(amount)
    // ❗ 입력 안 했을 때 alert로 경고
    if (!text.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    if (!amount.trim()) {
      alert('금액을 입력해주세요.')
      return
    }

    if (isNaN(parsedAmount)) {
      alert('금액은 숫자로 입력해주세요.')
      return
    }

    const saved = localStorage.getItem('transactions')
    const currentTransactions = saved ? JSON.parse(saved) : []

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parsedAmount,
      type,
    }

    const updatedTransactions = [newTransaction, ...currentTransactions]
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    window.dispatchEvent(new Event('transactionsUpdated'))

    setText('')
    setAmount('')
  }

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h2>새로운 거래 추가</h2>
        <label>텍스트</label>
        <input placeholder="내용 입력..." value={text} onChange={e => setText(e.target.value)} />

        <div className={css.radioGroup}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            수입
          </label>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            지출
          </label>
        </div>

        <input
          placeholder="금액 입력..."
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button className={css.submitBtn} onClick={handleSubmit}>
          거래 추가
        </button>
      </div>
    </div>
  )
}

export default Transaction
