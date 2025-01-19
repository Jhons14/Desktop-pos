import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteProductFromOrderList } from '../../utils'
import { useState, useEffect, useRef } from 'react'
import './index.css'

export function OrderList({ orderActive, orderList, setOrderList }) {
  const [showUpArrow, setShowUpArrow] = useState(false)
  const [showDownArrow, setShowDownArrow] = useState(false)
  const scrollOrderListRef = useRef(null)

  useEffect(() => {
    handleScroll()
  }, [orderList])
  function handleScroll() {
    const container = scrollOrderListRef.current
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container
      setShowUpArrow(scrollTop > 0)
      setShowDownArrow(scrollHeight - scrollTop > clientHeight)
    }
  }

  const renderOrderValues = (products) =>
    products?.map((product) => (
      <div key={product.id} className="order-list__item">
        <div id="delete-trash-can">
          <RiDeleteBin6Line
            onClick={() => {
              deleteProductFromOrderList(product, orderActive, orderList, setOrderList)
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <span>{product?.name}</span>
          <span> x {product?.quantity}</span>
        </div>
        <span>${product?.totalPrice}</span>
      </div>
    ))
  return (
    <div
      className="order-list-container"
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="arrow_div">{!!showUpArrow && <IoIosArrowUp id="scroll-up-list-arrow" />}</div>
      <div
        className="order-list"
        id="order-list"
        onScroll={() => handleScroll()}
        ref={scrollOrderListRef}
      >
        {renderOrderValues(orderActive?.products)}
      </div>
      <div className="arrow_div">
        {!!showDownArrow && <IoIosArrowDown id="scroll-down-list-arrow" />}
      </div>
    </div>
  )
}
