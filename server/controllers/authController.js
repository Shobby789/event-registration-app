const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/data");
const User = mongoose.model("Users");

module.exports.createUser = async (req, res) => {
  const { firstName, lastName, job, phone, email, password } = req.body;
  //   console.log("body data: ", req.body);
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Already Exists" });
    }
    await User.create({
      email,
      firstName,
      lastName,
      job,
      phone,
      // address,
      password: encryptedPassword,
    });
    res.status(201).json({ status: "Registered Successfully" });
  } catch (error) {
    res.status(400).json({ status: "User could not be registered" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: "Email does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1hr",
    });

    if (res.status(201)) {
      // res.redirect("/home");
      return res.json({ status: "Login Successfull", data: { user, token } });
    } else {
      return res.json({ error: "Wrong email or password" });
    }
  }
  res.json({ status: "error", error: "Invalid password" });
};
