import { IoSearchOutline } from "react-icons/io5";
import styles from './styles.module.css'

const SearchInput = () => {
  return (
    <div className={`${styles.search_input} w-full`}>
        <input placeholder="Search on reports on products" name="name" type="text"/>
        <IoSearchOutline fontSize="1.2rem"/>
        <div className={`bg-primary ${styles.clickable_search_icon}`}>
            <IoSearchOutline fontSize="1.2rem"/>
        </div>
    </div>
  )
}

export default SearchInput