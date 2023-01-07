import React from 'react'
import Header from './Header'
interface Props {
  children: React.ReactNode
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default Layout
