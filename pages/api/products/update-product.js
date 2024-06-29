import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "PATCH"){
        try{
            const { id } = req.query;
            const {productName, shortName, description, features, specifications, salesPrice, regularPrice, quantity} = req.body 
            const findProduct = await AddProduct.findById({_id:id});
            if(!findProduct){
                return res.status(400).json({message: "No product Found"})
            }

            if(quantity === 0){
                await AddProduct.deleteOne({ _id: id });
                return res.status(200).json({message: "Product deleted Successfully"})
            }
            const updateFoundProducts = await AddProduct.findByIdAndUpdate(id,{productName, shortName, description, features, specifications, salesPrice, regularPrice, quantity},{new:true})
            return res.status(201).json({message:"Product Updated successfully",status:true, product: updateFoundProducts})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only PATCH request are accepted"})
    }
}