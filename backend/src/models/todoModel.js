const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "in_progress", "completed"),
    defaultValue: "pending",
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    references: {
      model: "Users", // Perbaiki dari Model ke model
      key: "id",
    },
  },
});

module.exports = Todo;
