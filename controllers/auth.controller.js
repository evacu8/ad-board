import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import { getImageFileType } from "../utils/getImageFileType.js";

export const getUser = async (req, res) => {
  res.send({ message: "I'm logged" });
};

export const register = async (req, res) => {
  try {
    const { login, password, avatar, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
      }
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phone,
      });
      res.status(201).send({ message: `User created ${user.login}` });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: "Login or password is incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            login: user.login,
            id: user.id,
          };
          res.status(200).send(req.session.user);
        } else {
          res.status(400).send({ message: "Login or password is incorrect" });
        }
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: "User logged out" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
