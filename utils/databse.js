const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('groupChat', 'root', 'Meena@123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports=sequelize;