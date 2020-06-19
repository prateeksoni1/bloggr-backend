const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const { createBlog } = require("../controllers/blogController");

router.post("/", verifyToken, createBlog);

module.exports = router;
