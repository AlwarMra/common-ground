import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import {
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  UserIcon,
  LogoutIcon,
} from './Icons'

// import Sidebar from './Sidebar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter()
  return (
    <>
      <Header />
      <main>
        {pathname.includes('dashboard') ? (
          <div className='grid grid-cols-min-content'>
            <Sidebar>
              <Sidebar.Title title={'Menu'} />
              <Sidebar.Item
                icon={<ProductsIcon size={20} />}
                link={'/dashboard/products'}
                title={'Products'}
              />
              <Sidebar.Item
                icon={<OrdersIcon size={20} />}
                link={'/dashboard/orders'}
                title={'Orders'}
              />
              <Sidebar.Item
                icon={<UserIcon size={20} />}
                link={'/dashboard/clients'}
                title={'Clients'}
              />
              <Sidebar.Item
                icon={<SettingsIcon size={20} />}
                link={'/dashboard/settings'}
                title={'Settings'}
              />
            </Sidebar>
            <section>{children}</section>
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  )
}

export default Layout
