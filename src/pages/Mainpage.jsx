import React from 'react'
import css from './Mainpage.module.css'
import IncomeExpense from '../components/IncomeExpense'
import Balance from '../components/Balance'
import Transaction from '../components/Transaction'
import TransactionList from '../components/TransactionList'
import List from '../components/List'
import Graph from '../components/Graph'
const Mainpage = () => {
  return (
    <main>
      <h1>용돈 기입장</h1>
      <div className={css.main}>
        <div className={css.container}>
          <IncomeExpense />
          <Balance />
        </div>

        <div className={css.container}>
          <List />
        </div>
        <div className={css.container}>
          <Transaction />
        </div>
        <div className={css.container}>
          <Graph />
        </div>
      </div>
    </main>
  )
}

export default Mainpage
