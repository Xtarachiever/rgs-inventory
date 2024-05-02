import mongoose from "mongoose";

const connectMongo = async () =>{
    try{
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URI)
        if(connection.readyState === 1){
            console.log('Connection made successfully')
            return Promise.resolve(true)
        }
    }catch(err){
        return Promise.reject(true)
    }
}
    
export default connectMongo;