import ReactDOM from 'react-dom'
import { useContext } from 'react'
import { MainContext } from '../../Context'
import './index.css'

function Modal({ children }): JSX.Element {
  const { setIsModalOpen } = useContext(MainContext) as {
    setIsModalOpen: (isModalOpen: boolean) => void
  }

  return ReactDOM.createPortal(
    <div className="Modal-container">
      <div className="object-container">
        <span className="CloseModal-button" onClick={() => setIsModalOpen(false)}>
          X
        </span>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  )
}

export { Modal }
