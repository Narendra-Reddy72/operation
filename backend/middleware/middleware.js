const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async(req,res,next) =>{
    let token;
    try{
        const authMiddleware = req.headers.authorization; 
        if(authMiddleware&&authMiddleware.startsWith('Bearer','')){
            token = authMiddleware.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded
            next();
        }else{
            res.status(400).json({success:false,message:'No token provided'})
        }
    }catch(err){
        res.status(500).json({success:true,message:err.message})
    }
}

const authorizeToken = (role) => {
    return (req, res, next) => {
        try {
            console.log(req.body.role,role)
            if (req.body.role === role) {
                next();
            } else {
                res.status(403).json({ success: false, message: 'Access Forbidden' });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message:err.message });
        }
    };
};


module.exports = {verifyToken,authorizeToken}

