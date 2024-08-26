import { useForm } from "react-hook-form";
import { SalesValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setSales } from "@/store/slices/SaleSlice";

const SalesHook = () =>{
  const dispatch = useDispatch();
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

    const fetchData = useCallback(async () =>{
      try{
        setLoading(true)
        const res = await fetch('/api/sales/get-sales',{
          method:'GET'
        });
        setLoading(false)
        if(res.ok){
          const data = await res.json();
          dispatch(setSales(data?.sales))
        }
      }catch(err){
        console.log(err)
        toast.success(err?.message)
      }
    },[])

    useEffect(()=>{
      fetchData();
    },[fetchData])


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
        setLoading
    }
}

export default SalesHook;