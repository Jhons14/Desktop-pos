import './index.css'

export function FixedHandler({ calculateTotalToPay }): JSX.Element {
  const button = () => (
    <button id="checkIn-button" onClick={() => setOpenCreateOrder(true)}>
      Registrar usuario en mesa
    </button>
  )

  return (
    <div className="fixedHandler">
      <span id="total-to-pay">
        <p>Total</p>
        <p> ${calculateTotalToPay() || 0}</p>
      </span>
      <button id="buttonToPay">Go to Pay</button>
      {!clientName && !openCreateOrder && button()}
    </div>
  )
}
