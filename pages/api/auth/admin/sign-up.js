import connectMongo from "@/database/conn";
import Users from "@/models/UserSchema";
import { hash } from "bcrypt";

export default async function handler(req, res) {
    connectMongo().catch((error)=>
        res.json({message:'Connection Failed ...'})
    )
    if(req.method === "POST"){
        try{
            const { email, password, firstName, lastName } = req.body;
            const checkExistingUser = await Users.findOne({email: email});

            if(checkExistingUser){
                return res.status(422).json({ message: "User Already Exists...!" });
            }

            Users.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: await hash(password, 12),
            })
              .then((data) => {
                return res
                  .status(201)
                  .json({ status: true, user: data });
              })
              .catch((err) => {
                console.log(err)
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