const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const {
  createPost,
  getPosts,
  getPost,
} = require("../controllers/postController");

router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getPost);
router.post("/", verifyToken, createPost);

module.exports = router;
