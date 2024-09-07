import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Layout from '@/component/Layout';

const Product = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductData = async () =>{
        try{
            setLoading(true);
            const res = await fetch(`/api/combined-details/single-product?productName=${params?.slug}`,{
                method: 'GET'
            });
            setLoading(false)
            const data = await res?.json();
            setData(data[0])
        }catch(err){
            console.log(err?.message)
        }
    }

    useEffect(()=>{
        if (params?.slug) {
            fetchProductData();
        }
    },[params?.slug])
  return (
    <Layout>
        <div>
            {
                loading ? <div className='loading'></div> :
                !loading && data === undefined ? <div>No data found</div>
                :
                <div className='flex items-center gap-[20px] mt-6'>
                <div>
                    {
                        data?.imageDetails?.length !== 0 ? data?.imageDetails?.map(({productPic})=>(
                            <img className='max-w-[300px]' src={productPic} alt='product' key={productPic}/>
                        ))
                        :
                        <img className='max-w-[300px]' src={'/favicon.ico'} alt='product'/>
                    }
                </div>
                <div className='product_details'>
                    <p>Product Name: {data?.productName}</p>
                    <p>Product Description: {data?.description ? data?.description : 'Nil'}</p>
                    <p>Specifications: {data?.specifications ? data?.specifications : 'Nil'}</p>
                    <p>Regular Price: {data?.regularPrice ? data?.regularPrice : '0'}</p>
                    <p>Sales Price: {data?.salesPrice ? data?.salesPrice : '0'}</p>
                    <p>Quantity Left: {data?.quantity}</p>
                </div>
            </div>
            }
        </div>
    </Layout>
  )
}

export default Product