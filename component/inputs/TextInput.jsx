import styles from './styles.module.css';

const TextInput = ({placeholder,value,onChange,name,type,update}) => {
  return (
    <div className={`w-full ${styles.input_field} py-3`}>
        <input type={type ? type : 'text'} name={name} placeholder={placeholder} value={value} onChange={onChange} readOnly={update ? true : false}/> 
    </div>
  )
}

export default TextInput