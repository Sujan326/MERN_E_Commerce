import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // keep empty objects (ex: cartData:{}) instead of removing them
);

export const UserModel =
  mongoose.models.users || mongoose.model("user", userSchema);
