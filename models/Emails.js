import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema(
    {
        email : {type : String , required : true },
        sent : {type : Boolean , default : false}
    }
);

const Emails = mongoose.models.Emails || mongoose.model( 'Emails' , emailsSchema);
export default Emails;