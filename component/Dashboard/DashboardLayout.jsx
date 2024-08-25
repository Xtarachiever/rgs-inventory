import { GoPackage } from "react-icons/go";
import styles from './styles.module.css';
import { PieChart } from "../charts/PieChart";
import { LineChart } from "../charts/LineChart";
import { useSelector } from "react-redux";
import SalesHook from "@/hooks/SalesHook";
import { useState, useEffect } from "react";
import { parseISO, format } from 'date-fns';


const DashboardLayout = ({totalProductsAvailable,purchasesToBeReceived,noOfUnpaidProducts}) => {

    const { loading } = SalesHook();

    const totalProducts = totalProductsAvailable + purchasesToBeReceived
    const sales = useSelector((state)=>state.sales.sales);

    const [dailySales, setDailySales] = useState({})

    const [topProducts, setTopProducts] = useState([])
    const [pieData, setPieData] = useState([]);
    const [images, setImages] = useState([]);

    const [imagesLoading,setImagesLoading] = useState(false)

    useEffect(() => {
        const salesByDay = {};

        sales.forEach(sale => {
            const date = format(parseISO(sale.createdAt), 'yyyy-MM-dd');
            if (!salesByDay[date]) {
                salesByDay[date] = 0;
            }
            salesByDay[date] += parseInt(sale.profitLoss);
        });

        setDailySales(salesByDay);
    }, [sales]);

    const getProductImages = async () => {
        try {
            setImagesLoading(true)
          const res = await fetch("/api/products/get-product-images/", {
            method: "GET",
          });
          setImagesLoading(false)
          const data = await res.json();
          setImages(data?.images)
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(()=>{
        getProductImages()
      },[])

    useEffect(()=>{
        const topProducts = {};
        
        sales?.forEach((sale)=>{
            const productName = sale?.productName;
            const productPic = images.find(({ title: dataProductName }) => dataProductName === productName)?.productPic;
            if(!topProducts[productName]){
                topProducts[productName] = {
                    quantity: sale?.quantity,
                    productPic: productPic || null 
                }
            }else{
                topProducts[productName].quantity += sale?.quantity;
            }
        })
        const sortedObj = Object.entries(topProducts).sort(([, valueA], [, valueB])=> valueB - valueA)
        const topThreeEntries = sortedObj.slice(0, 3);
        setTopProducts(Object.fromEntries(topThreeEntries))
        // sales.forEach((sale)=>sale.sort((a,b)=> a-b))   
    },[sales])


    const products = useSelector((state)=>state.products.products)

    useEffect(()=>{
       const cumulativeProduct = {};
       products?.map((product)=>{
        const productName = product?.productName

        if(!cumulativeProduct[productName]){
            cumulativeProduct[productName] = (product?.quantity/totalProductsAvailable).toFixed(2)
        }
       })
       setPieData(cumulativeProduct)
    },[products])


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
        {
            imagesLoading ? <div className="loader"></div> :
            <div>
                <div className={`mt-10 gap-[20px] ${styles.products_details_container}`}>
                    <div className={styles.products_details}>
                        <p className={styles.header}>Product Details</p>
                        <div className={`flex items-center ${styles.products_details_div}`}>
                            <div className="min-w-[200px]">
                                <PieChart data={pieData}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.top_products}>
                        <p className={styles.header}>Top 3 Products for the week</p>
                        {
                            Object.entries(topProducts)?.length !== 0
                            ?
                            <div className={styles.top_products_div}>
                                {
                                    Object.entries(topProducts).map(([key,value])=>(
                                        <div key={key}>
                                            <img src={value?.productPic ? value?.productPic : '/favicon.ico'} alt="default image" className=""/>
                                            <p className="py-2">{key}</p>
                                            <p>{value?.quantity}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <p>No product to show</p>
                        }
                    </div>
                </div>
                <div className="mt-4 py-6">
                    {
                        loading ? <div className="loader"></div> : sales?.length !== 0 ?
                        <LineChart sales={dailySales}/> :
                        <p>No data found</p>
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default DashboardLayout