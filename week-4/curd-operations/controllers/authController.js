const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register new user

exports.registerUser = async (req, res) => {
  try {
    //1 get data from req.body
    const { fristName, lastName, email, password } = req.body;
    if (!fristName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required for registration" });
    }

    //2 check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //3 hash password and save user to db
    const hashedPassword = await bcrypt.hash(password, 10); //salt rounds =10 abc ---> abc

    //4 create user
    await User.create({
      fristName,
      lastName,
      email,
      password: hashedPassword,
    });
    //5 verify email (skipped for now)

    //6 return success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //1 get data from req.body
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    //2 check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //3 compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //4 generate jwt token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    //5 return success response with token
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to login user", error: error.message });
  }
};
