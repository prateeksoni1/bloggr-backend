const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "personal",
      "business",
      "professional",
      "niche",
      "media",
      "freelance",
    ],
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("blog", blogSchema);
