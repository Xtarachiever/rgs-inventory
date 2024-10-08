
import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const addProductSchema = new Schema({
    id:{
        type: ObjectId
    },
    productName:{
        type: String,
        required:true,
        trim:true
    },
    shortName:{
        type: String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    features:{
        type: String,
        trim:true
    },
    specifications:{
        type: String,
        trim:true
    },
    salesPrice:{
        type: Number,
        required:true,
    },
    regularPrice:{
        type: Number,
        required:true,
    },
    slug:{
        type: String,
        required:true,
        trim:true
    },
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const AddProduct = models.product || model('product',addProductSchema)

export default AddProduct;