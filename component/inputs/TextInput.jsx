import styles from './styles.module.css';

const TextInput = ({placeholder,value,onChange,name}) => {
  return (
    <div className={`w-full ${styles.input_field} py-3`}>
        <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange}/> 
    </div>
  )
}

export default TextInput