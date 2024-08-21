import Layout from "@/component/Layout";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import SalesModal from "@/component/products/SalesModal";
import EditSalesHook from "@/hooks/EditSalesHook";
import { useParams, useRouter } from "next/navigation";
const UpdateSales = () => {
  const router = useRouter();
  const params = useParams();
  const {
    handleSubmit,
    handleValueChange,
    productName,
    quantity,
    salesPrice,
    loading,
    customerName,
    fetchData
  } = EditSalesHook();

  const [openModal, setOpenModal] = useState(true);

  useEffect(()=>{
    const fetchSale = async ()=>{
      try{
        if(params?.id){
          await fetchData(params?.id);
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchSale();
  },[params?.id,fetchData])

  useEffect(()=>{
    if(!openModal){
      router.push("/sales")
    }
  },[openModal, router])

  const onSubmit = async (values) =>{
    try{
      const res = await fetch(`/api/sales/update-sale?id=${params?.id}`,{
        body:JSON.stringify(values),
        method:'PATCH',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if(res?.ok){
        setOpenModal(false)
        router.push('/sales')
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <SalesModal
        setOpenModal={setOpenModal}
        productName={productName}
        quantity={quantity}
        salesPrice={salesPrice}
        loading={loading}
        handleSubmit={handleSubmit}
        handleValueChange={handleValueChange}
        onSubmit={onSubmit}
        customerName={customerName}
      />
    </Layout>
  );
};

export default UpdateSales;
