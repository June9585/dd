const jwt = require('jsonwebtoken')
//专门校验token请求
module.exports = (req,res,next) => {
    //校验tiken的有效性
    let token =req.get('Access_Token');
    try{
        //success
        jwt.verify(token,'XSF');
        next();
    }catch(error){
        res.send({
            code : -2,
            msg:'身份信息已过期，请重新登录'
        })
    }
}