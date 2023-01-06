const express = require("express");
const app = express();
const path = require("path");
const cors=require('cors');
const nodeCron = require("node-cron");

const User = require("./model/user");
const Message = require("./model/message");
const Group = require("./model/group");
const User_group= require("./model/user_group");
const archivedChats=require("./model/archivedChat")

const userRoutes = require("./routes/user");
const groupRoutes=require('./routes/group')

const sequelize = require("./utils/databse");
const { Sequelize } = require("sequelize");

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use("/user", userRoutes);
app.use('/group',groupRoutes)

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: User_group });
Group.belongsToMany(User, { through: User_group });

Group.hasMany(Message);
Message.belongsTo(Group);

function checkTimeDifference(obj){
  return (Math.abs(obj.createdAt-new Date())/(60*60*1000)>24)
}
async function jobYouNeedToExecute(){
  try{
    let messages=await Message.findAll();
    let messageToMove= messages.filter(checkTimeDifference);
    console.log(messageToMove)
    messageToMove.forEach(ele=>{
      archivedChats.create({
        id:ele.id,
        messageText:ele.messageText,
        name:ele.name,
        createdAt:ele.createdAt,
        updatedAt:ele.updatedAt,
        UserId:ele.UserId,
        GroupId:ele.GroupId

      })
    })
    messageToMove.forEach(ele=>{
      Message.destroy({
        where:{id:ele.id}
      })
    })
  }
  catch(err){
    console.log(err)
  }
}

nodeCron.schedule("00 00 00 * * *", jobYouNeedToExecute) 
  


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
