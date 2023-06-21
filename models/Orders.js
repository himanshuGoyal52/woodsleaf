import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
        orderItems : [
            {
                name : {type : String , required : true},
                quantity : {type : Number , required : true},
                image : {type : String , required : true},
                price : {type : Number , required : true},
                sku : {type : String , required : true},
            },
        ],
        shippingAddress : {
            fullName: { type: String, required: true },
            phone: { type: Number, required: true },
            company: { type: String },
            country: { type: String, required: true },
            state: { type: String, required: true },
            city: { type: String, required: true },
            address: { type: String, required: true },
            postalCode: { type: String, required: true },
            notes: { type: String },
        },
        paymentMethod: { type: String, required: true },
        paymentResult :{ id : String , status : String , email_address : String},
        razorpay : {razorpay_first_id : String , razorpay_payment_id : String , razorpay_order_id : String , razorpay_signature : String},
        itemsPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        totalPriceINR: { type: Number},
        isPaid : {type : Boolean , required : true , default : false},
        deliveryStatus: { type: Number, required: true, default: 1 },
        paidAt: { type: Date },
    },{
        timestamps : true,
    }
);

const Order = mongoose.models.Order || mongoose.model('Order' , orderSchema);
export default Order;