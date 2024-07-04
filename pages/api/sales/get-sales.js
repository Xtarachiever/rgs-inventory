import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Sales from "@/models/SaleSchema";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    connectMongo().catch((error) =>
      res.json({ message: "Connection Failed ..." })
    );
    if (req.method === "GET") {
      try {
        const getSales = await Sales.find({});

        if(!getSales){
            return res.status(401).json({message:'No sale found'})
        }
        return res.status(200).json({message:'Sale successfully retrieved', sales:getSales})

      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(404).json({ message: "Only GET request are accepted" });
    }
  }
}
