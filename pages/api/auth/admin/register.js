import connectMongo from "@/database/conn";
import Users from "@/models/UserSchema";
import { hash } from "bcrypt";

export default async function handler(req, res) {
    await connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'})
    )

    if(req.method === "POST"){
        try{
            const { email, password } = req.body;

            console.log(email)

            const hashedPassword = await hash(password, 10);

            const updatedUser = await Users.findOneAndUpdate(
                { email: email },  // search criteria
                { 
                    password: hashedPassword,
                },  
                { new: true, upsert: false }
            );

            if(!updatedUser){
                return res.status(422).json({ status:false, message: "User doesn't exist" });
            }
            return res.status(200).json({status:true, message:"Registration Complete"})

        }catch(err){
            console.log(err?.message)
            return res.status(404).json({message: err?.message });
        }
    }else{
        res.status(405).json({message: "Only POST requests are accepted ..."})
    }
}