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
  const checkInButton = document.getElementById('checkIn-button')
  if (checkInButton) {
    if (!orderActive) {
      checkInButton.disabled = true
    } else {
      checkInButton.disabled = false
    }
  }

  return (
    <div id="fixedHandler" aria-disabled>
      <span id="total-to-pay">
        <p>Total</p>
        <p> ${calculateTotalToPay() || 0}</p>
      </span>
      {button()}
    </div>
  )
}
