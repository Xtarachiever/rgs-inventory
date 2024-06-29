import Layout from '@/component/Layout'
import PurchaseModal from '@/component/products/PurchaseModal'
import EditPurchaseHook from '@/hooks/EditPurchaseHook'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';

const SinglePurchase = () => {
    const params = useParams();
    const router = useRouter();

    const { fetchData, deliveryStatus, description, purchasePrice, vendorName, productName, quantity, billStatus, handleSubmit, handleValueChange, errors} = EditPurchaseHook();

    const [openModal, setOpenModal] = useState(true);
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) =>{
        try{
          setLoading(true)
          const res = await fetch(`/api/purchases/update-purchases?id=${params?.id}`,{
            method:"PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          });
          setLoading(false)
          if(res.ok){
            toast.success(res?.message)
            router.push('/purchases')
          }else{
            toast.error("Somthing went wrong")
          }

        }catch(err){
          toast.success(err?.message)
        }
    };

    useEffect(()=>{
        const fetchProduct = async ()=>{
          try{
            if(params?.id){
              await fetchData(params?.id);
            }
          }catch(err){
            console.log(err)
          }
        }
        fetchProduct();
      },[params?.id,fetchData])

      useEffect(()=>{
        if(!openModal){
          router.push("/purchases")
        }
      },[openModal, router])

  return (
    <Layout>
        <ToastContainer />
         <PurchaseModal
            handleSubmit={handleSubmit}
            handleValueChange={handleValueChange}
            productName={productName}
            quantity={quantity}
            deliveryStatus={deliveryStatus}
            description={description}
            purchasePrice={purchasePrice}
            vendorName={vendorName}
            billStatus={billStatus}
            setOpenModal={setOpenModal}
            onSubmit={onSubmit}
            errors={errors}
            loading={loading}
          />
    </Layout>
  )
}

export default SinglePurchase