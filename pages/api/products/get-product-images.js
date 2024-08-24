import connectMongo from "@/database/conn";
import Images from "@/models/ImageSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "GET"){
        try{
            const getImages = await Images.find();
            if(!getImages){
                return res.status(304).json({message: "No image found"})
            }
            return res.status(200).json({message:"Images retrieved successfully", images: getImages})
        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only GET request are accepted"})
    }
}