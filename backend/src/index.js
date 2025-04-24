const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db.js"); // Tambahkan destructuring
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use("/api/auth", userRoutes);
app.use("/api/todos", todoRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });