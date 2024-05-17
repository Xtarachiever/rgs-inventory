import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "GET"){
        try{
            const { id } = req.query;
            const getPurchase = await Purchase.findOne({_id:id});
            if(!getPurchase){
                return res.status(304).json({message: "No purchase Found"})
            }
            return res.status(200).json({message:"Purchase retrieved successfully", purchase: getPurchase})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only GET request are accepted"})
    }
}