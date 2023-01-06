const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");
const message=sequelize.define('message',{
    messageText:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})
module.exports=message;