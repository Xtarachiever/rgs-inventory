import Layout from "@/component/Layout";
import SalesModal from "@/component/products/SalesModal";
import SearchButton from "@/component/reusable-search/SearchButton";
import SalesHook from "@/hooks/SalesHook";
import { setSales, updateSales } from "@/store/slices/SaleSlice";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useRouter } from "next/navigation";

const Sales = () => {
  const router = useRouter();

  const sales = useSelector((state)=>state.sales.sales);

  const [openModal, setOpenModal] = useState(false);
  const [filteredSales, setFilteredSales] = useState(sales)
  const dispatch = useDispatch();
  const { productName, customerName, salesPrice, quantity, loading, handleSubmit, handleValueChange,setLoading } = SalesHook();


  const [searchValue, setSearchValue] = useState('')

  const handleSalesUpdate = async (id) => {
    try {
      if (id) {
        router.push(`/sales/${id}`);
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
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
      },
      {
        Header: "Sales Price",
        accessor: "salesPrice",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          return (
            <button
              className="update-product"
              onClick={() => handleSalesUpdate(row.original._id)}
            >
              Update
            </button>
          );
        },
      },
    ],
    []
  );

  const onSubmit = async (values) =>{
      try{
        setLoading(true);
        const res = await fetch('/api/sales',{
          method:'POST',
          body:JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setLoading(false)
        const data = await res.json();
        if(!res.ok){
          toast.error(data?.message)
        }else{
          setOpenModal(false)
          dispatch(updateSales(data?.sale))
        }
      }catch(err){
        toast.success(err?.message)
      }
  }

  const handleSearchValue = (e) =>{
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue)
    const filteredData = filteredSales.filter(({customerName,productName})=>{
      return (
        customerName.toLowerCase().includes(inputValue) ||
        productName.toLowerCase().includes(inputValue)
      )
    })
    if(inputValue !== ''){
      setFilteredSales(filteredData)
    }else{
      setFilteredSales(sales)
    }
  }

  useEffect(()=>{
    setFilteredSales(sales)
  },[sales])

  return (
    <Layout>
      <ToastContainer />
      <div>
        <SearchButton
          onChange={(e)=>handleSearchValue(e)}
          value={searchValue}
          modal={openModal}
          setOpenModal={setOpenModal}
          name={"search"}
          placeholder={"Search for Sales..."}
          buttonName={"Record Sales"}
          
        />
        {openModal ? (
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
        ) : (
          <></>
        )}
        {
          loading ? <p>Loading...</p> :
          ((filteredSales && filteredSales?.length !== 0) ? 
          <Table data={filteredSales} columns={columns}/>
          : <div>No Sales Found</div>)
        }
      </div>
    </Layout>
  );
};

export default Sales;
