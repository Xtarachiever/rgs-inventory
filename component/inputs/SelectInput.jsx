import styles from './styles.module.css';

const SelectInput = ({defaultName, options, onChange, name}) => {
  return (
    <div className={`${styles.select} w-full`}>
        <select onChange={onChange} defaultValue={defaultName}>
            <option value={defaultName} disabled>
                {defaultName}
            </option>
            {
                options?.map((value)=>(
                    <option value={value} key={value}>{value}</option>
                ))
            }
        </select>
    </div>
  )
}

export default SelectInput