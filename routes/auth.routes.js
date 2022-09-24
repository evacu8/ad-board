import express from "express";
const router = express.Router();
import {
  getUser,
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/authMiddleware.js";
import { imageUpload } from "../utils/imageUpload.js";

router.get("/user", authMiddleware, getUser);

router.post("/register", imageUpload.single("avatar"), register);

router.post("/login", login);

router.delete("/logout", authMiddleware, logout);

export default router;
