import { FaPlus } from 'react-icons/fa'
import { MainContext } from '../../Context'
import './index.css'
import React from 'react'
import { log } from 'console'

interface Order {
  id: string
  orders: Array<{ id: string; name: string }>
  table: number
}

export function OrdersViewer({
  orderList,
  setTableActive
}: {
  orderList: Array<Order>
  setTableActive: (table: number) => void
}): JSX.Element {
  const { setOpenCreateOrder } = React.useContext(MainContext) as {
    setOpenCreateOrder: (openCreateOrder: boolean) => void
  }

  function handleCreateOrder(): void {
    // setTableActive(0)
    setOpenCreateOrder(true)
  }

  return (
    <div className="orders-viewer">
      <span>Mesas</span>
      <div className="orders">
        {orderList?.map((order) => (
          <button
            key={order.id}
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
          onClick={() => handleCreateOrder()}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
