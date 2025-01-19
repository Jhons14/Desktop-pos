import { useRef } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import './index.css'

export function CreateBill({
  checkInTable,
  createOrderMessage,
  setOpenCreateOrder
}: {
  checkInTable: (formRef: HTMLFormElement | null) => void
  createOrderMessage: string
  setOpenCreateOrder: (openCreateOrder: boolean) => void
}): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="create-bill-container">
      <IoCloseOutline
        className="close-create-bill-icon"
        size={24}
        onClick={() => setOpenCreateOrder(false)}
      />
      <h1 className="create-bill-title">Registrar orden</h1>
      <form
        className="register-client-form"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          checkInTable(formRef.current)
        }}
      >
        <div>
          <label htmlFor="numero-mesa_input" className="numero-mesa_label">
            Numero de mesa:
          </label>
          <input
            inputMode="numeric"
            name="numero-mesa_input"
            className="numero-mesa_input"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p className="create-order-message">{createOrderMessage}</p>
    </div>
  )
}
