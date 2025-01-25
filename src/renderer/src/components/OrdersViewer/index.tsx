import { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MainContext } from '../../Context'
import './index.css'

interface Order {
  orderId: string
  orders: Array<{ id: string; name: string }>
  table: number
}

type MainContextType = {
  setOpenCreateOrder: (openCreateOrder: boolean) => void
}

export function OrdersViewer({
  orderList,
  setTableActive
}: {
  orderList: Array<Order>
  tableActive: number
  setTableActive: (table: number) => void
}): JSX.Element {
  const { setOpenCreateOrder } = useContext(MainContext) as MainContextType
  function handleCreateOrder(): void {
    setOpenCreateOrder(true)
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
