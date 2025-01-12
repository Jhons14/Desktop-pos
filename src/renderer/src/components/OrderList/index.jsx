import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteProductFromOrderList } from '../../utils'
import { useState } from 'react'
import './index.css'

export function OrderList({ orderActive, orderList, setOrderList }) {
  const scrollListPointer = useState({})

  const upArrow = document.getElementById('scroll-up-list-arrow')
  const downArrow = document.getElementById('scroll-down-list-arrow')
  const updateArrows = (scroll) => {
    if (scroll.scrollTop === 0) {
      upArrow.style.display = 'none'
    } else {
      upArrow.style.display = 'block'
    }
    if (scroll.scrollHeight - scroll.scrollTop <= scroll.clientHeight) {
      downArrow.style.display = 'none'
    } else {
      downArrow.style.display = 'block'
    }
  }

  function handleScroll(target) {
    const newScrollListPointer = {
      ...scrollListPointer,
      scrollTop: target.scrollTop,
      clientHeight: target.clientHeight,
      scrollHeight: target.scrollHeight
    }
    updateArrows(newScrollListPointer)
  }

  const renderOrderValues = (products) =>
    products?.map((product) => (
      <div key={product.id} className="order-list__item">
        <div id="delete-trash-can">
          <RiDeleteBin6Line
            onClick={() => {
              deleteProductFromOrderList(product.id, orderActive.orderId, orderList, setOrderList)
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
      <div className="arrow-div">
        <IoIosArrowUp
          style={{ width: '100%', height: '100%', display: 'none' }}
          id="scroll-up-list-arrow"
        />
      </div>
      <div className="order-list" id="order-list" onScroll={(e) => handleScroll(e.target)}>
        {renderOrderValues(orderActive?.products)}
      </div>
      <div className="arrow-div">
        <IoIosArrowDown
          style={{ width: '100%', height: '100%', display: 'none' }}
          id="scroll-down-list-arrow"
        />
      </div>
    </div>
  )
}
