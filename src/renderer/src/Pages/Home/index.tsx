import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/Layout'
import { MainContext } from '../../Context'
import { Menus } from '../../Components/Menus'
import { OrderSection } from '../../components/OrderSection'
import { NavBar } from '../../components/NavBar'
import './index.css'

interface Order {
  id: string
  orders: Array<{ id: string; name: string }>
  table: string
}

function Home(): JSX.Element {
  const { setError, setLoading, tableActive, setTableActive, setOrderList, orderList, setWarning } =
    React.useContext(MainContext) as {
      error: boolean
      setError: (error: string) => void
      setWarning: (warning: string) => void
      setLoading: (isLoading: boolean) => void
      setTableActive: (table: string) => void
      setOrderList: (orders: Array<object>) => void
      tableActive: string
      orderList: Array<Order>
      isModalOpen: boolean
      setOpenCreateOrder: () => void
    }

  return (
    <div>
      <NavBar />
      <Layout>
        <div className="home-container">
          <Menus setError={setError} setLoading={setLoading} setWarning={setWarning} />
          <Outlet />
          <OrderSection
            tableActive={tableActive}
            setTableActive={setTableActive}
            orderList={orderList}
            setOrderList={setOrderList}
          />
        </div>
      </Layout>
    </div>
  )
}
export { Home }
