
import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const productImageSchema = new Schema({
    id:{
        type: ObjectId
    },
    image:{
        type: String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true
    },
    productPic:{
        type: String,
        required:true,
    }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const Images = models.images || model('images',productImageSchema)

export default Images;