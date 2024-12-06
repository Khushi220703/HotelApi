const {loginUser,signupUser} = require("../Controller/UserController.js");
const express = require("express");
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;