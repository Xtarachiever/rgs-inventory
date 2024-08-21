import connectMongo from "@/database/conn";
import Sales from "@/models/SaleSchema";


export default async function handler(req,res){
    await connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    )
    if(req.method === 'GET'){
        try{
            const {id} = req.query
            const findSingleSale = await Sales.findOne({_id:id})

            if(!findSingleSale){
                return res.status(304).json({message: "No sales Found"})
            }
            return res.status(200).json({message:"Sale retrieved successfully", sale: findSingleSale})

        }catch(err){
            return res.status(400).json({message: err?.message})
        }
    }else{
        return res.status(500).json({message:'ONLY ACCEPTS GET REQUEST'})
    }
}