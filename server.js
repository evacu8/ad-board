const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const adsRoutes = require("./routes/ads.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", adsRoutes);
app.use("/api", usersRoutes);
app.use("/api", authRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = "";

if (NODE_ENV === "production") dbUri = "url to remote db";
else if (NODE_ENV === "test") dbUri = "mongodb://localhost:27017/adBoardDBtest";
else dbUri = "mongodb://localhost:27017/adBoardDB";

mongoose.connect(dbUri, { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", () => {});
db.on("error", (err) => console.log("Error " + err));

const server = app.listen("8000", () => {});

module.exports = server;
