import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  // why add await in some lines? Because they return Promises, and you want to wait for those Promises to resolve before proceeding with the rest of the code. Otherwise might cause some errors
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // encrpt our password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create and save user info
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // the info from req/user
    const { email, password } = req.body;
    console.log(req.body);

    console.log(typeof req.body);

    console.log(email);
    console.log(password);

    // check the db
    // !!! find(就算只找到了一个，它最后会返回个[],而不是obj.) / findOne(最后返回的是obj.)
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin.password);

    // whether there is the user or not
    if (!userLogin) return res.status(400).json({ meg: "User doesn't exist." });

    // verify password
    const isMatch = await bcrypt.compare(password, userLogin.password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ meg: "Wrong password" });

    // create a token
    const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET);
    delete userLogin.password;

    // send "token" and "user info without password" to the user
    // token will be sent on the req.header  -->  "Authorization": "tokenxxxxxx"
    res.status(200).json({ token, userLogin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
