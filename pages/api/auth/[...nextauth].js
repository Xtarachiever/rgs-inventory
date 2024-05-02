import connectMongo from "@/database/conn";
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from "@/models/UserSchema";
import { toast } from "react-toastify";
import NextAuth from "next-auth/next";
import { compare } from "bcrypt";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            async authorize(credentials, req){
                connectMongo().catch((error)=>{
                    error: "Connection Failed"
                });
                const result = await Users.findOne({email: credentials.email});
                if(!result){
                    toast.error("No user registered with this detail");
                    throw new Error("No user Found with Username Please Sign Up...!");
                }
                // compare()
                    const comparePassword = await compare(
                        credentials.password,
                        result.password
                    );
                const checkEmail = () =>{
                    return credentials?.email === result?.email
                }

                if(!comparePassword || !checkEmail){
                    toast.error("Username or Password doesn't match");
                    throw new Error("Username or Password doesn't match");
                }

                return result;
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session,token,user}){
            if(token){
                session.user = token.user
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    }
}

export default NextAuth(authOptions);