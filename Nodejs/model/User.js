import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
