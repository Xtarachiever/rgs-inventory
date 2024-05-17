import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

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
