import connectMongo from "@/database/conn";
import recordSales from "@/services/RecordSales";


export default async function handler(req,res){
    if(req.method === "POST"){
        await connectMongo().catch((error)=>
            res.json({message:'Connection Failed ...'})
        );
        try{
            const { productName, salesPrice, quantity,customerName} = req.body
            const sale = await recordSales(productName,quantity, salesPrice, customerName);

            return res.status(201).json({ message: "Sale recorded successfully", sale });

        }catch(err){
            return res.status(400).json({ message: err.message });
        }
    }else{
        return res.status(500).json({message:"Only POST request are accepted"});
    }
}