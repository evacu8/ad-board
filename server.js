import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { DB_URI } from "./config.js";

import adsRoutes from "./routes/ads.routes.js";
import authRoutes from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
}

mongoose.connect(DB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: DB_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
    },
  })
);

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", adsRoutes);
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

const server = app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
