import express from "express";
const router = express.Router();
import { getUser, register, login } from "../controllers/auth.controller.js";

router.get("/user", getUser);

router.post("/register", register);

router.post("/login", login);

export default router;
