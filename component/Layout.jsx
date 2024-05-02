import React, { useState } from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import SideBar from './layout/SideBar';
import { usePathname } from 'next/navigation';

const Layout = ({children}) => {
    const params = usePathname();
    const [activeNav, setActiveNav] = useState(false);
    const excludedPaths = ['/login','/','/admin/sign-up']
  return (
    <div className="w-full relative">
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav}/>
        <div className="min-h-[100vh]">
            {
                !excludedPaths.includes(params) ?
                <div>
                    <div className={`absolute md:left-[0px] ${!activeNav ? '-left-[250px]' : 'left-[0px]'} z-2`}>
                        <SideBar />
                    </div>
                    <div className="ml-0 px-4 md:ml-[270px] md:pr-4 py-5">
                        {children}
                    </div>
                </div>
                : 
                <div className=" px-4 py-5">
                    {children}
                </div>
            }
        </div>
        <div className="pt-10">
            <Footer />
        </div>
    </div>
  )
}

export default Layout