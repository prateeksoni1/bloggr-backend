const router = require("express").Router();
const { verifyToken } = require("../controllers/authController");
const { createProfile } = require("../controllers/profileController");

router.post("/", verifyToken, createProfile);

module.exports = router;
