import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MainContext } from '../../Context'
import './index.css'

interface Order {
  orderId: string
  orders: Array<{ id: string; name: string }>
  table: number
}

export function OrdersViewer({
  orderList,
  setTableActive
}: {
  orderList: Array<Order>
  tableActive: number
  setTableActive: (table: number) => void
}): JSX.Element {
  function handleCreateOrder(): void {
    setTableActive(orderList[orderList.length - 1].table + 1)
  }

  return (
    <div className="orders-viewer">
      <span>Mesas</span>
      <div className="orders">
        {orderList?.map((order) => (
          <button
            key={order.orderId}
            type="button"
            onClick={() => setTableActive(order.table)}
            className="table-button"
          >
            {order.table}
          </button>
        ))}
        <button
          key={'00'}
          type="button"
          className="table-button create-table-button"
          onClick={() => {
            handleCreateOrder()
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
