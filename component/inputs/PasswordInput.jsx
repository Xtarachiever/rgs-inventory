import { useState } from 'react';
import styles from './styles.module.css';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const PasswordInput = ({placeholder}) => {
    const [visible, setVisibility] = useState(false)
    const [type, setType] = useState('password')

    const handleToggle = () =>{
        if(type === 'password'){
            setType('text')
        }else{
            setType('password')
        }
        setVisibility(!visible)
    }
  return (
    <div className={`w-full ${styles.input_field} py-3 relative`}>
        <input type={type} placeholder={placeholder} /> 
        <div onClick={handleToggle} className="absolute right-5 top-6">
            {
                visible ? <IoEyeOffOutline fontSize="1.5rem"/>
                :
                <IoEyeOutline fontSize="1.5rem"/>
            }
        </div>
    </div>
  )
}

export default PasswordInput