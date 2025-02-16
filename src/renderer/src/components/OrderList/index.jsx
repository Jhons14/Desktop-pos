import { useState, useEffect, useRef, useContext } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { Modal } from '../Modal'
import { deleteProductFromOrderList } from '../../utils'
import { MainContext } from '../../Context'

import './Index.css'

export function OrderList({ orderActive, orderList }) {
  const [showUpArrow, setShowUpArrow] = useState(false)
  const [showDownArrow, setShowDownArrow] = useState(false)
  const [openEditOrder, setOrderEditable] = useState(false)

  const { setOrderList } = useContext(MainContext)

  const scrollOrderListRef = useRef(null)
  const orderIndex = orderList.findIndex((order) => order === orderActive)

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

  function handleQuantityChange(action, productIndex) {
    let newOrderActiveProducts = orderActive.products.map((product) => ({ ...product }))
    const orderIndex = orderList.findIndex((order) => order === orderActive)

    if (action === 'plus') {
      newOrderActiveProducts[productIndex].quantity++
    } else if (action === 'minus') {
      if (newOrderActiveProducts[productIndex].quantity > 0) {
        newOrderActiveProducts[productIndex].quantity--
      }
    }
    const newOrderList = orderList.map((order, index) =>
      index === orderIndex ? { ...order, products: newOrderActiveProducts } : order
    )
    setOrderList(newOrderList)
  }

  const renderOrderValues = (products) => (
    <div
      className="order-list"
      id="order-list"
      onScroll={() => handleScroll()}
      ref={scrollOrderListRef}
    >
      {products?.map((product, productIndex) => (
        <div key={product.id} className="order-list__item">
          <div className="orderList__item-delete orderList__item-delete--${openEditOrder}">
            <RiDeleteBin6Line
              className={` orderList__item-delete-icon--${openEditOrder}`}
              onClick={() => {
                deleteProductFromOrderList(product, orderIndex, orderList, setOrderList)
              }}
            />
          </div>

          <span>{product?.name}</span>
          <div className="quantity-handler">
            <div>
              <FaMinusSquare
                className={`productOrderQuantity-button productOrderQuantity-button--${openEditOrder}`}
                size={18}
                onClick={() => handleQuantityChange('minus', productIndex)}
              />
            </div>
            <span>{product?.quantity}</span>
            <div>
              <FaPlusSquare
                className={`productOrderQuantity-button productOrderQuantity-button--${openEditOrder}`}
                size={18}
                onClick={() => handleQuantityChange('plus', productIndex)}
              />
            </div>
          </div>
          <span className="order-list__item-total-price">${product?.totalPrice}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className="order-list-container">
      {orderActive.products.length > 0 && (
        <MdOutlineModeEditOutline
          className={`edit-icon edit-icon--${openEditOrder}`}
          size={24}
          onClick={() => setOrderEditable((prev) => !prev)}
        />
      )}
      <div className="arrow_div">{!!showUpArrow && <IoIosArrowUp id="scroll-up-list-arrow" />}</div>

      {openEditOrder ? (
        <Modal stateUpdater={setOrderEditable}>{renderOrderValues(orderActive.products)}</Modal>
      ) : (
        renderOrderValues(orderActive.products)
      )}
      <div className="arrow_div">
        {!!showDownArrow && <IoIosArrowDown id="scroll-down-list-arrow" />}
      </div>
    </div>
  )
}
