import React from 'react'
import { MainContext } from '../../Context'
import Layout from '../../Components/Layout'
import { Menus } from '../../Components/Menus'
import './index.css'
import { Outlet } from 'react-router-dom'
import { OrderSection } from '../../components/OrderSection'
import { NavBar } from '../../Components/NavBar'

function Home() {
  const { setError, setLoading, tableActive, setTableActive, setOrderList, orderList } =
    React.useContext(MainContext)

  return (
    <div className="home-container">
      <Layout>
        <Menus setError={setError} setLoading={setLoading} />
        <Outlet />
        <OrderSection
          tableActive={tableActive}
          setTableActive={setTableActive}
          orderList={orderList}
          setOrderList={setOrderList}
        />
      </Layout>
    </div>
  )
}
export { Home }
