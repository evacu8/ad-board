import express from "express";
const router = express.Router();
import { getUser, register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/authMiddleware.js";

router.get("/user", authMiddleware, getUser);

router.post("/register", register);

router.post("/login", login);

export default router;
