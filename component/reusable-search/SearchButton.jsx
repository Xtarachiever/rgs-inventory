import TextInput from "../inputs/TextInput"
import { IoSearchOutline } from "react-icons/io5"
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const SearchButton = ({name, placeholder, buttonName, modal, setOpenModal}) => {
  return (
    <div className="flex-col sm:flex-row flex justify-around items-center gap-[20px]">
        <div className="w-[75%] relative">
        <TextInput
            placeholder={placeholder}
            name={name}
            value={""}
            onChange={() => {}}
        />
        <IoSearchOutline
            className={"absolute right-[15px] top-[24px]"}
            size={"1.5rem"}
        />
        </div>
        <div
        className="flex bg-primary items-center max-w-[170px] text-white p-3 cursor-pointer"
        onClick={() => setOpenModal(true)}
        >
        <FaPlus className={"mr-2"} />
            {buttonName}
        </div>
    </div>
  )
}

export default SearchButton