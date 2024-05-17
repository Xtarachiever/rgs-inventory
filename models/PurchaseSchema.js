
import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const purchaseSchema = new Schema({
    id:{
        type: ObjectId
    },
    productName:{
        type: String,
        required:true,
        trim:true
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    purchasePrice:{
        type: Number,
        required:true,
    },
    vendorName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    billStatus:{
        type:String,
        required:false
    },
    deliveryStatus:{
        type:String,
        required:false
    }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const Purchase = models.purchase || model('purchase',purchaseSchema)

export default Purchase;