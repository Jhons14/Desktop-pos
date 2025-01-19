import { useState, useEffect, useContext } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MainContext } from '../../Context'
import { FixedHandler } from '../FixedHandler'
import { CreateBill } from '../CreateBill'
import { OrderList } from '../OrderList'
import { addTable2Order } from '../../utils'
import './index.css'

function OrderSection({ tableActive, setTableActive, orderList, setOrderList }) {
  //RENDER OBJECTS
  const { openCreateOrder, setOpenCreateOrder } = useContext(MainContext)
  const [createOrderMessage, setCreateOrderMessage] = useState('')

  //EFFECTS
  useEffect(() => {
    if (tableActive) {
      setOpenCreateOrder(false)
      openCreateOrder
    }
  }, [tableActive])

  const orderActiveIndex = orderList?.findIndex((listItem) => listItem.table === tableActive)
  const orderActive = orderList?.[orderActiveIndex]

  const showLeftArrow = orderActiveIndex > 0
  const showRightArrow = orderActiveIndex < orderList?.length - 1

  const clientName = orderActive?.clientName

  //Calcula el total a pagar del usuario y lo agrega al estado de la orden activa
  const calculateTotalToPay = () => {
    if (orderActive) {
      let totalToPayValue = 0
      orderActive.products.forEach((product) => {
        totalToPayValue += product.totalPrice
      })

      const newOrderListArray = orderList.map((listItem) => {
        if (listItem === orderActive) {
          return { ...listItem, totalToPay: totalToPayValue }
        }
        return listItem
      })
      if (orderList == !newOrderListArray) {
        setOrderList(newOrderListArray)
      }
      return totalToPayValue
    }
  }

  function checkInTable(form) {
    const formData = new FormData(form)
    const tableNumber = formData.get('numero-mesa_input')
    const trimedTableNumber = tableNumber.trim() // Obtén el valor del input y elimina espacios extra
    const parsedTableNumber = Number(trimedTableNumber) // Obtén el valor del input y elimina espacios extra

    setCreateOrderMessage('')

    if (parsedTableNumber >= 1) {
      const isOrderInList = orderList.some((order) => order.table === parsedTableNumber)
      if (!isOrderInList) {
        addTable2Order(parsedTableNumber, orderList, setOrderList)
        setOpenCreateOrder(false)
        setTableActive(parsedTableNumber)
      } else {
        setCreateOrderMessage('Ya hay una mesa registrada a este numero')
      }
    } else {
      setCreateOrderMessage('El valor ingresado debe ser numerico y mayor a 0')
    }
  }

  function handleTableArrow(arrow) {
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
        <FixedHandler
          calculateTotalToPay={calculateTotalToPay}
          clientName={clientName}
          setOpenCreateOrder={setOpenCreateOrder}
        />
      </div>
    )
  }
}
export { OrderSection }
