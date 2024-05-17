import { object, string, array, ref, number} from 'yup';

export const AddProductValidator = object().shape({
    shortName: string().trim().required('Short Name is required'),
    productName: string().trim().required('Product Name is required'),
    description: string().trim().required('Description is required'),
    regularPrice: number().required('Regular Price is required'),
    salesPrice: number().required('Sales Price is required'),
    features: string().trim().required('Features is required'),
    specifications: string().trim().required('Specifications is required'),
    quantity: number().required('Quantity is required'),
});

export const PurchaseValidator = object().shape({
    productName: string().trim().required('Product Name is required'),
    vendorName: string().trim().required('Vendor Name is required'),
    description: string().trim().required('Description is required'),
    quantity: number().required('Quantity is required'),
    purchasePrice: number().required('Purchase Price is required'),
    billStatus:string().trim().required('Bill Status is required'),
    deliveryStatus:string().trim().required('Delivery Status is required')
});
