import { useRef } from 'react'
import './index.css'

export function CreateBill({
  checkInTable
}: {
  checkInTable: (formRef: { current: any }) => void
}): JSX.Element {
  const formRef = useRef()
  return (
    <form className="register-client-form" ref={formRef}>
      <h2>Numero de mesa:</h2>
      <input type="number" name="numero-mesa" id="numero-mesa" autoComplete="off" />
      <button type="button" onClick={() => checkInTable(formRef.current)}>
        Registrar
      </button>
    </form>
  )
}
