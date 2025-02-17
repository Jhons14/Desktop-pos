import { useState, useContext, useEffect } from 'react'

import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import { IoMdRefresh } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { CiSquareCheck } from 'react-icons/ci'

import { MainContext } from '../../Context'

import './index.css'

export function OrderItems({
  handleScroll,
  orderActive,
  orderListRef,
  editable,
  setOrderEditable
}) {
  const { orderList, setOrderList } = useContext(MainContext)

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts([...orderActive.products])
  }, [orderActive])

  function handleQuantityChange(action, productIndex) {
    const newOrderActiveProducts = products.map((product) => ({ ...product }))
    if (action === 'plus') {
      newOrderActiveProducts[productIndex].quantity++
    } else if (action === 'minus') {
      if (newOrderActiveProducts[productIndex].quantity > 1) {
        newOrderActiveProducts[productIndex].quantity--
      }
    }
    setProducts(newOrderActiveProducts)
  }

  function handleDeleteProduct(productIndex) {
    const modifiedOrderList = products.filter((product, index) => index !== productIndex)

    setProducts(modifiedOrderList)
  }

  function onConfirm() {
    const newOrderList = orderList.map((order) =>
      order === orderActive ? { ...order, products: products } : order
    )
    setOrderList(newOrderList)
    setOrderEditable(false)
  }

  return (
    <div className="order-list" id="order-list" onScroll={() => handleScroll()} ref={orderListRef}>
      {products?.map((product, productIndex) => (
        <div key={product.id} className="order-list__item">
          <div className={`orderList__item-delete orderList__item-delete--${editable}`}>
            <RiDeleteBin6Line
              className={` orderList__item-delete-icon--${editable}`}
              onClick={() => {
                handleDeleteProduct(productIndex)
              }}
            />
          </div>

          <span>{product?.name}</span>
          <div className="quantity-handler">
            <div>
              <FaMinusSquare
                className={`productOrderQuantity-button productOrderQuantity-button--${editable}`}
                size={18}
                onClick={() => handleQuantityChange('minus', productIndex)}
              />
            </div>
            <span>{product?.quantity}</span>
            <div>
              <FaPlusSquare
                className={`productOrderQuantity-button productOrderQuantity-button--${editable}`}
                size={18}
                onClick={() => handleQuantityChange('plus', productIndex)}
              />
            </div>
          </div>
          <span className="order-list__item-total-price">${product?.totalPrice}</span>
        </div>
      ))}
      <div className="orderList__item-footer">
        <button
          type="button"
          className={`orderListItem__button-refresh orderListItem__button-refresh--${editable}`}
          onClick={() => setProducts([...orderActive.products])}
        >
          <IoMdRefresh size={24} />
        </button>
        <button
          className={`orderListItem__button-confirm orderListItem__button-confirm--${editable}`}
          type="button"
          onClick={() => onConfirm()}
        >
          <CiSquareCheck size={28} />
        </button>
      </div>
    </div>
  )
}
