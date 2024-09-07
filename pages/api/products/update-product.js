import connectMongo from "@/database/conn";
import AddProduct from "@/models/AddProductSchema";
import Sales from "@/models/SaleSchema";
import { getServerSession } from "next-auth";
import Notifications from "@/models/NotificationSchema";

export default async function handler(req,res){

    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );

    if(req.method === "PATCH"){
        try{
            const session = await getServerSession(req,res);
            
            if (!session) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const { id } = req.query;
            const {productName, shortName, description, features, specifications, salesPrice, regularPrice, quantity} = req.body 
            const findProduct = await AddProduct.findById({_id:id});
            if(!findProduct){
                return res.status(400).json({message: "No product Found"})
            }

            if(quantity === 0){
                await AddProduct.deleteOne({ _id: id });
                await Notifications.create({
                    userId: session?.user?._id,
                    userName: `${session?.user?.email}`,
                    message:`${session?.user?.email} - ${productName} is finished`
                })
                return res.status(200).json({message: "Product deleted Successfully"})
            }

            // Updating Sales
            if(findProduct && quantity !== findProduct?.quantity){
                if(quantity <= findProduct?.quantity){
                    await Sales.create({
                        productName,
                        quantity: findProduct?.quantity - quantity,
                        salesPrice,
                        customerName:'RGS',
                        madeBy:`${session?.user?.email}`
                    })
                }
                await Notifications.create({
                    userId: session?.user?._id,
                    userName: `${session?.user?.email}`,
                    message: quantity <= findProduct?.quantity ? `${session?.user?.email} removed ${quantity - findProduct?.quantity} quantity of ${productName}` :  `${session?.user?.email} added ${quantity - findProduct?.quantity} quantity of ${productName}`
                })
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