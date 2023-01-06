const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");
const archived = sequelize.define("Archived", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
  messageText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull:true
  },
  GroupId: {
    type: Sequelize.INTEGER,
  },
});
module.exports = archived;
