import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models.js";

// Generate Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists or not
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Does Not Exists" });
    }
    // check if the entered password is matching
    const isMatched = await bcrypt.compare(password, user.password); // req.password, db_saved.password

    if (!isMatched) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } else {
      // generate token if password is matched
      const token = createToken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter Valid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter Strong Password more than 8 characters",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // nothing number of rounds to hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user data
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // save the user in DB
    const user = await newUser.save();

    // generate token using created user_id
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {};

export { loginUser, registerUser, loginAdmin };
