import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        content : {type : Array , required : true},
        title : {type : String , required : true},
        slug : {type : String , required : true , unique : true},
        homeImage : {type :String},
        image : {type : String , required : true},
        tags : {type : Array},
        author : {type : String , required : true},
        shareCount : {type : Number , required : true},
        insta : {type : String , default : "https://www.instagram.com/woods_leaf/"},
    },
    {
        timestamps : true,
    }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog' , blogSchema);
export default Blog;