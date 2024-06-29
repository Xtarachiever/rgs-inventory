import { useForm } from "react-hook-form";
import { AddProductValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const EditProductHook = () =>{
    const [singleProduct, setSingleProduct] = useState([]);
    const dispatch = useDispatch();

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
            quantity:0,
            salesPrice:0,
            features:"",
            specifications:""
        },
      });

      const fetchData = useCallback(async (id) =>{
        const res = await fetch(`/api/products/get-product?id=${id}`,{
            method:"GET"
        })
        if(res.ok){
            const data = await res.json();
            setSingleProduct(data?.product)
        }else{
            toast.error('Something went wrong');
        }
      },[])

      // console.log(singleProduct)

      useEffect(()=>{
        if(singleProduct){
            reset({
                productName: singleProduct?.productName || "",
                shortName: singleProduct?.shortName || "",
                description: singleProduct?.description || "",
                regularPrice: singleProduct?.regularPrice || "",
                salesPrice: singleProduct?.salesPrice || "",
                features: singleProduct?.features || "",
                specifications: singleProduct?.specifications || "",
                quantity: singleProduct?.quantity || 0
            })
        }
      },[reset,singleProduct])


      const handleValueChange = (field,value) =>{
        setValue(field,value)
      }

      const isSubmitting = useMemo(() =>{
        return formState.isSubmitting
      },[formState]);

      const {productName,shortName,description,regularPrice,salesPrice,features,specifications,quantity} = watch()

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
        fetchData,
        singleProduct,
        quantity
    }
}

export default EditProductHook;