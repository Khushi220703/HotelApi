const {signupUser,verify,loginUser} = require("../Controller/UserController.js");
const express = require("express");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/verify",verify);
router.post("/login", loginUser);

module.exports = router;