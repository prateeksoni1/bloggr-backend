const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  gender: {
    type: String,
    required: true,
    enum: ["m", "f"],
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    lowercase: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: "blog",
  },
});

module.exports = mongoose.model("profile", profileSchema);
