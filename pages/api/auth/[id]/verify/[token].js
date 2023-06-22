import User from "../../../../../models/User";
import Token from "../../../../../models/Token";

const handler = async (req , res) => {
    try{
        const user = await User.findById(req.body.id);
        
        const token = await Token.findOne({
            userId : user._id,
            token : req.body.token,
        });

        if(!token){
            return res.status(400).send({message : "invalid link"});
        }

        user.verified = true;
        await user.save();
        await token.remove();
        res.status(200).send({message : 'Email verified!!' , user : user});
    }catch(err){
        res.status(404).send({message : 'some error occured'});
    }
};
export default handler;
