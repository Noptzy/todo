const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if(userExists) return res.status(400).json({
        success:false,
        message:"B--BAKAAA!!! Email sudah terdaftar, silakan gunakan email lain",
        code:400
    })

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user,
        token,
      },
      code: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: 500,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "User tidak ditemukan HMPHHH!!, Mending Bikin akun dulu sana B-BAKAAAA",
        code: 400,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password salah HMPHHH!!",
        code: 400,
      });
    }

    res.status(200).json({
      success: true,
      message: "O-Omedatoo Kamu berhasil Login....",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: 500,
    });
  }
};
