import { useForm } from "react-hook-form"
import { ImageValidator } from "./validators/image-validator"
import { yupResolver } from "@hookform/resolvers/yup";

const ImageHook = () => {
    const {
        handleSubmit,
        setValue,
        formState,
        reset,
        watch
    } = useForm({
        resolver: yupResolver(ImageValidator),
        mode: 'all',
        defaultValues: {
          image: "",
          title: "",
          description:""
        },
    })

    const handleValueOnChange = (field,value) =>{
        setValue(field,value)
    }

    const {description, title, image } = watch();

  return {
    handleValueOnChange,
    handleSubmit,
    reset,
    description,
    title,
    image,
    errors:formState?.errors
  }
}

export default ImageHook