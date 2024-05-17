import { useState } from "react";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import TextAreaInput from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";
import styles from "./styles.module.css";
import { IoClose } from "react-icons/io5";

const PurchaseModal = ({
  productName,
  purchasePrice,
  description,
  vendorName,
  quantity,
  billStatus,
  deliveryStatus,
  handleSubmit,
  handleValueChange,
  errors,
  params,
  onSubmit,
  setOpenModal,
}) => {
  return (
    <div className={styles.product_wrapper}>
      <div className={`${styles.product_container} relative pb-5`}>
        <IoClose
          className="absolute top-[10px] right-[10px] cursor-pointer"
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
              <TextInput
                placeholder="Product Name"
                name="productName"
                value={productName}
                onChange={(e) =>
                  handleValueChange("productName", e.target.value)
                }
              />
              {errors?.productName && (
                <p className="text-red-500">{errors?.productName?.message}</p>
              )}
              <TextInput
                placeholder="Vendor Name"
                name="vendorName"
                value={vendorName}
                onChange={(e) =>
                  handleValueChange("vendorName", e.target.value)
                }
              />
              {errors?.vendorName && (
                <p className="text-red-500">{errors?.vendorName?.message}</p>
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
              <div className="flex justify-between gap-[20px]">
                <div className={"w-full text-left"}>
                  <p>Quantity</p>
                  <NumberInput
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
                  <p>Purchase Price</p>
                  <NumberInput
                    value={purchasePrice}
                    price={true}
                    onChange={(e) =>
                      handleValueChange("purchasePrice", e.target.value)
                    }
                  />
                  {errors?.purchasePrice && (
                    <p className="text-red-500">
                      {errors?.purchasePrice?.message}
                    </p>
                  )}
                </div>
              </div>
              <br />
              <div className="flex justify-between gap-[20px]">
                <div className="w-full">
                  <SelectInput
                    options={["Paid", "Unpaid"]}
                    defaultName="Bill Status"
                    onChange={(e) =>
                      handleValueChange("billStatus", e.target.value)
                    }
                    name="billStatus"
                  />
                  {errors?.billStatus && (
                    <p className="text-red-500">{errors?.billStatus?.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <SelectInput
                    options={["Ordered", "Delivered", "Transit"]}
                    defaultName="Delivery Status"
                    onChange={(e) =>
                      handleValueChange("deliveryStatus", e.target.value)
                    }
                    name="deliveryStatus"
                  />
                  {errors?.deliveryStatus && (
                    <p className="text-red-500">
                      {errors?.deliveryStatus?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5 pt-6">
              <button type="submit" className="bg-primary px-4 py-2 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
