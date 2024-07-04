import AddProduct from "@/models/AddProductSchema";
import Sales from "@/models/SaleSchema";

const recordSales = async (productName, quantitySold, salesPrice,customerName) => {
    // Find the product
    const product = await AddProduct.findOne({ productName });

    if (!product) throw new Error("Product not found");

    // Update the product quantity
    product.quantity -= quantitySold;
    if (product.quantity < 0) throw new Error("Insufficient stock");

    // Save the updated product
    await product.save();

    // Create a sales entry
    const sale = new Sales({
        productName,
        quantity: quantitySold,
        salesPrice,
        customerName
        // total: quantitySold * salesPrice
    });
    await sale.save();

    return sale;
};

export default recordSales;
