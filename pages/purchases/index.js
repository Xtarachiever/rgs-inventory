import Layout from "@/component/Layout";
import SearchButton from "@/component/reusable-search/SearchButton";
import { useEffect, useState, useMemo } from "react";
import PurchaseHook from "@/hooks/PurchasesHook";
import PurchaseModal from "@/component/products/PurchaseModal";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const Purchases = () => {
  const router = useRouter();
  const [modal, setOpenModal] = useState(false);

  const purchases = useSelector((state)=>state.purchases.purchases)
  // console.log(purchases)
  const {
    productName,
    quantity,
    deliveryStatus,
    description,
    purchasePrice,
    vendorName,
    billStatus,
    handleSubmit,
    handleValueChange,
    errors,
  } = PurchaseHook();

  const onSubmit = async (values) =>{
    try{
      const res = await fetch('/api/purchases/add',{
        method:'POST',
        body:JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      if(res.ok){
        toast.success("Purchases successfully retrieved")
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    try {
      // await fetchData(id);
      if (id) {
        router.push(`/purchases/${id}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "productName",
      },
      {
        Header: "Vendor Name",
        accessor: "vendorName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Purchase Price",
        accessor: "purchasePrice",
      },
      {
        Header: "Delivery Status",
        accessor: "deliveryStatus",
      },
      {
        Header: "Bill Status",
        accessor: "billStatus",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          return (
            <button
              className="update-product"
              onClick={() => handleUpdate(row.original._id)}
            >
              Update
            </button>
          );
        },
      },
    ],
    []
  );


  return (
    <Layout>
      <ToastContainer />
      <div className="w-full">
        <SearchButton
          modal={modal}
          setOpenModal={setOpenModal}
          name={"search"}
          placeholder={"Search for Products..."}
          buttonName={"Add Purchases"}
        />
        <div>
          {
            purchases ? 
            <Table data={purchases} columns={columns}/>
            : <></>
          }
        </div>
        {modal ? (
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
          />
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Purchases;
