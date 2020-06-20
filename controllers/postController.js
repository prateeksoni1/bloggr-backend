const Post = require("../models/Post");
const User = require("../models/User");
const Blog = require("../models/Blog");

exports.createPost = async (req, res) => {
  const { title, subtitle, content } = req.body;
  const { user: userId } = req;

  try {
    const user = await User.findById(userId).populate({ path: "profile" });
    const blog = await Blog.findById(user.profile.blog);
    const post = new Post({
      title,
      subtitle,
      content,
    });

    await post.save();

    blog.posts.push(post._id);
    await blog.save();

    return res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.toString(),
    });
  }
};
