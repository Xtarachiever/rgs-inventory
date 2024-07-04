import Layout from "@/component/Layout";
import SalesModal from "@/component/products/SalesModal";
import SearchButton from "@/component/reusable-search/SearchButton";
import SalesHook from "@/hooks/SalesHook";
import { setSales } from "@/store/slices/SaleSlice";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";

const Sales = () => {
  const [openModal, setOpenModal] = useState(false);
  const { productName, customerName, salesPrice, quantity, loading, handleSubmit, handleValueChange,setLoading } = SalesHook();

  const sales = useSelector((state)=>state.sales.sales)

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
              onClick={() => {}}
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
        if(res.ok){
          const data = await res.json();
          setOpenModal(false)
          dispatch(setSales(data?.sales))

          toast.success(data?.message)
        }
      }catch(err){
        console.log(err)
        toast.success(err?.message)
      }
  }
  return (
    <Layout>
      <ToastContainer />
      <div>
        <SearchButton
          modal={openModal}
          setOpenModal={setOpenModal}
          name={"search"}
          placeholder={"Search for Products..."}
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
          sales ? 
          <Table data={sales} columns={columns}/>
          : <></>
        }
      </div>
    </Layout>
  );
};

export default Sales;
