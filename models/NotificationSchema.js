
import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema({
    id:{
        type: ObjectId
    },
    userId:{
        type: ObjectId, 
        ref: 'User'
    },
    userName:{
        type: String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true
    }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

const Notifications = models.notification || model('notification',notificationSchema)

export default Notifications;