const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  console.log(req);
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
  try {
    const user = new User({
      email,
      password,
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
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

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
