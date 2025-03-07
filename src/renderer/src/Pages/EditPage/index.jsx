import { useContext } from 'react'
import { MainContext } from '../../Context'
import { ProductBox } from '../../Components/ProductBox'
import './index.css'

function EditPage() {
  const { setOrderList, orderList, tableActive } = useContext(MainContext)

  const currentURL = window.location.pathname

  const productIdInURL = currentURL.match(/[^/]+$/)[0]

  return (
    <Modal>
      <ProductBox
        key={productIdInURL}
        setOrderList={setOrderList}
        orderList={orderList}
        tableActive={tableActive}
        optionList={['upload']}
      />
    </Modal>
  )
}

export { EditPage }
