import styles from './styles.module.css';

const TextInput = ({placeholder}) => {
  return (
    <div className={`w-full ${styles.input_field} py-3`}>
        <input type="text" placeholder={placeholder} /> 
    </div>
  )
}

export default TextInput