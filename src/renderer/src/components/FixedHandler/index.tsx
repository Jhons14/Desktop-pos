import './index.css'

export function FixedHandler({
  calculateTotalToPay,
  clientName,
  setOpenCreateOrder,
  orderActive
}): JSX.Element {
  const button = () => {
    if (!clientName) {
      return (
        <button type="button" id="checkIn-button" onClick={() => setOpenCreateOrder(true)}>
          Registrar mesa
        </button>
      )
    } else {
      return (
        <button type="button" id="buttonToPay">
          Pagar cuenta
        </button>
      )
    }
  }

  return (
    <div id="fixedHandler" aria-disabled>
      <span className="total-to-pay_span">
        <p>Total a pagar:</p>
        <p> ${calculateTotalToPay() || 0}</p>
      </span>
      {button()}
    </div>
  )
}
