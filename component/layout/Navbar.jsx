import RgsIcon from "@/public/assets/RgsIcon";
import React, { useEffect, useState } from "react";
import SearchInput from "../inputs/SearchInput";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "./styles.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import useAllDetailsHook from "@/hooks/AllDetailsHook";
import { IoArrowForward } from "react-icons/io5";

const Navbar = ({ activeNav, setActiveNav, navLink }) => {
  const params = usePathname();
  const route = useRouter();
  const excludedPaths = ["/login"];

  const [inputValue, setInputValue] = useState("");

  const { data, allDetailsLoading } = useAllDetailsHook();

  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    if (data) {
      const visibleData = data.filter(({ productName }) =>
        productName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(visibleData);
    }
  }, [inputValue, data]);

  return (
    <div
      className={`flex justify-between w-full p-6 px-10 items-center h-[100px] bg-white sticky top-0 z-10 shadow-xl gap-[20px] border-b border-gray ${styles.navBar}`}
    >
      <Link
        className="max-w-[300px] min-w-[100px]"
        href={navLink ? navLink : "/dashboard"}
      >
        <RgsIcon />
      </Link>
      {!excludedPaths.includes(params) ? (
        <div className="hidden md:block w-[80%] lg:w-[70%] relative">
          <div className="flex gap-[20px] w-full items-center justify-between">
            <div
              className={`max-w-[600px] w-full min-w-[300px] ${styles.search_input}`}
            >
              <SearchInput
                value={inputValue}
                name={"search"}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div onClick={() => route.push("/notifications")}>
              <IoIosNotificationsOutline fontSize="1.7rem" cursor={"pointer"} />
            </div>
          </div>
          {
            inputValue !== ''
            && 
            <div className="absolute top-[50px] left-0 bg-white shadow-lg py-4 max-w-[600px] w-full overflow-scroll max-h-[250px] cursor-pointer">
            {
              allDetailsLoading ? <div className="loader"></div> :
              filteredData?.length !== 0 ?
              filteredData?.map(({imageDetails,productName,slug,_id})=>(
                <div key={_id} className="py-2 flex justify-between items-center px-3 hover:bg-lightGreen" onClick={()=>{route.push(`/product/${slug}`, setInputValue(''))}}>
                  <div className="flex items-center gap-[20px]">
                    {
                      imageDetails?.length !== 0 ? imageDetails?.map(({productPic, _id})=>(
                        <img className="w-[60px]" src={productPic ? productPic : '/favicon.ico'} key={_id} alt="product"/>
                      ))
                      :
                      <img className="w-[40px]" src={'/favicon.ico'} alt="product"/>
                    }
                    <p>{productName}</p>
                  </div>
                  <IoArrowForward cursor={'pointer'}/>
                </div>
              )) :
              <div>No data found</div>
            }
            </div>
          }
        </div>
      ) : (
        <></>
      )}
      <div className="md:hidden block">
        <div className="flex gap-[20px] items-center">
          <IoIosNotificationsOutline
            fontSize="1.7rem"
            cursor={"pointer"}
            onClick={() => route.push("/notifications")}
          />
          {
            route?.pathname !== '/notifications' 
            ?
            activeNav ? (
              <IoCloseSharp
                fontSize="1.4rem"
                onClick={() => setActiveNav(false)}
                cursor={"pointer"}
              />
            ) : (
              <RxHamburgerMenu
                fontSize="1.4rem"
                onClick={() => setActiveNav(true)}
                cursor={"pointer"}
              />
            )
            :
            <></>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
