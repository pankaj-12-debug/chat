const user=require('../model/user');
const Message=require('../model/message')
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const { Op } = require("sequelize");
const Group=require('../model/group')

exports.addUser=async(req,res,next)=>{
 
        const {userName,userEmail,userPhoneNumber,userPassword}=req.body;
        console.log(req.body)
        bcrypt.hash(userPassword, saltRounds).then(function (hash) {
        return  user.create({
            name:userName,
            email:userEmail,
            phoneNumber:+userPhoneNumber,
            password:hash
        })
        }).then(result=>{
            res.status(200).json({message:"USER CREATED"})
        }).catch(err=>{
            console.log(err);
            res.status(404).json({message:"USER ALREADY EXISTS"})   
        });

 }

 function generateWebToken(id){
    return jwt.sign({ userId: id }, "shhhhh");
 }

 exports.login=(req,res,next)=>{
     const {userEmail,userPassword}=req.body;
    
     user.findOne({
         where:{
             email:userEmail
         }
     }).then(result=>{
       bcrypt.compare(userPassword, result.password, function (err, pwdResult) {
         if(pwdResult==true){
              res.status(200).json({message:"User Logged in successfully",token:generateWebToken(result.id),result});
         }else
         {
             res.status(401).json({message:"Wrong Password"})
         }
       });
     }).catch(err=>{
         console.log(err);
         res.status(404).json({message:"User Not Found"})
     })
 }

 exports.sendMessage=(req,res,next)=>{
     Group.findOne({
         where:{
             name:req.body.groupName

     }}).then((response)=>{
        return req.user.createMessage({
          messageText: req.body.chatMessage,
          name: req.user.name,
          GroupId:response.id
        });
     })
    .then(result=>{
         res.status(200).json({message:"Message added to DB",user:req.user})
     }).catch(err=>{
         console.log(err)
         res.status(404).json({message:"something went wrong"})
     })
 }

 exports.getAllMessage=(req,res,next)=>{
     let lastMessageId = req.query.lastMessageId;
     let groupName=req.query.groupName;
     Group.findOne({
         where:{
             name:groupName
         }
     }).then(data=>{
       console.log('lastMessageId',lastMessageId);
       
        return Message.findAll({
           where: {
             id: {
               [Op.gt]: lastMessageId,
             },
             GroupId:data.id
           }
         });
     })
    .then(result=>{
         res.status(200).json({message:"Fetched successfully",result})
     }).catch(err=>{
         res.status(400).json({message:"Something went wrong"})
     })
 }

 exports.getAllUser=(req,res,next)=>{
    user.findAll().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(400).json({message:"Something went wrong"})
    })
 }