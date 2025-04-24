const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.js");
require("dotenv").config();


const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: "*"
}

app.use(cors());
app.use(express.json());

sequelize.sync().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${port}`);
    })
})