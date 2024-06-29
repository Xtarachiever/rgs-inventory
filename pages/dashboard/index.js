import DashboardLayout from '@/component/Dashboard/DashboardLayout'
import Layout from '@/component/Layout'
import { getSession } from "next-auth/react";
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const products = useSelector((state)=>state.products.products)
  const purchases = useSelector((state)=>state.purchases.purchases)

  // Purchases to be recieved 
  let purchasesToBeReceived = 0;
  for(let i=0;i<purchases.length;i++){
    if(purchases[i].deliveryStatus === 'Ordered' || purchases[i].deliveryStatus === 'Transit'){
      purchasesToBeReceived += 1
    }
  }

  // Bill Status || Purchases to be paid for 
  let noOfUnpaidProducts = 0;
  for(let i=0;i<purchases.length;i++){
    if(purchases[i].billStatus === 'Unpaid'){
      noOfUnpaidProducts += 1
    }
  }

  const totalProductsAvailable = products?.reduce((total,products)=> products.quantity + total, 0)
  return (
    <div>
        <Layout>
            <DashboardLayout purchasesToBeReceived={purchasesToBeReceived} noOfUnpaidProducts={noOfUnpaidProducts} totalProductsAvailable={totalProductsAvailable}/>
        </Layout>
    </div>
  )
}

export default DashboardPage;

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { session },
    };
}