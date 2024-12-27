import React from 'react'
import Layout from '../../components/Layout'
import { MainContext } from '../../Context'
import { Menus } from '../../Components/Menus'
import { Outlet } from 'react-router-dom'
import { OrderSection } from '../../components/OrderSection'
import './index.css'

interface Order {
  id: string
  orders: Array<{ id: string; name: string }>
  table: string
}

function Home(): JSX.Element {
  const { setError, setLoading, tableActive, setTableActive, setOrderList, orderList } =
    React.useContext(MainContext) as {
      setError: (error: string) => void
      setLoading: (isLoading: boolean) => void
      setTableActive: (table: string) => void
      setOrderList: (orders: Array<object>) => void
      tableActive: string
      orderList: Array<Order>
      isModalOpen: boolean
      setOpenCreateOrder: () => void
    }

  return (
    <Layout>
      <div className="home-container">
        <Menus setError={setError} setLoading={setLoading} />
        <Outlet />
        <OrderSection
          tableActive={tableActive}
          setTableActive={setTableActive}
          orderList={orderList}
          setOrderList={setOrderList}
        />
      </div>
    </Layout>
  )
}
export { Home }
