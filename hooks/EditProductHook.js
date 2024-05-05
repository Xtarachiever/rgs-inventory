import { useForm } from "react-hook-form";
import { AddProductValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const EditProductHook = () =>{
    const [singleProduct, setSingleProduct] = useState([])
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

      const fetchData = useCallback(async (id) =>{
        const res = await fetch(`/api/products/edit-product?id=${id}`,{
            method:"GET"
        })
        if(res.ok){
            const data = await res.json();
            setSingleProduct(data)
        }else{
            toast.error('Something went wrong');
        }
      },[])

      useEffect(()=>{
        if(singleProduct){
            reset({
                productName: singleProduct?.productName,
                shortName: singleProduct?.shortName,
                description: singleProduct?.description,
                regularPrice: singleProduct?.regularPrice,
                salesPrice: singleProduct?.salesPrice,
                features: singleProduct?.features,
                specifications: singleProduct?.specifications
            })
        }
      },[reset,singleProduct])


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
        fetchData
    }
}

export default EditProductHook;