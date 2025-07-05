import express from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

router.post("/register", async (req, res) => {  
  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newuser = await user.save();
    console.log(newuser)

    if (newuser) {
      res.send({
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        role: newuser.role,
        token: jwt.sign(
          {
            _id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            role: newuser.role
          },
          config.JWT_SECRET
        ),
      });
    } else {
      res.status(401).send("Invalid user Data");
    }
  } catch (err) {
    console.log('entering hereeeeeeee')
    res.status(400).send({ msg: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const signinUser = await User.findOne({ email: req.body.email });
    if (!signinUser) return res.status(400).send("Invalid email or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      signinUser.password
    );
    if (validPassword) {
      res.send({
        _id: signinUser._id,
        email: signinUser.email,
        name: signinUser.name,
        role: signinUser.role,
        token: jwt.sign(
          {
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            role: signinUser.role
          },
          "jwtPrivateKey"
        ),
      });
    } else {
      res.status(400).send("invalid username or password");
    }
  } catch (err) {    
    res.status(400).send(err.message);
  }
});

router.get("/getInfo", authenticateToken, (req, res) => {
  res.send({
    message: "User info retrieved successfully",
    user: req.user
  });
});

export default router;
