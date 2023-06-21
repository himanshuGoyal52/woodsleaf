
import Contact from "../../models/Contact";
import db from "../../utils/db";

async function handler ( req , res) {
    if(req.method !== 'POST'){
        return ;
    }

    const {name , email , message } = req.body;
    
    if(
        !name ||
        !email ||
        !email.includes('@') ||
        !message
    ){
        res.status(422).json({
            message : 'Validation error',
        });
        return ;
    }

    await db.connect();

    const newContact = new Contact({
        name : name,
        email : email,
        message : message,
    });
    const contact = await newContact.save();

    await db.disconnect();

    res.status(201).send({
        message : 'Thanks for contacting us, we will reach out to you!',
        name : contact.name
    });
}

export default handler;