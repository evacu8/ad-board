import express from "express";
const router = express.Router();
import { getByLogin } from "../controllers/users.controller.js";

router.get("/:login", getByLogin);

export default router;
