const User = require("../models/User");
const Profile = require("../models/Profile");

exports.verifyUsername = async (req, res) => {
  const { username } = req.params;
  const profile = await Profile.findOne({ username });

  if (profile) {
    return res.status(403).json({
      success: false,
      message: "Username already exists",
    });
  }

  return res.status(404).json({
    success: true,
    message: "No username found",
  });
};

exports.createProfile = async (req, res) => {
  const { user: userId } = req;

  const user = await User.findById(userId);

  if (user.profile) {
    return res.status(403).json({
      success: false,
      message: "Profile already exists for the user",
    });
  }

  const { firstName, lastName, gender, username } = req.body;
  const profile = new Profile({
    firstName,
    lastName,
    gender,
    username,
  });

  await profile.save();

  user.profile = profile._id;
  await user.save();

  return res.status(201).json({
    success: true,
    profile,
  });
};
