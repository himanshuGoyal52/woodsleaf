import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from 'bcryptjs';
import Token from "../../../models/Token";
import crypto from 'crypto';
import { generateVerifyEmailContent, mailOptions, transporter } from "../../../utils/nodemailer";
import Emails from "../../../models/Emails";

async function handler ( req , res) {
    if(req.method !== 'POST'){
        return;
    }

    const {name , email , password , news } = req.body;
    
    if(
        !name ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 3
    ){
        res.status(422).json({
            message : 'Validation error',
        });
        return ;
    }

    await db.connect();
    const existingUser = await User.findOne({email : email});
    if(existingUser){
        res.status(422).json({message : 'User exits already!'});
        await db.disconnect();
        return ;
    }

    if(news){
        const newEmail = new Emails({
            email : email,
        });
        await newEmail.save();
    }

    const newUser = new User({
        name : name,
        email : email,
        password : bcryptjs.hashSync(password),
        isAdmin : false,
        verified : false,
    });
    const user = await newUser.save();

    // confirmation //
    const token = await new Token({
        userId : user._id,
        token : crypto.randomBytes(32).toString("hex")
    }).save();
    const url = `${process.env.NEXT_PUBLIC_URL}/auth/${user._id}/verify/${token.token}`;
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

    await db.disconnect();

    res.status(201).send({
        message : 'Created user!, please verify',
        _id : user._id,
        name : user.name,
        email : user.email,
    });
}

export default handler;
