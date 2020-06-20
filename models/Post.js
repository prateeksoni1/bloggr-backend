const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("post", postSchema);
