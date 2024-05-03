import { useForm } from "react-hook-form";
import { AddProductValidator } from "./validators/add-product-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";

const AddProductHook = () =>{
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
        errors:formState.errors
    }
}

export default AddProductHook;