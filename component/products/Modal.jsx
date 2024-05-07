import TextAreaInput from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";
import styles from "./styles.module.css";
import { IoClose } from "react-icons/io5";

const Modal = ({
  setOpenModal,
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
  onSubmit,
  params,
  update
}) => {
  return (
    <div className={styles.product_wrapper}>
      <div className={`${styles.product_container} relative`}>
        <IoClose
          className="absolute top-[10px] right-[10px]"
          fontSize={"1.8rem"}
          onClick={() => setOpenModal(false)}
        />
        <div className="mt-8 text-center">
          {params ? (
            <p className="text-xl">Update Product for {params?.slug}</p>
          ) : (
            <p className="text-xl">Product Form</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6">
              {
                update ?
                <TextInput
                  placeholder="Product Name"
                  name="productName"
                  value={productName}
                  update={update}
                  onChange={(e) =>
                    handleValueChange("productName", e.target.value)
                  }
                />
                :
                <TextInput
                  placeholder="Product Name"
                  name="productName"
                  value={productName}
                  onChange={(e) =>
                    handleValueChange("productName", e.target.value)
                  }
                />
              }
              {errors?.productName && (
                <p className="text-red-500">{errors?.productName?.message}</p>
              )}
              <TextInput
                placeholder="Short Name"
                name="shortName"
                value={shortName}
                onChange={(e) => handleValueChange("shortName", e.target.value)}
              />
              {errors?.shortName && (
                <p className="text-red-500">{errors?.shortName?.message}</p>
              )}
              <TextAreaInput
                placeholder="Product Description"
                name="description"
                value={description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
              />
              {errors?.description && (
                <p className="text-red-500">{errors?.description?.message}</p>
              )}
              <div className="flex gap-[20px] justify-between">
                <div className="w-full">
                  <TextInput
                    placeholder="Regular Price"
                    type="number"
                    name="regularPrice"
                    value={regularPrice}
                    onChange={(e) =>
                      handleValueChange("regularPrice", e.target.value)
                    }
                  />
                  {errors?.regularPrice && (
                    <p className="text-red-500">
                      {errors?.regularPrice?.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <TextInput
                    placeholder="Sales Price"
                    name="salesPrice"
                    value={salesPrice}
                    onChange={(e) =>
                      handleValueChange("salesPrice", e.target.value)
                    }
                  />
                  {errors?.salesPrice && (
                    <p className="text-red-500">
                      {errors?.salesPrice?.message}
                    </p>
                  )}
                </div>
              </div>
              <TextInput
                placeholder="Features"
                name="features"
                value={features}
                onChange={(e) => handleValueChange("features", e.target.value)}
              />
              {errors?.features && (
                <p className="text-red-500">{errors?.features?.message}</p>
              )}
              <TextInput
                placeholder="Specifications"
                name="specifications"
                value={specifications}
                onChange={(e) =>
                  handleValueChange("specifications", e.target.value)
                }
              />
              {errors?.specifications && (
                <p className="text-red-500">
                  {errors?.specifications?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary px-4 py-2 mt-3 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
