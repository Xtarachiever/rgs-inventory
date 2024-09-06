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
import { getSession, useSession } from "next-auth/react";
import Paginate from "@/component/pagination/Paginate";

const Sales = () => {
  const router = useRouter();

  const {data:session} = useSession();

  const sales = useSelector((state)=>state.sales.sales);

  const [openModal, setOpenModal] = useState(false);
  const [filteredSales, setFilteredSales] = useState(sales)
  const dispatch = useDispatch();
  const { productName, customerName, salesPrice, quantity, loading, handleSubmit, handleValueChange,setLoading } = SalesHook();


  const [searchValue, setSearchValue] = useState('')

  const [itemsOffSet, setItemOffset] = useState(0)


  const limit = 5
  const endItemOffSet = itemsOffSet + limit;
  const currentItems = filteredSales.slice(itemsOffSet,endItemOffSet)

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
        Header: "Made By",
        accessor: "madeBy"
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
          body:JSON.stringify({
            productName: values.productName,
            salesPrice: values.salesPrice,
            quantity: values.quantity,
            customerName:values.customerName,
            madeBy:`${session?.user?.firstName} ${session?.user?.lastName}`
          }),
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
      <ToastContainer limit={1}/>
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
        <div className="overflow-scroll mt-8">
        {
          loading ? <div className="loader"></div> :
          ((filteredSales && filteredSales?.length !== 0) ? 
          <div>
            <Table data={currentItems} columns={columns}/>
            <Paginate items={filteredSales} itemsPerPage={limit} totalItems={filteredSales?.length} setItemOffset={setItemOffset} itemsOffSet={itemsOffSet}/>
          </div>
          : <div>No Sales Found</div>)
        }
        </div>
      </div>
    </Layout>
  );
};

export default Sales;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
