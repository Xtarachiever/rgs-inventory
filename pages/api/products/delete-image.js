import connectMongo from "@/database/conn";
import Images from "@/models/ImageSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "DELETE"){
        try{
            const { id } = req.query;
            const findImage = await Images.findById(id);
            if(!findImage){
                return res.status(304).json({message: "No image Found"})
            }
            await findImage.deleteOne();
            return res.status(200).json({ message: "Image deleted successfully", status: true })

        }catch(err){
            return res.status(404).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:"Only DELETE request are accepted"})
    }
}