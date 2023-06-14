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
import Drawer from './Drawer/Drawer'
import Overlay from './Overlay'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter()

  if (pathname.includes('dashboard')) {
    return (
      <>
        <Overlay />
        <Header />
        <main className='mx-auto max-w-7xl w-11/12'>
          <div className='grid grid-cols-min-content mt-4 gap-2'>
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
            {children}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Overlay />
      <Header />
      <Drawer />
      <main className='mx-auto max-w-7xl w-11/12'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
