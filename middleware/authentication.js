var jwt = require("jsonwebtoken");
const user=require('../model/user')

exports.authorization = (req, res, next) => {
  const token = req.header("Authorization");
  jwt.verify(token, "shhhhh", function (err, decoded) {
    
    user.findByPk(decoded.userId).then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err)
    })
  });
};
