import User from "../models/users.model.js";

export const getUser = async (req, res) => {
  res.send("user info");
};

export const register = async (req, res) => {
  res.send("register");
};

export const login = async (req, res) => {
  res.send("login");
};
