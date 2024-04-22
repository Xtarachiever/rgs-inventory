import { FaUserCircle } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="bg-white p-4 w-[270px] h-[100vh] border-r border-gray">
        <div>
            <p className="flex"><FaUserCircle fontSize="1.7rem" className="mr-4"/> testing tintung</p>
            <p>Dashboard</p>
            <p>My Orders</p>
            <p>My Orders</p>
        </div>
    </div>
  )
}

export default SideBar