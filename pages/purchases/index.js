import Layout from "@/component/Layout";
import SearchButton from "@/component/reusable-search/SearchButton";
import { useEffect, useState, useMemo } from "react";
import PurchaseHook from "@/hooks/PurchasesHook";
import PurchaseModal from "@/component/products/PurchaseModal";
import { ToastContainer } from "react-toastify";
import Table from "@/component/tables/Table";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updatePurchases } from "@/store/slices/PurchaseSlice";
const Purchases = () => {
  const router = useRouter();
  const [modal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const purchases = useSelector((state)=>state.purchases.purchases);
  const [searchValue, setSearchValue] = useState('')

  const [filteredPurchases, setFilteredPurchases] = useState([])
  
  const dispatch = useDispatch();
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
    purchaseLoader
  } = PurchaseHook();

  const onSubmit = async (values) =>{
    try{
      setLoading(true)
      const res = await fetch('/api/purchases/add',{
        method:'POST',
        body:JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      setLoading(false)
      if(res.ok){
        setOpenModal(false)
        dispatch(updatePurchases(values))
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
        Header: "Quantity",
        accessor: "quantity",
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

  const handlePurchaseSearch = (e) =>{
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    const filteredResults = filteredPurchases?.filter(({productName, vendorName})=>{
      return(
        productName.toLowerCase().includes(inputValue) || 
        vendorName.toLowerCase().includes(inputValue)
      )
    })
    
    if(inputValue !== ''){
      setFilteredPurchases(filteredResults)
    }else{
      setFilteredPurchases(purchases)
    }
  }

  useEffect(()=>{
    setFilteredPurchases(purchases)
  },[purchases])


  return (
    <Layout>
      <ToastContainer limit={1}/>
      <div className="w-full">
        <SearchButton
          modal={modal}
          setOpenModal={setOpenModal}
          name={"search"}
          placeholder={"Search for Purchases..."}
          buttonName={"Add Purchases"}
          value={searchValue}
          onChange={(e)=>handlePurchaseSearch(e)}
        />
        <div className="overflow-scroll mt-8">
          {
            purchaseLoader ? <div className="loader"></div> :
            (filteredPurchases && filteredPurchases?.length !== 0) ? 
            <Table data={filteredPurchases} columns={columns}/>
            : <div>No Purchase Found</div>
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
            loading={loading}
          />
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Purchases;
