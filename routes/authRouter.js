const router = require("express").Router();
const {
  signupController,
  signinController,
  verifyToken,
} = require("../controllers/authController");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/", verifyToken);

module.exports = router;
