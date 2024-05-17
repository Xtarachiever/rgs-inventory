import Layout from "@/component/Layout";
import { useEffect, useState } from "react";
import Modal from "@/component/products/Modal";
import { ToastContainer, toast } from "react-toastify";
import Table from "@/component/tables/Table";
import { useMemo } from "react";
import AddProductHook from "@/hooks/AddProductHook";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SearchButton from "@/component/reusable-search/SearchButton";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const products = useSelector((state) => state.products.products);
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
      const res = await fetch("/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Product Successfully added");
        reset();
        setOpenModal(false);
      }
      if (!res.ok) {
        toast.error(res.statusText);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    setData(products);
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

  return (
    <Layout>
      <ToastContainer />
      <div className="overflow-hidden">
        <div>
          <SearchButton
            modal={openModal}
            setOpenModal={setOpenModal}
            name={"search"}
            placeholder={"Search for Products..."}
            buttonName={"Add Products"}
          />
          {loading ? (
            <div className="loader">loading</div>
          ) : (
            <div className="overflow-scroll mt-8">
              {data ? (
                <Table columns={columns} data={data} />
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
