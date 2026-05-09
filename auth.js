const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");


// REGISTER

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message: "All fields required",
      });
    }

    const userExist =
      await User.findOne({ email });

    if (userExist) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({

      name,
      email,
      password: hashedPassword,

    });

    await newUser.save();

    res.status(200).json({
      message: "Registration Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Registration Failed",
    });
  }
});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey"
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login Failed",
    });
  }
});

module.exports = router;