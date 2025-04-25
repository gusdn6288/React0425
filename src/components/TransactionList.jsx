import React, { useState } from 'react'
import css from './TransactionList.module.css'

const TransactionList = ({ transactions = [], onDelete }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div>
      <h2 className={css.title}>내역</h2>
      <div className={css.history}>
        {transactions.map(item => (
          <div
            key={item.id}
            className={`${css.item} ${item.type === 'income' ? css.income : css.expense}`}
          >
            <span onClick={() => onDelete(item.id)} className={css.deleteBtn}>
              ❌
            </span>
            <span
              className={`${css.text} ${expandedId === item.id ? css.expanded : ''}`}
              onClick={() => toggleExpand(item.id)}
              title={item.text}
            >
              {item.text}
            </span>
            <span>
              {item.type === 'income' ? '+' : '-'}₩{item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList
