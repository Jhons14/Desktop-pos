import { useEffect, useRef, useState } from 'react'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import './index.css'
import { CreateBill } from '../CreateBill'
import { OrderList } from '../OrderList'

function OrderSection({ tableActive, setTableActive, orderList, setOrderList }) {
  const [openCreateOrder, setOpenCreateOrder] = useState(false)

  const [mesas, setMesas] = useState([
    {
      id: 1,
      nombreCliente: 'Jhon'
    },
    {
      id: 2
    }
  ])

  const orderActive = orderList.find((listItem) => listItem.table === tableActive)

  const clientName = mesas.find((element) => tableActive === element.id)?.nombreCliente

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

  //EFFECTS
  useEffect(() => {
    setOpenCreateOrder(false)
  }, [tableActive])

  //RENDER OBJECTS

  const fixedHandler = () => {
    if (clientName && !openCreateOrder) {
      return (
        <div className="fixedHandler">
          <span id="total-to-pay">
            <p>Total</p>
            <p> ${calculateTotalToPay() || 0}</p>
          </span>
          <button id="buttonToPay">Go to Pay</button>
        </div>
      )
    }
  }

  function checkInTable(form) {
    const formData = new FormData(form)
    mesas[tableActive - 1].nombreCliente = formData.get('nombre-cliente')
    setOpenCreateOrder(false)
  }

  return (
    <div className="order-section-container">
      {!!tableActive && (
        <div className="order-title_section">
          <span>
            <FaArrowLeft
              size={24}
              className={`tables-arrow--${tableActive !== 1}`}
              onClick={() => setTableActive(tableActive - 1)}
            />
          </span>
          <h1>Order {tableActive}</h1>
          <span>
            <FaArrowRight
              size={24}
              className={`tables-arrow--${tableActive !== mesas.length}`}
              onClick={() => setTableActive(tableActive + 1)}
            />
          </span>
        </div>
      )}
      <CreateBill
        openCreateOrder={openCreateOrder}
        setOpenCreateOrder={setOpenCreateOrder}
        checkInTable={checkInTable}
      />

      {!openCreateOrder && <span>{clientName ? clientName : 'Sin Registrar'}</span>}
      <OrderList orderActive={orderActive} orderList={orderList} setOrderList={setOrderList} />

      {!clientName && !openCreateOrder && (
        <button id="checkIn-button" onClick={() => setOpenCreateOrder(true)}>
          New Order
        </button>
      )}
      {fixedHandler()}
    </div>
  )
}
export { OrderSection }
