import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import styles from './styles.module.css';
const SideBar = () => {
  return (
    <div className="fixed bg-white z-2 p-4 w-[250px] h-[100vh] border-r border-gray shadow-xl">
      <p className="flex mt-4"><FaUserCircle fontSize="1.7rem" className="mr-4"/> testing tintung</p>
        <div className={`pt-4 ${styles.sidebar_links}`}>
            <Link href="/dashboard">Dashboard</Link> <br />
            <Link href={''}>My Orders</Link> <br />
            <Link href={''}>My Orders</Link>
        </div>
    </div>
  )
}

export default SideBar