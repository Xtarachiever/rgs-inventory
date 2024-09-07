import { getCombinedDetails } from "@/models/CombinedDetailSchema";

export default async function handler(req, res) {
  const { productName } = req.query; // Retrieve the productName from the query parameter (if provided)

  try {
    const productDetails = await getCombinedDetails(productName);

    if (productDetails.length > 0) {
      res.status(200).json(productDetails);
    } else {
      res.status(404).json({ message: productName ? "Product not found" : "No products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product details", error });
  }
}