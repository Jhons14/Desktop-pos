import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import { MdOutlineModeEditOutline } from 'react-icons/md'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteProductFromOrderList } from '../../utils'
import { useState, useEffect, useRef } from 'react'
import './index.css'

export function OrderList({ orderActive, orderList, setOrderList }) {
  const [showUpArrow, setShowUpArrow] = useState(false)
  const [showDownArrow, setShowDownArrow] = useState(false)
  const [orderActiveProducts, setOrderActiveProducts] = useState([])
  const [orderEditable, setOrderEditable] = useState(false)

  const scrollOrderListRef = useRef(null)
  const orderIndex = orderList.findIndex((order) => order === orderActive)

  useEffect(() => {
    handleScroll()
  }, [orderList])

  useEffect(() => {
    setOrderActiveProducts([...orderActive.products])
  }, [orderActive.products])

  function handleScroll() {
    const container = scrollOrderListRef.current
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container
      setShowUpArrow(scrollTop > 0)
      setShowDownArrow(scrollHeight - scrollTop > clientHeight)
    }
  }

  function handleQuantityChange(action, index) {
    let newOrderActiveProducts = orderActiveProducts.map((product) => ({ ...product }))
    console.log(orderActiveProducts[index].quantity)

    if (action === 'plus') {
      newOrderActiveProducts[index].quantity++
    } else if (action === 'minus') {
      if (newOrderActiveProducts[index].quantity > 0) {
        newOrderActiveProducts[index].quantity--
      }
    }
    console.log(orderActiveProducts[index].quantity)
    setOrderActiveProducts(newOrderActiveProducts)
  }

  const renderOrderValues = (products) =>
    products?.map((product, index) => (
      <div key={product.id} className="order-list__item">
        <div id="delete-trash-can">
          <RiDeleteBin6Line
            onClick={() => {
              deleteProductFromOrderList(product, orderIndex, orderList, setOrderList)
            }}
          />
        </div>

        <span>{product?.name}</span>
        <div className="quantity-handler">
          <div>
            <FaMinusSquare
              className={`productOrderQuantity-button productOrderQuantity-button--${orderEditable}`}
              size={18}
              onClick={() => handleQuantityChange('minus', index)}
            />
          </div>
          <span>{product?.quantity}</span>
          <div>
            <FaPlusSquare
              className={`productOrderQuantity-button productOrderQuantity-button--${orderEditable}`}
              size={18}
              onClick={() => handleQuantityChange('plus', index)}
            />
          </div>
        </div>
        <span className="order-list__item-total-price">${product?.totalPrice}</span>
      </div>
    ))

  return (
    <div className="order-list-container">
      {orderActiveProducts.length > 0 && (
        <MdOutlineModeEditOutline
          className={`edit-icon edit-icon--${orderEditable}`}
          size={24}
          onClick={() => setOrderEditable((prev) => !prev)}
        />
      )}
      <div className="arrow_div">{!!showUpArrow && <IoIosArrowUp id="scroll-up-list-arrow" />}</div>

      <div
        className="order-list"
        id="order-list"
        onScroll={() => handleScroll()}
        ref={scrollOrderListRef}
      >
        {renderOrderValues(orderActiveProducts)}
      </div>
      <div className="arrow_div">
        {!!showDownArrow && <IoIosArrowDown id="scroll-down-list-arrow" />}
      </div>
    </div>
  )
}
