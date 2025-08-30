import { getSession } from "next-auth/react"
import db from "../../../utils/db";
import Order from "../../../models/Orders";
import { generateEmailContent, mailOptions, transporter } from "../../../utils/nodemailer";

const handler = async (req , res) => {
    const session = await getSession({req});
    if(!session){
        return res.status(401).send('signing required');
    }

    const {user} = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user : user._id,
    });

    const order = await newOrder.save();

    // sending email to the use 
    try{
        await transporter.sendMail({
            ...mailOptions,
            to : user.email,
            subject : `Thank You For Your Order!, ${user.name} || Dcraftive`,
            text : `Order ID: ${order._id} \n \n Hello ${user.name}, \n \n We’re happy to let you know that we’ve received your order with order value of $${order.totalPrice}/-. \n \n Kindly proceed with payment of your order for further processing of your order. \n \n If you have any questions, contact us info@dcraftive.com or call us on +91-7412972658! \n \n We are here to help! \n \n dcraftive.com`,
            html : generateEmailContent(order)
        })
    }catch(err){
        console.log(err);
    }

    res.status(201).send(order);

}
export default handler;