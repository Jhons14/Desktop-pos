import { useState, useEffect, useRef } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { MdOutlineModeEditOutline } from 'react-icons/md'

import { OrderItems } from '../OrderItems'
import { Modal } from '../Modal'

import './Index.css'

export function OrderList({ orderActive }) {
  const [showUpArrow, setShowUpArrow] = useState(false)
  const [showDownArrow, setShowDownArrow] = useState(false)
  const [openEditOrder, setOrderEditable] = useState(false)

  const orderListRef = useRef(null)

  useEffect(() => {
    handleScroll()
  }, [orderActive])

  function handleScroll() {
    const container = orderListRef.current
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container
      setShowUpArrow(scrollTop > 0)
      setShowDownArrow(scrollHeight - scrollTop > clientHeight)
    }
  }

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

      <OrderItems
        handleScroll={handleScroll}
        orderActive={orderActive}
        orderListRef={orderListRef}
        editable={false}
        setOrderEditable={setOrderEditable}
      />

      {openEditOrder && (
        <Modal stateUpdater={setOrderEditable}>
          <OrderItems
            handleScroll={handleScroll}
            orderActive={orderActive}
            orderListRef={orderListRef}
            editable={true}
            setOrderEditable={setOrderEditable}
          />
        </Modal>
      )}

      <div className="arrow_div">
        {!!showDownArrow && <IoIosArrowDown id="scroll-down-list-arrow" />}
      </div>
    </div>
  )
}
