import AddProduct from "@/models/AddProductSchema";
import Sales from "@/models/SaleSchema";

const recordSales = async (productName, quantitySold, salesPrice,customerName) => {
    // Find the product
    const product = await AddProduct.findOne({ productName });

    if (!product) throw new Error("Product not found");

    // Update the product quantity
    product.quantity -= quantitySold;
    if (product.quantity < 0) throw new Error("Insufficient stock");

    if (product.quantity === 0) {
        // If quantity is 0, delete the product from the database
        await AddProduct.deleteOne({ _id: product._id });
    } else {
        // Save the updated product only if it's not deleted
        await product.save();
    }

    // Create a sales entry
    const sale = new Sales({
        productName,
        quantity: quantitySold,
        salesPrice,
        customerName,
        profitLoss: salesPrice*quantitySold - product?.salesPrice*quantitySold
        // total: quantitySold * salesPrice
    });
    await sale.save();

    return sale;
};

export default recordSales;
