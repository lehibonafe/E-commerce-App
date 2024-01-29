const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");
const auth = require("../auth");
const { verify } = auth;

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.userDetails);

module.exports = router;
