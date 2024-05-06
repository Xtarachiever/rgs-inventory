import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "GET"){
        try{
            const { id } = req.query;
            const getProduct = await AddProduct.findOne({slug:id});
            if(!getProduct){
                return res.status(304).json({message: "No product Found"})
            }
            return res.status(200).json({message:"Product retrieved successfully", product: getProduct})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only GET request are accepted"})
    }
}