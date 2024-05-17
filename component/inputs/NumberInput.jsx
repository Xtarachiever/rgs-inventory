import styles from './styles.module.css';

const NumberInput = ({value, price, onChange}) => {
  return (
    <div className={`w-full ${styles.number_input} text-left relative`}>
        {price ? <span className="absolute left-3 top-3">&#8358;</span> : ''}
        <input type="number" value={value ? value : 0} onChange={onChange} className={price ? styles.active : ''}/>
    </div>
  )
}

export default NumberInput