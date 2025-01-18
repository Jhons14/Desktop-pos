import { useEffect, useContext } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MainContext } from '../../Context'
import { FixedHandler } from '../FixedHandler'
import { CreateBill } from '../CreateBill'
import { OrderList } from '../OrderList'
import { addCustomer2Order } from '../../utils'
import './index.css'

function OrderSection({ tableActive, setTableActive, orderList, setOrderList }) {
  //RENDER OBJECTS
  const { openCreateOrder, setOpenCreateOrder } = useContext(MainContext)

  //EFFECTS
  useEffect(() => {
    setOpenCreateOrder(false)
  }, [tableActive])

  const orderActive = orderList?.find((listItem) => listItem.table === tableActive)
  const orderIDActive = orderList?.findIndex((listItem) => listItem.table === tableActive)

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
    const tableNumber = formData.get('numero-mesa')
    addCustomer2Order(tableNumber, orderList, setOrderList, tableActive)
    setOpenCreateOrder(false)
    setTableActive(tableNumber)
  }

  function handleTableArrow(arrow) {
    if (arrow === 'left') {
      setTableActive(orderList[orderIDActive - 1].table)
    } else {
      setTableActive(orderList[orderIDActive + 1].table)
    }
  }

  const showLeftArrow = orderIDActive > 0
  console.log(tableActive)
  console.log(orderList.length)
  const showRightArrow = orderIDActive < orderList.length - 1
  console.log(showRightArrow)

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
      {openCreateOrder && <CreateBill checkInTable={checkInTable} />}

      {!openCreateOrder && <span>{clientName ? clientName : 'Sin Registrar'}</span>}
      {!openCreateOrder && (
        <OrderList orderActive={orderActive} orderList={orderList} setOrderList={setOrderList} />
      )}

      {!openCreateOrder && (
        <FixedHandler
          orderActive={orderActive}
          calculateTotalToPay={calculateTotalToPay}
          clientName={clientName}
          setOpenCreateOrder={setOpenCreateOrder}
        />
      )}
    </div>
  )
}
export { OrderSection }
