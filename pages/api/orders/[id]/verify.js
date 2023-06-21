import { getSession } from "next-auth/react";
import db from "../../../../utils/db";
import Order from "../../../../models/Orders";
import crypto from 'crypto';

const handler = async (req , res) => {
    const session = await getSession({ req });
    if(!session){
        return res.status(401).send('sigin required');
    }

    await db.connect();
    const order = await Order.findById(req.query.id);
    if(order){
        if(order.isPaid){
            return res.status(400).send({message : 'Error: order is already paid'});
        }

        var check = req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256',process.env.KEY_SECRET)
                        .update(check.toString())
                        .digest('hex');
        if(expectedSignature === req.body.razorpay_signature){
            order.isPaid = true;
            order.paidAt = Date.now();

            order.razorpay= {
                razorpay_payment_id : req.body.razorpay_payment_id,
                razorpay_order_id : req.body.razorpay_order_id,
                razorpay_signature : req.body.razorpay_signature,
            }
        
            await order.save();
            await db.disconnect();
            res.send({message : 'Order Paid'});
        }else{
            res.status(401).send({message:'Payment Unsuccessful'});
        }

    }else{
        await db.disconnect();
        res.status(404).send({message :'Error : order not found'});
    }
}
export default handler;