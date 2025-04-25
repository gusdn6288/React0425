// TransactionList.jsx
import React from 'react'
import css from './TransactionList.module.css'

const TransactionList = ({ transactions = [], onDelete }) => {
  return (
    <div className={css.history}>
      <h2>내역</h2>
      {transactions.map(item => (
        <div
          key={item.id}
          className={`${css.item} ${item.type === 'income' ? css.income : css.expense}`}
        >
          <span onClick={() => onDelete(item.id)} className={css.deleteBtn}>
            ❌
          </span>
          <span>{item.text}</span>
          <span>
            {item.type === 'income' ? '+' : '-'}₩{item.amount.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default TransactionList
