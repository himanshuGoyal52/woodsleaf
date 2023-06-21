import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
    {
        front_two_products : {type : Array , required : true},
        discounted_products : {type : Array , required : true},
        slider : {type : Array , required : true},
        your_products : {type : Array , required : true}
    }
);

const Home = mongoose.models.Home || mongoose.model('Home' , homeSchema);
export default Home;