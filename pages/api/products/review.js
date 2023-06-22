import { getSession } from "next-auth/react"
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = async (req , res) => {
    const session = await getSession({req});
    if(!session){
        return res.status(401).send({message:'signing required'});
    }

    const {user} = session;
    await db.connect();
    const product = await Product.findById(req.body.id);
    if(product){
        let _data = {
            "name" :  user.name,
            "time" : Date(Date.now()).toString(),
            "star" : req.body.star,
            "comment" : req.body.review,
        };
        product.reviews.push(_data);
        await product.save();
    }else{
        res.status(404).send({
            message : "product not found",
        });
    }
    
    await db.disconnect();
    res.send({message : "Rating done sussesfully"});

}
export default handler;