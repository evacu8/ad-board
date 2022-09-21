const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.get("/auth/user", AuthController.getUser);

router.post("/auth/register", AuthController.register);

router.post("/auth/login", AuthController.login);

module.exports = router;
