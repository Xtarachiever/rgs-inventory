import Layout from "@/component/Layout";
import Modal from "@/component/products/Modal";
import EditProductHook from "@/hooks/EditProductHook";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const params = useParams();

//   console.log(fetchData)
  const [openModal, setOpenModal] = useState(true);


  const {
    regularPrice,
    salesPrice,
    description,
    shortName,
    productName,
    features,
    specifications,
    errors,
    handleSubmit,
    handleValueChange,
    singleProduct,
    fetchData,
    reset
  } = EditProductHook();

  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(()=>{
    const fetchProduct = async ()=>{
      try{
        if(params?.slug){
          await fetchData(params?.slug);
          // console.log(singleProduct)
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchProduct();
  },[params?.slug,fetchData])

  return (
    <Layout>
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
      />
    </Layout>
  );
};

export default SingleProduct;
