const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const {
  createProfile,
  verifyUsername,
} = require("../controllers/profileController");

router.post("/", verifyToken, createProfile);
router.get("/:username", verifyToken, verifyUsername);

module.exports = router;
