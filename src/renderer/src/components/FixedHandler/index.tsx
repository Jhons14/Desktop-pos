import { Product } from 'electron/renderer'
import './index.css'

export function FixedHandler({ orderProducts }: { orderProducts: Product[] }): JSX.Element {
  const calculateOrderPrice = (): number => {
    let totalToPayValue = 0
    orderProducts.forEach((product) => {
      totalToPayValue += product.totalPrice
    })

    return totalToPayValue
  }
  const orderPrice = calculateOrderPrice()
  const service = orderPrice * 0.1
  const totalToPay = orderPrice + service

  return (
    <div id="fixedHandler" aria-disabled>
      <div className="total-to-pay_container">
        <span className="total-to-pay_span">
          <p>Cuenta:</p>
          <p> ${orderPrice}</p>
        </span>
        <span className="total-to-pay_span">
          <p>Servicio:</p>
          <p> ${service}</p>
        </span>
        <span className="total-to-pay_span">
          <p>Total:</p>
          <p> ${totalToPay}</p>
        </span>
      </div>
      <button type="button" id="buttonToPay">
        Pagar
      </button>
    </div>
  )
}
