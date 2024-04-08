const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  refresh,
  profileUpdate,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/:id/profile", auth, profile);
router.put("/:id/profile", auth, profileUpdate);
router.post("/refresh", refresh);

module.exports = router;
