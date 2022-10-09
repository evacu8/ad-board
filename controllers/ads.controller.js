import Ad from "../models/ads.model.js";
import fs from "fs";
import { getImageFileType } from "../utils/getImageFileType.js";

export const getAll = async (req, res) => {
  try {
    const ads = await Ad.find().lean().populate("seller", "login phone");
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id)
      .lean()
      .populate("seller", "login phone");
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
    const { title, text, price, location, seller } = req.body;
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
      const dateNow = new Date();
      const ad = await Ad.create({
        title,
        text,
        published: dateNow.getTime(),
        photo: req.file.filename,
        price,
        location,
        seller,
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
    ad.title = title;
    ad.text = text;
    // if (
    //   (title && title !== ad.title) ||
    //   (text && text !== ad.text) ||
    //   (location && location !== ad.location) ||
    //   (price && price !== ad.price) ||
    //   (req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType))
    // ) {
    //   ad.published = Date.now();
    // }
    if (
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      fs.unlinkSync(process.cwd() + "/public/uploads/" + ad.photo);
      ad.photo = req.file.filename;
    }
    ad.price = price;
    ad.location = location;
    const updatedAd = await ad.save();
    res.json({ message: "Ad updated ", updatedAd: updatedAd });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id)
      .lean()
      .populate("seller", "login");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    await ad.remove();
    fs.unlinkSync(process.cwd() + "/public/uploads/" + ad.photo);
    res.json({ message: "Ad deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
