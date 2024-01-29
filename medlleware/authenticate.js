// const User = require("../model/userSchema");
// const jwt = require('jsonwebtoken');

// const Authenticate = async (req, res, next) => {
 
//     try {
//     const token = req.cookie.jwtoken;
//     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
   
//     const rootUser = await User.findOne({_id:verifyToken._id , "tokens.token": token});
  
//     if (!rootUser) { throw new Error (" User not fount")} ;
    
//     req.token = token ;
//     req.rootUser = rootUser;
//     req.userID = rootUser._id;
//     next();

// } catch (err) {
//     res.status(401).send("Unothorized:No tokin provide");
//     console.log(err);
//   }
// }

// module.exports = Authenticate ;

const jwt = require("jsonwebtoken")
const User=require("../model/userSchema")
// const cookieParser = require('cookie-parser')

const Authentication=async (req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        // console.log(token)
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser){throw new Error("user not found")}
        req.token=token;
        req.rootUser=rootUser;;
        req.userID=rootUser._id;
        next();
    }catch(err){
        res.status(401).send("no token found");
        console.log(err);
    }
}
module.exports=Authentication;