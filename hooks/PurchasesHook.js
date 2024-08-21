import { useForm } from "react-hook-form";
import { PurchaseValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setPurchases } from "@/store/slices/PurchaseSlice";
import { toast } from "react-toastify";

const PurchaseHook = () =>{
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
            purchasePrice:0,
            vendorName:"",
            quantity:0,
            description:"",
            billStatus:"",
            deliveryStatus:""
        },
      });

    const fetchData = useCallback(async () =>{
      try{
        setLoading(true)
        const res = await fetch('/api/purchases/get-purchases',{
          method:'GET'
        });
        setLoading(false)
        if(res.ok){
          const data = await res.json();
          dispatch(setPurchases(data?.purchases))

          toast.success(data?.message,{
            toastId:'purchase successful'
          })
        }
      }catch(err){
        console.log(err)
        toast.success(err?.message)
      }
    },[])

    useEffect(()=>{
      fetchData();
    },[])


      const handleValueChange = (field,value) =>{
        setValue(field,value)
      }

      const isSubmitting = useMemo(() =>{
        return formState.isSubmitting
      },[formState]);

      const {productName,purchasePrice,description,vendorName,quantity,billStatus,deliveryStatus} = watch();

    return{
        handleValueChange,
        handleSubmit,
        reset,
        productName,
        purchasePrice,
        description,
        vendorName,
        quantity,
        billStatus,
        deliveryStatus,
        isSubmitting,
        errors:formState.errors,
        purchaseLoader:loading
    }
}

export default PurchaseHook;