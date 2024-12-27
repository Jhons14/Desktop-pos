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

  const orderActive = orderList.find((listItem) => listItem.table === tableActive)

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
    const customerName = formData.get('nombre-cliente')
    addCustomer2Order(customerName, orderList, setOrderList, tableActive)
    // mesas[tableActive - 1].nombreCliente = formData.get('nombre-cliente')
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
          <h1>Mesa {tableActive}</h1>
          <span>
            <FaArrowRight
              size={24}
              className={`tables-arrow--${tableActive !== orderList.length + 1}`}
              onClick={() => setTableActive(tableActive + 1)}
            />
          </span>
        </div>
      )}
      {openCreateOrder && <CreateBill checkInTable={checkInTable} />}

      {!openCreateOrder && <span>{clientName ? clientName : 'Sin Registrar'}</span>}
      {!openCreateOrder && (
        <OrderList orderActive={orderActive} orderList={orderList} setOrderList={setOrderList} />
      )}

      {clientName && !openCreateOrder && <FixedHandler calculateTotalToPay={calculateTotalToPay} />}
    </div>
  )
}
export { OrderSection }
