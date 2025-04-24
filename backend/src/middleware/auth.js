const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("No token provided");
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "B--BAKAAA!!! LOGIN DULU LAH BUTA YAROOOO!!!!",
      code: 401,
    });
  }
};
