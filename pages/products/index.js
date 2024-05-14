import Layout from "@/component/Layout";
import TextInput from "@/component/inputs/TextInput";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "@/component/products/Modal";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useMemo } from "react";
import AddProductHook from "@/hooks/AddProductHook";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const products = useSelector((state)=>state.products.products)
  const [data, setData] = useState([]);
  const router = useRouter();

  const {
    salesPrice,
    shortName,
    productName,
    description,
    errors,
    regularPrice,
    features,
    specifications,
    handleValueChange,
    handleSubmit,
    reset,
    loading
  } = AddProductHook();

  const handleUpdate = async (id) =>{
    try {
      // await fetchData(id);
      if(id){
        router.push(`/products/${id}`)
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  const onSubmit = async (values) =>{
    try{
        const res = await fetch('/api/products/add-product',{
            method:"POST",
            body:JSON.stringify(values),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        if(res.ok){
            toast.success('Product Successfully added');
            reset();
            setOpenModal(false)
        }
        if(!res.ok){
            toast.error(res.statusText)
        }
    }catch(err){
        toast.error(err?.message)
    }
}

  useEffect(() => {
    setData(products)
  }, [products]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "productName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Regular Price",
        accessor: "regularPrice",
      },
      {
        Header: "Sales Price",
        accessor: "salesPrice",
      },
      {
        Header: "Specifications",
        accessor: "specifications",
      },
      {
        Header: "Actions",
        Cell: ({row}) => {
            return (
                <button className="update-product" onClick={()=>handleUpdate(row.original.slug)}>Update</button>
            )
        }
      },
    ],
    []
  );

  useEffect(()=>{
    if(openModal){
      // document.body.classList.add('modal-open');
      document.body.setAttribute('style', 'overflow: hidden;');
    }else{
      document.body.setAttribute('style', 'overflow: scroll;');
    }
  },[openModal])

  return (
    <Layout>
      <ToastContainer />
      <div className="overflow-hidden">
        <div>
          <div className="flex-col sm:flex-row flex justify-around items-center gap-[20px]">
            <div className="w-[75%] relative">
              <TextInput
                placeholder="Search for Products..."
                name="search"
                value={""}
                onChange={() => {}}
              />
              <IoSearchOutline
                className={"absolute right-[15px] top-[24px]"}
                size={"1.5rem"}
              />
            </div>
            <div
              className="flex bg-primary items-center max-w-[150px] text-white p-3 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <FaPlus className={"mr-2"} />
              Add Products
            </div>
          </div>
          {
            loading ? 
            <div className="loader">loading</div>
            :
            <div className="overflow-scroll mt-8">
                <Table columns={columns} data={data} />
            </div>
          }
          {openModal ? (
            <Modal
              reset={reset}
              setOpenModal={setOpenModal}
              salesPrice={salesPrice}
              description={description}
              regularPrice={regularPrice}
              productName={productName}
              errors={errors}
              shortName={shortName}
              features={features}
              specifications={specifications}
              handleSubmit={handleSubmit}
              handleValueChange={handleValueChange}
              onSubmit={onSubmit}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
