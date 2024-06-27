import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const db = await connectMongo();
  if (session) {
    connectMongo().catch((error) =>
      res.json({ message: "Connection Failed ..." })
    );
    if (req.method === "POST") {
      try {
        const {
          vendorName,
          billStatus,
          productName,
          description,
          purchasePrice,
          quantity,
          deliveryStatus,
        } = req.body;

        if (deliveryStatus === "Delivered") {
          // Update quantity in Product collection using aggregation pipeline
          await AddProduct.updateOne(
            { productName: productName }, // Match product by name
            [{ // Aggregation pipeline stages
              $set: { 
                quantity: {
                  $add: [
                    "$quantity",
                    quantity
                  ]
                }
              }
            }]
          );

          const findByProductName = await AddProduct.findOne({productName: productName})
          if(!findByProductName){
            AddProduct.create({
              productName,
              shortName:productName,
              description,
              features:'',
              specifications:'',
              salesPrice:purchasePrice + 500,
              regularPrice: purchasePrice,
              quantity,
              slug: productName.toLowerCase().replace(/\s+/g, '-')
            }).then((data)=>{
              return res.status(201).json({status:true, message: "Successfully added", product:data})
            }).catch((err) => {
                return res.status(404).json({message: err?.message });
            });
          }
        }        

        Purchase.create({
            vendorName: vendorName,
            billStatus,
            productName,
            description,
            purchasePrice,
            quantity,
            deliveryStatus,
        }).then((data)=>{
            return res.status(201).json({status:true, message: "Successfully added", purchase:data})
        }).catch((err) => {
            return res.status(404).json({message: err?.message });
        });

      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(404).json({ message: "Only POST request are accepted" });
    }
  }
}
