import connectMongo from "@/database/conn";
import Users from "@/models/UserSchema";
import { hash } from "bcrypt";

export default async function handler(req, res) {
    await connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'})
    )
    if(req.method === "POST"){
        try{
            const { email, firstName, lastName, role } = req.body;
            const checkExistingUser = await Users.findOne({email: email});

            if(checkExistingUser){
                return res.status(422).json({ status:false, message: "User Already Exists...!" });
            }

            Users.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: role
            })
              .then((data) => {
                return res
                  .status(201)
                  .json({ status: true, user: data });
              })
              .catch((err) => {
                console.log(err?.message)
                return res.status(404).json({message: err?.message });
              });
        }catch(err){
            console.log(err?.message)
            return res.status(404).json({message: err?.message });
        }
    }else{
        res.json({message: "Only POST requests are accepted ..."})
    }
}