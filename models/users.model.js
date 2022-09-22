import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("User", usersSchema);
export default User;
