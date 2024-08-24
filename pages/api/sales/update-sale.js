import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";
import Sales from "@/models/SaleSchema";
export default async function handler(req, res) {
  await connectMongo().catch((error) =>
    res.json({ message: "Connection Failed ..." })
  );

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { productName, salesPrice, quantity, customerName } = req.body;

      const product = await AddProduct.findOne({ productName });

      if (!product) throw new Error("Product not found");

      // Fetch the purchase by id
      const findSales = await Sales.findById(id);
      if (!findSales) {
        return res.status(400).json({ message: "No sale found" });
      }

      // Update the Purchase document
      const updateFoundSales = await Sales.findByIdAndUpdate(
        id,
        { customerName, salesPrice, quantity, productName, profitLoss: salesPrice*quantity - product?.salesPrice*quantity},
        { new: true }
      );

      return res.status(201).json({
        message: "Sales recorded successfully",
        status: true,
        sale: updateFoundSales,
      });
    } catch (err) {
      return res.status(404).json({ message: err?.message });
    }
  } else {
    return res.status(500).json({ message: "Only PATCH requests are accepted" });
  }
}
