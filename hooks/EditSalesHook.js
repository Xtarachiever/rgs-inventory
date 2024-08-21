import { useForm } from "react-hook-form";
import { SalesValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";

const EditSalesHook = () =>{
  const [singleSale, setSingleSale] = useState([])
  const [loading, setLoading] = useState(false);
    const { 
        handleSubmit, 
        setValue, 
        formState, 
        reset,
        watch } = useForm({
        resolver: yupResolver(SalesValidator),
        mode: 'all',
        defaultValues: {
            productName: "",
            salesPrice:0,
            quantity:0,
            customerName:''
        },
      });

    const fetchData = useCallback(async (id) =>{
      try{
        const res = await fetch(`/api/sales/get-sale?id=${id}`,{
          method:'GET'
        });
        if(res.ok){
          const data = await res.json();
          setSingleSale(data?.sale)
        }
      }catch(err){
        toast.success(err?.message)
      }
    },[])

    useEffect(()=>{
      fetchData();
    },[fetchData])

    useEffect(()=>{
        if(singleSale){
            reset({
                productName: singleSale?.productName || "",
                customerName: singleSale?.customerName || "",
                salesPrice: singleSale?.salesPrice || "",
                quantity: singleSale?.quantity || ""
            })
        }
      },[reset,singleSale])


      const handleValueChange = (field,value) =>{
        setValue(field,value)
      }

      const isSubmitting = useMemo(() =>{
        return formState.isSubmitting
      },[formState]);

      const {productName,quantity,salesPrice,customerName} = watch();

    return{
        handleValueChange,
        handleSubmit,
        reset,
        productName,
        quantity,
        salesPrice,
        isSubmitting,
        errors:formState.errors,
        loading,
        customerName,
        setLoading,
        fetchData
    }
}

export default EditSalesHook;