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
import EditProductHook from "@/hooks/EditProductHook";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  const { productName:updateProductName, fetchData } =  EditProductHook();

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
  } = AddProductHook();

  const handleUpdate = async (id) =>{
    try {
      await fetchData(id);
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
    const fetchProducts = async () => {
      const res = await fetch("/api/products/get-product", {
        method: "GET",
      });
      const data = await res.json();
      setData(data?.products);
    };

    fetchProducts();

    // console.log(data);
  }, []);
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
                <button className="update-product" onClick={()=>handleUpdate(row.original._id)}>Update</button>
            )
        }
      },
    ],
    []
  );

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
          <div className="overflow-scroll mt-8">
            <Table columns={columns} data={data} />
          </div>
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
