import { useForm } from "react-hook-form";
import { PurchaseValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const EditPurchaseHook = () =>{
    const [singlePurchase, setSinglePurchase] = useState([]);

    const { 
        handleSubmit, 
        setValue, 
        formState, 
        reset,
        watch } = useForm({
        resolver: yupResolver(PurchaseValidator),
        mode: 'all',
        defaultValues: {
            productName: "",
            vendorName: "",
            description:"",
            purchasePrice:0,
            billStatus:"",
            deliveryStatus:"",
            quantity:0,
        },
      });

      const fetchData = useCallback(async (id) =>{
        const res = await fetch(`/api/purchases/get-single-purchase?id=${id}`,{
            method:"GET"
        })
        if(res.ok){
            const data = await res.json();
            setSinglePurchase(data?.purchase)
        }else{
            toast.error('Something went wrong');
        }
      },[])

      // console.log(singlePurchase)

      useEffect(()=>{
        if(singlePurchase){
            reset({
                productName: singlePurchase?.productName || "",
                vendorName: singlePurchase?.vendorName || "",
                description: singlePurchase?.description || "",
                purchasePrice: singlePurchase?.purchasePrice || "",
                billStatus: singlePurchase?.billStatus || "",
                deliveryStatus: singlePurchase?.deliveryStatus || "",
                quantity: singlePurchase?.quantity || ""
            })
        }
      },[reset,singlePurchase])


      const handleValueChange = (field,value) =>{
        setValue(field,value)
      }

      const isSubmitting = useMemo(() =>{
        return formState.isSubmitting
      },[formState]);

      const {productName,vendorName,description,purchasePrice,quantity,billStatus,deliveryStatus} = watch()

    return{
        handleValueChange,
        handleSubmit,
        reset,
        productName,
        vendorName,
        description,
        purchasePrice,
        deliveryStatus,
        billStatus,
        quantity,
        isSubmitting,
        errors:formState.errors,
        fetchData,
        singlePurchase
    }
}

export default EditPurchaseHook;