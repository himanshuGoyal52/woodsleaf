import NextAuth from "next-auth/next";
import User from "../../../models/User";
import db from "../../../utils/db";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';
import Token from "../../../models/Token";
import crypto from 'crypto';
import { generateVerifyEmailContent, mailOptions, transporter } from "../../../utils/nodemailer";

export default NextAuth({
    session : {
        strategy : 'jwt',
    },
    callbacks : {
        async jwt({token , user}){
            if(user?._id) token._id = user._id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({session , token}) {
            if(token?._id) session.user._id = token._id;
            if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
    providers : [
        CredentialsProvider({
            
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email : credentials.email
                });
                await db.disconnect();

                if(user && bcryptjs.compareSync(credentials.password , user.password)){
                    if(!user.verified){
                        await db.connect();
                        let token = await Token.findOne({userId : user._id});
                        await db.disconnect();
                        if(!token){
                            token = await new Token({
                                userId : user._id,
                                token : crypto.randomBytes(32).toString("hex")
                            }).save();
                        }
                        // sending email 
                        const url = `${process.env.NEXTAUTH_URL}/auth/${user._id}/verify/${token.token}`;
                        try{
                            await transporter.sendMail({
                                ...mailOptions,
                                to : user.email,
                                subject : `${user.name}, Please verify your email || Dcraftive`,
                                text : `Dear user, \n Please verify your email Id using the below link \n \n ${url}`,
                                html : generateVerifyEmailContent(url)
                            })
                        }catch(err){
                            console.log(err);
                        }

                        throw new Error("An email sent to your email, please verify");
                    }else{
                        return {
                            _id : user._id,
                            name : user.name,
                            email : user.email,
                            isAdmin : user.isAdmin,
                            verified : user.verified
                        };
                    }
                }

                throw new Error("Invalid email or passowrd");

            },
        }),
    ]
});
