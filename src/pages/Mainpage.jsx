import React from 'react'
import css from './Mainpage.module.css'
import IncomeExpense from '../components/IncomeExpense'
import Balance from '../components/Balance'
import Transaction from '../components/Transaction'
import TransactionList from '../components/TransactionList'
import List from '../components/List'
const Mainpage = () => {
  return (
    <main>
      <h1>용돈 기입장</h1>
      <div className={css.main}>
        <div className={css.container}>
          <Balance />
        </div>
        <div className={css.container}>
          <IncomeExpense />
        </div>
        <div className={css.container}>
          <Transaction />
        </div>
        <div className={css.container}>
          <List />
        </div>
      </div>
    </main>
  )
}

export default Mainpage
