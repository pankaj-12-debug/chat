const Sequelize=require('sequelize');
const sequelize=require('../utils/databse');

const user_group=sequelize.define('User_group',{
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
});

module.exports=user_group;