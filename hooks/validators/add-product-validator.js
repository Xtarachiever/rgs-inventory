import { object, string, array, ref, number} from 'yup';

export const AddProductValidator = object().shape({
    shortName: string().trim().required('Short Name is required'),
    productName: string().trim().required('Product Name is required'),
    description: string().trim().required('Description is required'),
    regularPrice: number().required('Regular Price is required'),
    salesPrice: number().required('Sales Price is required'),
    features: string().trim().required('Features is required'),
    specifications: string().trim().required('Specifications is required'),
});
