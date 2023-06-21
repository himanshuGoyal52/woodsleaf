import db from "../../../utils/db";
import Emails from "../../../models/Emails";

async function handler ( req , res) {
    if(req.method !== 'POST'){
        return ;
    }

    const { email} = req.body;
    
    if(
        !email ||
        !email.includes('@')
    ){
        res.status(422).json({
            message : 'Validation error',
        });
        return ;
    }

    await db.connect();
    const existingUser = await Emails.findOne({email : email});
    if(existingUser){
        res.status(422).json({message : 'You are already subscribed'});
        await db.disconnect();
        return ;
    }

    const newUser = new Emails({
        email : email,
    });
    const user = await newUser.save();

    await db.disconnect();

    res.status(201).send({
        message : 'You subscribed to our newsletter successfully',
        email : user.email,
    });
}

export default handler;