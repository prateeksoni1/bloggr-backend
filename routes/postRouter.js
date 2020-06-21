const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const { createPost, getPosts } = require("../controllers/postController");

router.get("/", verifyToken, getPosts);
router.post("/", verifyToken, createPost);

module.exports = router;
