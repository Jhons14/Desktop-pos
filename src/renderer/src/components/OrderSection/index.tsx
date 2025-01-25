import { useState, useEffect, useContext } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MainContext } from '../../Context'
import { FixedHandler } from '../FixedHandler'
import { CreateBill } from '../CreateBill'
import { OrderList } from '../OrderList'
import { addTableToOrder } from '../../utils'
import './index.css'

type Product = {
  id: string
  name: string
  price: number
  quantity: number
  totalPrice: number
}

type Order = {
  table: number
  clientName: string
  products: Product[]
  totalToPay: number
}

function OrderSection({
  tableActive,
  setTableActive,
  orderList,
  setOrderList
}: {
  tableActive: number
  setTableActive: (tableActive: number) => void
  orderList: Order[]
  setOrderList: (orderList: Order[]) => void
}): JSX.Element {
  //RENDER OBJECTS
  const { openCreateOrder, setOpenCreateOrder } = useContext(MainContext) as {
    openCreateOrder: boolean
    setOpenCreateOrder: (openCreateOrder: boolean) => void
  }
  const [createOrderMessage, setCreateOrderMessage] = useState('')

  //EFFECTS
  useEffect(() => {
    if (tableActive) {
      setOpenCreateOrder(false)
    }
  }, [tableActive])

  const orderActiveIndex = orderList?.findIndex((listItem) => listItem.table === tableActive)
  const orderActive = orderList?.[orderActiveIndex]

  const showLeftArrow = orderActiveIndex > 0
  const showRightArrow = orderActiveIndex < orderList?.length - 1

  const clientName = orderActive?.clientName

  //Calcula el total a pagar del usuario y lo agrega al estado de la orden activa

  function checkInTable(form) {
    const formData = new FormData(form)
    const tableNumber = formData.get('numero-mesa_input')
    const trimedTableNumber = tableNumber.trim() // Obtén el valor del input y elimina espacios extra
    const parsedTableNumber = Number(trimedTableNumber) // Obtén el valor del input y elimina espacios extra

    setCreateOrderMessage('')

    if (parsedTableNumber >= 1) {
      const isOrderInList = orderList.some((order) => order.table === parsedTableNumber)
      if (!isOrderInList) {
        addTableToOrder(parsedTableNumber, orderList, setOrderList)
        setOpenCreateOrder(false)
        setTableActive(parsedTableNumber)
      } else {
        setCreateOrderMessage('Ya existe una orden asociada a ese numero de mesa')
      }
    } else {
      setCreateOrderMessage('El valor ingresado debe ser numerico y mayor a 0')
    }
  }

  function handleTableArrow(arrow: string) {
    if (arrow === 'left') {
      setTableActive(orderList[orderActiveIndex - 1].table)
    } else {
      setTableActive(orderList[orderActiveIndex + 1].table)
    }
  }

  if (openCreateOrder) {
    return (
      <CreateBill
        checkInTable={checkInTable}
        createOrderMessage={createOrderMessage}
        setOpenCreateOrder={setOpenCreateOrder}
      />
    )
  } else {
    return (
      <div className="order-section-container">
        <div className="order-title_section">
          <span>
            <FaArrowLeft
              size={24}
              className={`tables-arrow--${showLeftArrow}`}
              onClick={() => handleTableArrow('left')}
            />
          </span>
          <h1>Mesa {tableActive ? tableActive : '--'}</h1>
          <span>
            <FaArrowRight
              size={24}
              className={`tables-arrow--${showRightArrow}`}
              onClick={() => handleTableArrow('right')}
            />
          </span>
        </div>
        <span>{clientName ? clientName : 'Sin Registrar'}</span>
        <OrderList orderActive={orderActive} orderList={orderList} setOrderList={setOrderList} />
        <FixedHandler orderProducts={orderActive.products} />
      </div>
    )
  }
}
export { OrderSection }
