import AddProduct from "./AddProductSchema";

export const getCombinedDetails = async (productName) => {
    try {
        const matchStage = productName ? { slug: productName } : {};

      const products = await AddProduct.aggregate([
        {
            $match: matchStage,
        },
        // Step 1: Lookup related package details
        {
          $lookup: {
            from: 'images', // The 'packages' collection
            localField: 'productName', // Field from 'Product' schema to match
            foreignField: 'title', // Field in 'Package' schema that refers to products
            as: 'imageDetails' // The alias for the result of this lookup
          }
        },
        // Step 2: Lookup related purchases details
        {
          $lookup: {
            from: 'purchases', // The 'purchases' collection
            localField: 'productName', // Field from 'Product' schema to match
            foreignField: 'productName', // Field in 'Purchase' schema that refers to products
            as: 'purchaseDetails' // The alias for the result of this lookup
          }
        },
        // // Optional: Unwind the arrays (if you expect multiple results in arrays)
        // {
        //   $unwind: {
        //     path: '$packageDetails',
        //     preserveNullAndEmptyArrays: true // If there are no matching packages, keep the document
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$purchaseDetails',
        //     preserveNullAndEmptyArrays: true // If there are no matching purchases, keep the document
        //   }
        // }
      ]);
  
      return products;
    } catch (error) {
      console.error('Error fetching product details with packages and purchases:', error);
    }
};