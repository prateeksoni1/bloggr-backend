const router = require("express").Router();
const {
  signupController,
  signinController,
  getUser,
} = require("../controllers/authController");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/", getUser);

module.exports = router;
