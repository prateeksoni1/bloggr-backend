const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const { createPost } = require("../controllers/postController");

router.post("/", verifyToken, createPost);

module.exports = router;
