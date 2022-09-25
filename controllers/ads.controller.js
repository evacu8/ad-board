import Ad from "../models/ads.model.js";
import fs from "fs";
import { getImageFileType } from "../utils/getImageFileType.js";

export const getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate("seller");
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("seller");
    if (!ad) res.status(404).json({ message: "Not found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getByPhrase = async (req, res) => {
  try {
    const ads = await Ad.find({
      $text: { $search: req.params.searchPhrase },
    });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, text, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    if (
      title &&
      typeof title === "string" &&
      text &&
      typeof text === "string" &&
      price &&
      typeof price === "string" &&
      location &&
      typeof location === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const ad = await Ad.create({
        title,
        text,
        published: Date.now(),
        photo: req.file.filename,
        price,
        location,
        seller: req.session.user.id,
      });
      res.status(201).send({ message: `Ad created ${ad.title}` });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    fs.unlinkSync(req.file.path);
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { title, text, price, location } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : "unknown";

  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    ad.title = title || ad.title;
    ad.text = text || ad.text;
    if (
      (title && title !== ad.title) ||
      (text && text !== ad.text) ||
      (location && location !== ad.location) ||
      (price && price !== ad.price) ||
      (req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType))
    ) {
      ad.published = Date.now();
    }
    if (
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      fs.unlinkSync(process.cwd() + "/public/uploads/" + ad.photo);
      ad.photo = req.file.filename;
    }
    ad.price = price || ad.price;
    ad.location = location || ad.location;
    ad.seller = req.session.user.id;
    await ad.save();
    res.json({ message: "Ad updated " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("seller");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    await ad.remove();
    res.json({ message: "Ad deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
