import Layout from '@/component/Layout'
import TextInput from '@/component/inputs/TextInput'
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import Modal from '@/component/products/Modal';
import { ToastContainer } from 'react-toastify';

const Products = () => {
    const [openModal, setOpenModal] = useState(false)
  return (
    <Layout>
        <ToastContainer />
        <div>
            <p>Products</p>
            <div>
                <div className="flex justify-around items-center">
                    <div className="w-[75%] relative">
                        <TextInput placeholder="Search for Products..." name="search" value={''} onChange={()=>{}}/>
                        <IoSearchOutline className={'absolute right-[15px] top-[24px]'} size={'1.5rem'}/>
                    </div>
                    <div className="flex bg-primary items-center max-w-[150px] text-white p-3 cursor-pointer" onClick={()=>setOpenModal(true)}>
                        <FaPlus className={"mr-2"}/>
                        Add Products
                    </div>
                </div>
                {
                    openModal ? <Modal setOpenModal={setOpenModal}/> : <></>
                }
            </div>
        </div>
    </Layout>
  )
}

export default Products