const Sequelize=require('sequelize');
const sequelize=require('../utils/databse')
const user = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.BIGINT,
    unique:true
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports=user