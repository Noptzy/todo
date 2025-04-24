const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User",{
    id:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = User;
