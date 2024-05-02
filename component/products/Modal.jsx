import TextAreaInput from '../inputs/TextArea';
import TextInput from '../inputs/TextInput';
import styles from './styles.module.css';
import { IoClose } from "react-icons/io5";

const Modal = ({setOpenModal}) => {
  return (
    <div className={styles.product_wrapper}>
        <div className={`${styles.product_container} relative`}>
            <IoClose className="absolute top-[10px] right-[10px]" fontSize={"1.8rem"} onClick={()=>setOpenModal(false)}/>
            <div className="mt-8 text-center">
                <p className="text-xl">Product Form</p>
                <form >
                    <div className="px-6">
                        <TextInput placeholder="Product Name" name="productName" value={''} onChange={()=>{}}/>
                        <TextInput placeholder="Short Name" name="shortName" value={''} onChange={()=>{}}/>
                        <TextAreaInput placeholder="Product Description" name="description" value={''} onChange={()=>{}}/>
                        <div className="flex gap-[20px]">
                            <TextInput placeholder="Regular Price" name="regularPrice" value={''} onChange={()=>{}}/>
                            <TextInput placeholder="Sales Price" name="salesPrice" value={''} onChange={()=>{}}/>
                        </div>
                        <TextInput placeholder="Features" name="features" value={''} onChange={()=>{}}/>
                        <TextInput placeholder="Specifications" name="specifications" value={''} onChange={()=>{}}/>
                    </div>
                    <button type="submit" className="bg-primary px-4 py-2 mt-3 text-white">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Modal