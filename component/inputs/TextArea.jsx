import styles from './styles.module.css';

const TextAreaInput = ({placeholder,value,onChange,name,rows}) => {
  return (
    <div className={`w-full ${styles.input_field} py-3`}>
        <textarea type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} rows={rows ? rows : 4}></textarea>
    </div>
  )
}

export default TextAreaInput;