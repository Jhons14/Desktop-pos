import { useState, useEffect } from 'react'
import { ProductDetails } from '../ProductDetails'
import { getProductById, handleProductInOrderList } from '../../utils'

import './index.css'

function ProductBox(props) {
  const [product, setProduct] = useState()

  const [productOptionsData, setProductOptionsData] = useState({
    id: 1,
    name: 'amount',
    value: 0
  })

  //Funcion para reinciar el contador de cantidad de producto a añadir

  function onAddProductToOrderList() {
    const restartAmountCounter = () => {
      let newProductOptionsData = { ...productOptionsData }
      newProductOptionsData.value = 0
      setProductOptionsData(newProductOptionsData)
    }

    handleProductInOrderList(
      product,
      productOptionsData,
      props.tableActive,
      props.orderList,
      props.setOrderList
    )
    restartAmountCounter()
  }

  useEffect(() => {
    if (props.product) {
      setProduct(props.product)
    } else {
      getProductById().then((data) => setProduct(data))
    }
  }, [])

  if (!!product) {
    return (
      <div className="product-box" onClick={() => onAddProductToOrderList()}>
        <ProductDetails
          product={product}
          productOptionsData={productOptionsData}
          setProductOptionsData={setProductOptionsData}
          optionList={props.optionList}
          typeProductActive={props.typeProductActive}
        />
      </div>
    )
  }
}
export { ProductBox }
