import TextAreaInput from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";
import styles from "./styles.module.css";
import { IoClose } from "react-icons/io5";

const SalesModal = ({
  setOpenModal,
  salesPrice,
  productName,
  errors,
  quantity,
  handleValueChange,
  handleSubmit,
  reset,
  onSubmit,
  params,
  update,
  loading,
  customerName
}) => {
  return (
    <div className={styles.product_wrapper}>
      <div className={`${styles.product_container} relative pb-5`}>
        <IoClose
          className="absolute top-[10px] right-[10px] cursor-pointer"
          fontSize={"1.8rem"}
          onClick={() => setOpenModal(false)}
        />
        <div className={`$mt-8 text-center ${styles.sales_wrapper}`}>
          {params ? (
            <p className="text-xl">Update Product for {params?.slug}</p>
          ) : (
            <p className="text-xl">Product Form</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6">
              {
                // update ?
                // <TextInput
                //   placeholder="Product Name"
                //   name="productName"
                //   value={productName}
                //   update={update}
                //   onChange={(e) =>
                //     handleValueChange("productName", e.target.value)
                //   }
                // />
                // :
                <div>
                  <p className="text-left">Product Name</p>
                  <TextInput
                    placeholder="Product Name"
                    name="productName"
                    value={productName}
                    onChange={(e) =>
                      handleValueChange("productName", e.target.value)
                    }
                  />
                  {errors?.productName && (
                    <p className="text-red-500">
                      {errors?.productName?.message}
                    </p>
                  )}
                </div>
              }
              <div className="w-full">
                <p className="text-left">Quantity</p>
                <TextInput
                  placeholder="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) =>
                    handleValueChange("quantity", e.target.value)
                  }
                />
                {errors?.quantity && (
                  <p className="text-red-500">{errors?.quantity?.message}</p>
                )}
              </div>
              <div className="w-full">
                <p className="text-left">Sales Price</p>
                <TextInput
                  placeholder="Sales Price"
                  name="salesPrice"
                  value={salesPrice}
                  onChange={(e) =>
                    handleValueChange("salesPrice", e.target.value)
                  }
                />
                {errors?.salesPrice && (
                  <p className="text-red-500">{errors?.salesPrice?.message}</p>
                )}
              </div>
              <div className="w-full">
                <p className="text-left">Customer's Name</p>
                <TextInput
                  placeholder="Customer's Name"
                  name="customerName"
                  value={customerName}
                  onChange={(e) =>
                    handleValueChange("customerName", e.target.value)
                  }
                />
                {errors?.customerName && (
                  <p className="text-red-500">{errors?.customerName?.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary px-4 py-2 mt-3 text-white"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalesModal;
