import User from "../../../../../models/User";
import db from "../../../../../utils/db";
import Token from "../../../../../models/Token";

const handler = async (req , res) => {
       
        db.connect();
        const user = await User.findById(req.body.id);
        const token = await Token.findOne({
            userId : req.body.id,
            token : req.body.token,
        });

        if(!token){
            return res.status(400).send({message : "invalid link"});
        }

        user.verified = true;
        await user.save();
        await token.remove();
        db.disconnect();
        res.status(200).send({message : 'Email verified!!', user : user});
    
    
};
export default handler;
