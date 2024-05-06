import { useForm } from "react-hook-form";
import { AddProductValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/store/slices/ProductSlice";

const AddProductHook = () =>{
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
    const { 
        handleSubmit, 
        setValue, 
        formState, 
        reset,
        watch } = useForm({
        resolver: yupResolver(AddProductValidator),
        mode: 'all',
        defaultValues: {
            productName: "",
            shortName: "",
            description:"",
            regularPrice:0,
            salesPrice:0,
            features:"",
            specifications:""
        },
      });

        const fetchProducts = useCallback(async () => {
          setLoading(true);
          const res = await fetch("/api/products/get-products", {
            method: "GET",
          });
          if(res.ok){
            setLoading(false);
            const data = await res.json();
            dispatch(setProducts(data?.products));
          }else{
            console.log("An error occured")
          }
          // setData(data?.products);

        },[]);

        useEffect(()=>{
          fetchProducts()
        },[fetchProducts])

      const handleValueChange = (field,value) =>{
        setValue(field,value)
      }

      const isSubmitting = useMemo(() =>{
        return formState.isSubmitting
      },[formState]);

      const {productName,shortName,description,regularPrice,salesPrice,features,specifications} = watch()

    return{
        handleValueChange,
        handleSubmit,
        reset,
        productName,
        shortName,
        description,
        regularPrice,
        salesPrice,
        features,
        specifications,
        isSubmitting,
        errors:formState.errors,
        loading
    }
}

export default AddProductHook;