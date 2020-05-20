const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No auth token found",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const { id } = payload;
    const user = await User.findById(id).populate({ path: "profile" });
    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
      error: err.toString(),
    });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No auth token found",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
      error: err.toString(),
    });
  }
};

exports.signupController = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.toString(),
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).populate({
      path: "profile",
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log({ body: req.body, existingUser });

    const isValid = await bcrypt.compare(password, existingUser.password);
    console.log(isValid);
    if (!isValid) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "10h",
    });
    return res.status(200).json({
      success: true,
      user: existingUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.toString(),
    });
  }
};
