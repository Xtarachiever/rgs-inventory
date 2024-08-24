import { object,string } from "yup";
export const ImageValidator = object().shape({
    image: string().trim().required('Image is required'),
    title: string().required('Title is required')
});