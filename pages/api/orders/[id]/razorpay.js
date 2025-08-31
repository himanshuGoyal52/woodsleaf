import { getSession } from "next-auth/react";
import db from "../../../../utils/db";
import Order from "../../../../models/Orders";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id : process.env.KEY_ID,
    key_secret : process.env.KEY_SECRET,
});

const handler = async (req , res) => {
    const session = await getSession({ req });
    if(!session){
        return res.status(401).send('sigin required');
    }

    await db.connect();
    const order_my = await Order.findById(req.query.id);
    if(order_my){
        if(order_my.isPaid){
            return res.status(400).send({message : 'Error: order is already paid'});
        }

        const { totalPrice } = order_my;
        
        let options = {
            amount : totalPrice * 100 ,
            currency : "INR",
        };
        let order = await razorpay.orders.create(options);
        order_my.razorpay= {razorpay_first_id : order.id};
        await order_my.save();
        db.disconnect();
        res.send({...order , key : process.env.KEY_ID});
        

    }else{
        await db.disconnect();
        res.status(404).send({message :'Error : order not found'});
    }
}
export default handler;