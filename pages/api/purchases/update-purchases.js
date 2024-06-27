import connectMongo from "@/database/conn";
import Purchase from "@/models/PurchaseSchema";
import AddProduct from "@/models/AddProductSchema";

export default async function handler(req,res){
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'}) 
    );
    if(req.method === "PATCH"){
        try{
            const { id } = req.query;
            const {productName, vendorName, quantity, description, purchasePrice, deliveryStatus, billStatus} = req.body 

            if (deliveryStatus === "Delivered") {
                // Update quantity in Product collection using aggregation pipeline
                await AddProduct.updateOne(
                  { productName: productName }, // Match product by name
                  [{ // Aggregation pipeline stages
                    $set: { // Set fields for the document
                      quantity: { // Set the quantity field
                        $add: [ // Add the following values
                          "$quantity", // Current quantity in the Product collection
                          quantity // Quantity from the new purchase
                        ]
                      }
                    }
                  }]
                );
              } 


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