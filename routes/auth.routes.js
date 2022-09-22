import express from "express";
const router = express.Router();
import { getUser, register, login } from "../controllers/auth.controller.js";

router.get("/auth/user", getUser);

router.post("/auth/register", register);

router.post("/auth/login", login);

export default router;
