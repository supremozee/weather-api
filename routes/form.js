const express = require("express");
const router = express.Router();

const { login, register, isLoggedIn, logout } = require("../controllers");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/isloggedin").post(isLoggedIn);

module.exports = router;
