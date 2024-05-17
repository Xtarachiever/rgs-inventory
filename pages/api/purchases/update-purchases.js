import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "PATCH"){
        try{
            const { id } = req.query;
            const {vendorName, quantity, description, purchasePrice, deliveryStatus, billStatus} = req.body 
            const findPurchase = await Purchase.findById({_id:id});
            if(!findPurchase){
                return res.status(400).json({message: "No purchase found"})
            }
            const updateFoundPurchases = await Purchase.findByIdAndUpdate(id,{ vendorName, description, quantity, purchasePrice, billStatus, deliveryStatus},{new:true})
            return res.status(201).json({message:"Product Updated successfully",status:true, purchase: updateFoundPurchases})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only PATCH request are accepted"})
    }
}