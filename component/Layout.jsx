import React from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import SideBar from './layout/SideBar'

const Layout = ({children}) => {
  return (
    <div className="w-full relative">
        <Navbar />
        <div className="min-h-[100vh]">
            <div className="absolute left-[0px]">
                <div className="">
                    <SideBar />
                </div>
            </div>
            <div className="ml-[300px]">
                {children}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Layout