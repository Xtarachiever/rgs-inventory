import Layout from "@/component/Layout";
import SalesModal from "@/component/products/SalesModal";
import SearchButton from "@/component/reusable-search/SearchButton";
import SalesHook from "@/hooks/SalesHook";
import { setSales, updateSales } from "@/store/slices/SaleSlice";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useRouter } from "next/navigation";

const Sales = () => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { productName, customerName, salesPrice, quantity, loading, handleSubmit, handleValueChange,setLoading } = SalesHook();

  const sales = useSelector((state)=>state.sales.sales);

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
