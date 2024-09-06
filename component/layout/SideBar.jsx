import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideBarContent } from "./SideBarContent";
import { useSession } from "next-auth/react";
import { GrUserManager } from "react-icons/gr";

const SideBar = () => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState([false, false, false]);
  const [isActive, setIsActive] = useState({});

  const {data:session} = useSession();

  const handleToggle = (index) => {
    const updateState = [...isOpen];
    updateState[index] = !updateState[index];
    setIsOpen(updateState);
  };

  const handleLinkChange = (currentHref) => {
    if (route.pathname === currentHref) {
      setIsActive((prevState) => {
        const currentState = prevState[currentHref] || true;
        return {
          ...prevState,
          [currentHref]: currentState,
        };
      });
    }
  };

  useEffect(() => {
    const currentHref = route.pathname;
    setIsActive((prevState) => ({
      ...prevState,
      [currentHref]: true,
    }));
  }, [route.pathname]);
  

  return (
    <div className="fixed bg-white z-2 p-4 w-[250px] h-[100vh] border-r border-gray shadow-xl">
      <p className="flex mt-4">
        <FaUserCircle fontSize="1.7rem" className="mr-4" />{session?.user?.firstName} {" "} {session?.user?.lastName}
      </p>
      <div className={`pt-4 ${styles.sidebar_links}`}>
        {SideBarContent.map(({ title, link, arrow, links }) => (
          <div key={title}>
            <div
              onClick={() => arrow && handleToggle(0)}
              className={isActive[link] ? "bg-primary text-white rounded-lg" : "hover:text-primary"}
            >
              <Link href={link || "#"} onClick={() => handleLinkChange(link)}>
                <p className="flex justify-between items-center">
                  {title}
                  {arrow ? (
                    isOpen[0] ? (
                      <IoIosArrowUp className="inline pointer-events-none" />
                    ) : (
                      <IoIosArrowDown className="inline pointer-events-none" />
                    )
                  ) : (
                    <></>
                  )}
                </p>
              </Link>
            </div>
            {isOpen[0] &&
              links?.map((subLinks) => {
                return (
                  <div key={subLinks?.link} className={isActive[subLinks?.link] ? "bg-primary text-white rounded-lg" : "hover:text-primary"}>
                    <Link href={subLinks?.link} key={subLinks?.link} onClick={() => handleLinkChange(subLinks?.link)} >
                      {subLinks?.title}
                    </Link>
                  </div>
                );
              })}
          </div>
        ))}
        {
          session?.user?.role === 'Admin' && 
            <button onClick={() => route.push('/admin/sign-up')} className="flex items-center pt-4 ml-5 hover:text-primary cursor-pointer">
              <GrUserManager className="mr-3 font-bold" fontSize="1.4rem" /> Register Managers
            </button>
        }
        <p onClick={() => signOut()} className="flex items-center pt-6 ml-5 hover:text-primary cursor-pointer">
          <PiSignOut className="mr-3 font-bold" fontSize="1.4rem" /> Sign Out
        </p>
      </div>
      {}
    </div>
  );
};

export default SideBar;
