const express = require("express");
const router = express.Router();
const AdsController = require("../controllers/ads.controller");

router.get("/ads", AdsController.getAll);

router.get("/ads/:id", AdsController.getById);

router.get("/ads/search/:searchPhrase", AdsController.getByPhrase);

router.post("/ads", AdsController.create);

router.put("/ads/:id", AdsController.update);

router.delete("/ads/:id", AdsController.delete);

module.exports = router;
