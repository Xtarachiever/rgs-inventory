
import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const addSaleSchema = new Schema({
    id:{
        type: ObjectId
    },
    productName:{
        type: String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    salesPrice:{
        type: Number,
        required:true,
    },
    customerName:{
        type: String,
        required:true,
    }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const Sales = models.sales || model('sales',addSaleSchema)

export default Sales;