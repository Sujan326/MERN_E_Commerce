import express from "express";
import {
  loginAdmin,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);

export default userRouter;