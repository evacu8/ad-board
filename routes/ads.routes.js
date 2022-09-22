import express from "express";
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

router.post("/ads", create);

router.put("/ads/:id", update);

router.delete("/ads/:id", remove);

export default router;
