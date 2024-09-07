import Layout from "@/component/Layout";
import Modal from "@/component/products/Modal";
import EditProductHook from "@/hooks/EditProductHook";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SingleProduct = () => {
  const params = useParams();
  const router = useRouter();
//   console.log(fetchData)
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const update= true;

  const {
    regularPrice,
    salesPrice,
    description,
    shortName,
    productName,
    features,
    specifications,
    errors,
    quantity,
    handleSubmit,
    handleValueChange,
    singleProduct,
    fetchData,
    reset
  } = EditProductHook();

  const onSubmit = async (values) => {
    try{
      setLoading(true)
      if(values){
        const res = await fetch(`/api/products/update-product?id=${singleProduct?._id}`,{
          method:"PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body:JSON.stringify({
            productName:values.productName,
            shortName:values.shortName,
            description:values.description,
            features:values.features,
            specifications:values.specifications,
            salesPrice:values.salesPrice,
            regularPrice:values.regularPrice,
            quantity:values.quantity,
          })
        })
        setLoading(false)
        if(res?.ok){
          toast.success("Product successfully updated");
          reset();
          setOpenModal(false)
        }
      }
    }catch(err){
      toast.error(err?.message)
    }
  };

  useEffect(()=>{
    const fetchProduct = async ()=>{
      try{
        if(params?.slug){
          await fetchData(params?.slug);
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchProduct();
  },[params?.slug,fetchData])

  useEffect(()=>{
    if(!openModal){
      router.push("/products")
    }
  },[openModal, router])

  return (
    <Layout>
      <ToastContainer limit={1}/>
      <Modal
        setOpenModal={setOpenModal}
        regularPrice={regularPrice}
        salesPrice={salesPrice}
        description={description}
        shortName={shortName}
        features={features}
        specifications={specifications}
        productName={productName}
        errors={errors}
        handleSubmit={handleSubmit}
        handleValueChange={handleValueChange}
        params={params}
        onSubmit={onSubmit}
        reset={reset}
        update={update}
        quantity={quantity}
        loading={loading}
      />
    </Layout>
  );
};

export default SingleProduct;
