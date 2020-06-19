const User = require("../models/User");
const Profile = require("../models/Profile");

const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { name, type, description, tags } = req.body;
  const { user: userId } = req;

  tags = tags.map((tag) => tag.trim());

  try {
    const user = await User.findById(userId);
    const profile = await Profile.findById(user.profile);

    if (profile.blog) {
      return res.status(403).json({
        success: false,
        message: "Blog already exists for the user",
      });
    }

    const blog = new Blog({
      name,
      type,
      description,
      tags,
    });

    await blog.save();

    profile.blog = blog._id;
    await profile.save();

    return res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.toString(),
    });
  }
};
