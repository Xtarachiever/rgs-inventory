import RgsIcon from '@/public/assets/RgsIcon'
import React from 'react'
import SearchInput from '../inputs/SearchInput'
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from './styles.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({activeNav, setActiveNav, navLink}) => {
  const params = usePathname()
  const excludedPaths = ['/login']
  return (
    <div className={`flex justify-between w-full p-6 px-10 items-center h-[100px] bg-white sticky top-0 z-10 shadow-xl gap-[20px] border-b border-gray ${styles.navBar}`}>
        <Link className="max-w-[300px] min-w-[100px]" href={navLink ? navLink : '/dashboard'}>
            <RgsIcon />
        </Link>
        {
            !excludedPaths.includes(params) ?
        <div className='flex items-center w-[80%] lg:w-[70%] justify-between'>

          <div className={`max-w-[600px] w-full min-w-[300px] ${styles.search_input}`}>
              <SearchInput />
          </div>
          <div className="hidden md:block">
            <IoIosNotificationsOutline  fontSize="1.7rem"/>
          </div>
        </div> : <></>
        }
        <div className="md:hidden block">
          {
            activeNav ? 
            <IoCloseSharp fontSize="1.4rem" onClick={()=>setActiveNav(false)}/>
            :
            <RxHamburgerMenu fontSize="1.4rem" onClick={()=>setActiveNav(true)}/>
          }
        </div>
    </div>
  )
}

export default Navbar