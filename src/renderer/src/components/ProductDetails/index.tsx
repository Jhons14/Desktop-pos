import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'

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

  function renderOption() {
    return (
      <div key={productOptionsData.name} className="buttons-container amount-buttons-container">
        <CiSquareMinus
          size={32}
          onClick={(e) => handleOption(e, 'subtrack')}
          className="option-button amount-button"
        />

        <div>
          <span id="amount-counter">{productOptionsData.value}</span>
        </div>
        <CiSquarePlus
          size={32}
          onClick={(e) => handleOption(e, 'plus')}
          className="option-button amount-button"
        />
      </div>
    )
  }

  const renderOptionList = () => (
    <div id="product-details-container">
      <span className="product-title">{product.name}</span>
      <div className="options-container">{renderOption()}</div>
    </div>
  )

  return renderOptionList()
}
export { ProductDetails }
