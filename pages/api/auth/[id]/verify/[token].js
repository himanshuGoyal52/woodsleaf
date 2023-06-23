import User from "../../../../../models/User";
import Token from "../../../../../models/Token";

const handler = async (req , res) => {

        let user = await User.findById(req.body.id);
        
        let token = await Token.findOne({
            token : req.body.token,
        });

        if(!token){
            return res.status(400).send({message : "invalid link"});
        }

        user.verified = true;
        await user.save();
        await token.remove();
        res.status(200).send({message : 'Email verified!!' , user : user});
    
};
export default handler;
