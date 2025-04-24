const { sequelize } = require("./config/db.js");
const { dataTypes, DataTypes, Model } = require("sequelize");

const Todo = sequelize.define("Todo",{
    id:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.CHAR,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM('pending','in_progress','completed'),
        defaultValues:'pending'
    },
    due_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            Model:'User',
            key:'id'
        }
    }
})

module.exports = Todo