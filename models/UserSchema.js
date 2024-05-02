
import { ObjectId } from "mongodb";
import { Schema, SchemaTypes, model, models } from "mongoose";

const userSchema = new Schema({
    id:{
        type: ObjectId
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const User = models.user || model('user',userSchema)

export default User;

