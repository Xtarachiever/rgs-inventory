import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "GET"){
        try{
            const getAllProducts = await AddProduct.find({});
            if(!getAllProducts){
                return res.status(304).json({message: "No product Found"})
            }
            return res.status(200).json({message:"Products retrieved successfully", products: getAllProducts})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only GET request are accepted"})
    }
}