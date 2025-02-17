import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'

import './index.css'

function ProductDetails({ productOptionsData, setProductOptionsData, product }): JSX.Element {
  function handleOption(event, payload): void {
    event.stopPropagation()
    // Crea una copia del objeto con la actualización
    const newProductOptionsData = {
      ...productOptionsData, // copia las propiedades anteriores
      value:
        payload === 'plus'
          ? productOptionsData.value + 1
          : Math.max(0, productOptionsData.value - 1) // evita valores negativos
    }

    setProductOptionsData(newProductOptionsData)
  }

  function productQuantityHandler(): JSX.Element {
    return (
      <div className="options-container">
        <div key={productOptionsData.name} className="buttons-container quantity-buttons-container">
          <FaMinusSquare
            size={24}
            onClick={(e) => handleOption(e, 'subtrack')}
            className="quantity-button quantity-button-minus"
          />

          <span id="quantity-counter">{productOptionsData.value}</span>
          <FaPlusSquare
            size={24}
            onClick={(e) => handleOption(e, 'plus')}
            className="quantity-button quantity-button-plus"
          />
        </div>
        <span>${product.price}</span>
      </div>
    )
  }

  const renderOptionList = () => (
    <div id="product-details-container">
      <span className="product-title">{product.name}</span>
      {productQuantityHandler()}
    </div>
  )

  return renderOptionList()
}
export { ProductDetails }
