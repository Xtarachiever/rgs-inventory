import { GoPackage } from "react-icons/go";
import styles from './styles.module.css';
import { PieChart } from "../charts/PieChart";
const DashboardLayout = ({totalProductsAvailable,purchasesToBeReceived,noOfUnpaidProducts}) => {
    const totalProducts = totalProductsAvailable + purchasesToBeReceived
  return (
    <div>
        <div className={`flex w-full justify-between ${styles.dashboard_container}`}>
            <div className={styles.sales_table}>
                <p className={styles.header}>Sales Activity</p>
                <div className={styles.analytics_div}>
                    <div className={styles.sales_analytics}>
                        <p className={styles.sales_number}>{noOfUnpaidProducts ? noOfUnpaidProducts : 0}</p>
                        <p>QTY</p>
                        <span className={styles.sales_info}><GoPackage /> To be paid</span>
                    </div>
                    <div className={styles.sales_analytics}>
                        <p className={styles.sales_number}>{purchasesToBeReceived ? purchasesToBeReceived : 0}</p>
                        <p>QTY</p>
                        <span className={styles.sales_info}><GoPackage /> To be received</span>
                    </div>
                    <div className={styles.sales_analytics}>
                        <p className={styles.sales_number}>{totalProductsAvailable ? totalProductsAvailable : 0}</p>
                        <p>QTY</p>
                        <span className={styles.sales_info}><GoPackage /> At hand</span>
                    </div>
                    <div className={styles.sales_analytics}>
                        <p className={styles.sales_number}>{ totalProducts ? totalProducts : 0}</p>
                        <p>QTY</p>
                        <span className={styles.sales_info}><GoPackage /> Total products</span>
                    </div>
                </div>
            </div>
            <div className={styles.inventory_summary}>
                <p className={styles.header}>Inventory Summary</p>
                <div className={styles.summary_div}>
                    <p>Quantity in Hand: <span className="font-bold float-right">{totalProductsAvailable ? totalProductsAvailable : 0}</span></p>
                    <p>Quantity to be received: <span className="font-bold float-right">{purchasesToBeReceived ? purchasesToBeReceived : 0}</span></p>
                    <p>Quantity to be delivered: <span className="font-bold float-right">10</span></p>
                </div>
            </div>
        </div>
        <div className={`mt-10 gap-[20px] ${styles.products_details_container}`}>
            <div className={styles.products_details}>
                <p className={styles.header}>Product Details</p>
                <div className={`flex items-center ${styles.products_details_div}`}>
                    <div className={styles.products_detail}>
                        <p>Low Stock Items: <span>22</span></p>
                        <p>Low Stock Items: <span>22</span></p>
                        <p>Low Stock Items: <span>22</span></p>
                    </div>
                    <div className="w-[40%] min-w-[200px]">
                        <PieChart />
                    </div>
                </div>
            </div>
            <div className={styles.top_products}>
                <p className={styles.header}>Top 3 Products for the week</p>
                <div className={styles.top_products_div}>
                    <div className="text-center">
                        <img src="./favicon.ico" alt="default image" className="w-[70px]"/>
                        <p>Coffee Table</p>
                        <p>20ltrs</p>
                    </div>
                    <div className="text-center">
                        <img src="./favicon.ico" alt="default image" className="w-[70px]"/>
                        <p>Coffee Table</p>
                        <p>20ltrs</p>
                    </div>
                    <div className="text-center">
                        <img src="./favicon.ico" alt="default image" className="w-[70px]"/>
                        <p>Coffee Table</p>
                        <p>20ltrs</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout