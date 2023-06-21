import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        sku : {type : String , required : true},
        name : {type : String , required : true},
        slug : {type : String , required : true , unique : true},
        collection_type : {type : String , required : true},
        category : {type : String , required : true},
        price : {type : Number , required : true},
        actual_price : {type : Number },
        off : {type : Number },
        image : {type : String , required : true},
        image1 : {type : String , required : true},
        image2 : {type : String , required : true},
        image3 : {type : String , required : true},
        image4 : {type : String , required : true},
        image5 : {type : String , required : true},
        tag : {type : String },
        reviews : {type : Array },
        info : {dimension : String , finish : String , primary_material : String , top_material : String},
        desc : {type : String , required : true},
        faq : {type : Array , default : [{ ques : 'What is the estimated time for a delivery?' , ans : "Once we receive the order confirmation, products are typically manufactured and dispatched within 4 - 6 weeks. We will notify you once the product has been dispatched for delivery. All the products that can be dispatched immediately are highlighted with Fast Shipping on the website. Every product is transported and delivered through our shipping partner's delivery network or our trusted third-party logistics. Although we try to make sure that the Product reaches you within the specified time of delivery, circumstances, such as transport strikes, heavy rains, floods, natural calamities, border clearance, etc., might arise which may result in a delay. In such a case, we request you to not worry. Get in touch with our Email Support Team at support@Woodsleaf.com for the latest updates and information regarding your shipment, if we already haven’t been in touch with you for the same. For a fully customised product, which is being made from scratch, prototyping can result in the delivery taking more time than the standard delivery time."}]},
        featured : {type : Boolean , default : false},
        home_page : {type : Boolean , default : false},
        insta : {type : String , default : "https://www.instagram.com/woods_leaf/"}
    },
    {
        timestamps : true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product' , productSchema);
export default Product;