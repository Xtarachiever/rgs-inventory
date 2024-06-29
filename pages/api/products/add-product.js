import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";
import { toast } from "react-toastify";


export default async function handler(req,res){
    if(req.method === "POST"){
        await connectMongo().catch((error)=>
            res.json({message:'Connection Failed ...'})
        );
        try{
            const { productName, shortName, description, features, specifications, salesPrice, regularPrice,quantity} = req.body
            const checkExitingProduct = await AddProduct.findOne({productName:productName});
            if(checkExitingProduct){
                return res.status(400).json({message:"Product already Exists, you just have to update"});
            }

            await AddProduct.create({
                productName,
                shortName,
                description,
                features,
                specifications,
                salesPrice,
                regularPrice,
                quantity,
                slug: productName.toLowerCase().replace(/\s+/g, '-')
            }).then((data)=>{
                return res.status(201).json({message:"Product Successfully added", products: data})
            }).catch((err) => {
                toast.error(err?.message)
                return res.status(404).json({message: err?.message });
            });

        }catch(err){
            res.json({message:err?.message})
        }
    }else{
        res.status(500).json({message:"Only POST request are accepted"});
    }
}