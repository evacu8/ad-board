import Ad from "../models/ads.model.js";

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
  res.send("new ad created");
};

export const update = async (req, res) => {
  const { title, text, published, photo, price, location, seller } = req.body;

  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    ad.title = title;
    ad.text = text;
    ad.published = published;
    ad.photo = photo;
    ad.price = price;
    ad.location = location;
    ad.seller = seller;
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
