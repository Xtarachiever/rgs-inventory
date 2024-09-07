import Layout from "@/component/Layout";
import { useEffect, useState } from "react";
import Modal from "@/component/products/Modal";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useMemo } from "react";
import AddProductHook from "@/hooks/AddProductHook";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SearchButton from "@/component/reusable-search/SearchButton";
import { updateProducts } from "@/store/slices/ProductSlice";
import { getSession } from "next-auth/react";
const Products = () => {
  const [openModal, setOpenModal] = useState(false);

  const sortedProducts = useSelector((state) => state.products.products);

  const products = useMemo(() => {
    return [...sortedProducts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [sortedProducts]);


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const [loadingData, setLoadingData] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()

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
    loading,
    quantity
  } = AddProductHook();

  const handleUpdate = async (id) => {
    try {
      // await fetchData(id);
      if (id) {
        router.push(`/products/${id}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoadingData(true)
      const res = await fetch("/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setLoadingData(false)
      if (res.ok) {
        setOpenModal(false);
        dispatch(updateProducts(values))
        reset();
      }
      if (!res.ok) {
        toast.error(res.statusText);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

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
        Header: "Quantity",
        accessor: "quantity",
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
        Cell: ({ row }) => {
          return (
            <button
              className="update-product"
              onClick={() => handleUpdate(row.original.slug)}
            >
              Update
            </button>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (openModal) {
      // document.body.classList.add('modal-open');
      document.body.setAttribute("style", "overflow: hidden;");
    } else {
      document.body.setAttribute("style", "overflow: scroll;");
    }
  }, [openModal]);

  const handleProductSearch = (e) =>{
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    const filteredResults = filteredProducts?.filter(({productName})=>{
      return(
        productName.toLowerCase().includes(inputValue)
      )
    })

    if(inputValue !== ''){
      setFilteredProducts(filteredResults)
    }else{
      setFilteredProducts(products)
    }
  }

  useEffect(()=>{
    setFilteredProducts(products)
  },[products])

  return (
    <Layout>
      <ToastContainer limit={1}/>
      <div className="overflow-hidden">
        <div className="min-h-[100vh]">
          <SearchButton
            modal={openModal}
            setOpenModal={setOpenModal}
            name={"search"}
            placeholder={"Search for Products..."}
            buttonName={"Add Products"}
            value={searchValue}
            onChange={(e)=>handleProductSearch(e)}
          />
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="overflow-scroll mt-8">
              {(filteredProducts && filteredProducts?.length !== 0) ? (
                <Table columns={columns} data={filteredProducts} />
              ) : (
                <p>No product found</p>
              )}
            </div>
          )}
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
              quantity={quantity}
              loading={loadingData}
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
