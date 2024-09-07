import AddProduct from "@/models/AddProductSchema";
import Sales from "@/models/SaleSchema";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Notifications from "@/models/NotificationSchema";

const recordSales = async (productName, quantitySold, salesPrice,customerName,madeBy,req,res) => {

    const session = await getServerSession(req,res);
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
        profitLoss: salesPrice*quantitySold - product?.salesPrice*quantitySold,
        madeBy
        // total: quantitySold * salesPrice
    });
    await Notifications.create({
        userId: session?.user?._id,
        userName: `${session?.user?.email}`,
        message:`${session?.user?.email} sold ${quantitySold} quantity of ${productName} at ${salesPrice}`
    })
    await sale.save();

    return sale;
};

export default recordSales;
