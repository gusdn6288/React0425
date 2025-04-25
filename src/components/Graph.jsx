import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import css from './Graph.module.css'

const Graph = () => {
  const [data, setData] = useState([])

  const loadChartData = () => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const transactions = JSON.parse(saved)
      const reversed = transactions.slice().reverse()

      let runningBalance = 0
      const chartData = reversed.map((item, index) => {
        const amount = Number(item.amount)
        runningBalance += item.type === 'income' ? amount : -amount

        return {
          name: `${reversed.length - index}`,
          income: item.type === 'income' ? amount : 0,
          expense: item.type === 'expense' ? amount : 0,
          balance: runningBalance, // ✅ 누적 잔액
          labelText: item.text,
        }
      })

      setData(chartData)
    }
  }

  useEffect(() => {
    loadChartData()
    const handleUpdate = () => loadChartData()
    window.addEventListener('transactionsUpdated', handleUpdate)
    return () => window.removeEventListener('transactionsUpdated', handleUpdate)
  }, [])

  return (
    <div className={css.graphWrapper}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              fontSize: 12,
              borderRadius: '8px',
              boxShadow: 'none',
            }}
            formatter={(value, name) => [
              `₩${Number(value).toLocaleString()}`,
              name === 'income' ? '수입' : '지출',
            ]}
            labelFormatter={(label, payload) => {
              const item = payload[0]?.payload
              return item?.labelText || `거래 ${label}`
            }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#10b981" // 초록색
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
