import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { imageUpload } from "../utils/imageUpload.js";

const router = express.Router();
import {
  getAll,
  getById,
  getByPhrase,
  create,
  update,
  remove,
} from "../controllers/ads.controller.js";

router.get("/ads", getAll);

router.get("/ads/:id", getById);

router.get("/ads/search/:searchPhrase", getByPhrase);

router.post("/ads", authMiddleware, imageUpload.single("photo"), create);

router.put("/ads/:id", authMiddleware, imageUpload.single("photo"), update);

router.delete("/ads/:id", authMiddleware, remove);

export default router;
