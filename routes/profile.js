const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth")
const upload = require("../middleware/upload");
const updateAvatar = require("../controller/updateAvatar")

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      userName: user.userName,
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put(
    "/update-avatar",
    auth,
    upload.single("profileImage"),
    updateAvatar.update
);
module.exports = router ;