import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req, res) {
  await connectMongo().catch((error) =>
    res.json({ message: "Connection Failed ..." })
  );

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { productName, vendorName, quantity, description, purchasePrice, deliveryStatus, billStatus } = req.body;

      // Fetch the purchase by id
      const findPurchase = await Purchase.findById(id);
      if (!findPurchase) {
        return res.status(400).json({ message: "No purchase found" });
      }

      // Update the Purchase document
      const updateFoundPurchases = await Purchase.findByIdAndUpdate(
        id,
        { vendorName, description, quantity, purchasePrice, billStatus, deliveryStatus },
        { new: true }
      );

      // Check if product exists in AddProduct collection
      const findByProductName = await AddProduct.findOne({ productName });

      if (findByProductName) {
        // Adjust quantity based on deliveryStatus
        if (deliveryStatus === "Delivered") {
          findByProductName.quantity += quantity;
        } else {
          findByProductName.quantity -= quantity;
        }

        // Delete the product if the quantity is 0 or less
        if (findByProductName.quantity <= 0) {
          await AddProduct.deleteOne({ _id: findByProductName._id });
        } else {
          await findByProductName.save();
        }
      } else if (deliveryStatus === "Delivered") {
        // Create a new product if it doesn't exist and deliveryStatus is "Delivered"
        const newProduct = new AddProduct({
          productName,
          shortName: productName,
          description,
          features: "Good",
          specifications: "Good",
          salesPrice: purchasePrice + 500,
          regularPrice: purchasePrice,
          quantity,
          slug: productName.toLowerCase().replace(/\s+/g, "-"),
        });
        await newProduct.save();
      }

      return res.status(201).json({
        message: "Product Updated successfully",
        status: true,
        purchase: updateFoundPurchases,
      });
    } catch (err) {
      return res.status(404).json({ message: err?.message });
    }
  } else {
    return res.status(500).json({ message: "Only PATCH requests are accepted" });
  }
}
