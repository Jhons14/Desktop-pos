import { useRef } from 'react'
import './index.css'

export function CreateBill(props: {
  checkInTable: (formRef: { current: any }) => void
}): JSX.Element {
  const formRef = useRef()
  return (
    <form className="register-client-form" ref={formRef}>
      <h2>Nombre del cliente:</h2>
      <input type="text" name="nombre-cliente" id="nombre-cliente" autoComplete="off" />
      <button type="button" onClick={() => props.checkInTable(formRef.current)}>
        Registrar
      </button>
    </form>
  )
}
