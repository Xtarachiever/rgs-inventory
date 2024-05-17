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
    if (req.method === "GET") {
      try {
        const getPurchases = await Purchase.find({});

        if(!getPurchases){
            return res.status(401).json({message:'No Purchase found'})
        }
        return res.status(200).json({message:'Purchase successfully retrieved', purchases:getPurchases})

      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(404).json({ message: "Only GET request are accepted" });
    }
  }
}
