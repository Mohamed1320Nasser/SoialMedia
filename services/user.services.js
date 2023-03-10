let userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.ROUNDS);
// console.log(saltRounds);
let jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const commentModel = require("../models/comment.model");

userModel = require("../models/user.model");
module.exports.signup = async (req, res) => {
  const { name, email, password, age, phone } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.json({ message: "error in hash password" });
      } else {
        userModel.insertMany({ name, email, password: hash, age, phone });
        res.json({ message: "succes" });
      }
    });
  }
};
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  user = await userModel.findOne({ email });
  if (user) {
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      let token = jwt.sign(
        {
          role: "user",
          id: user._id,
          email: user.email,
          password: user.password,
          name: user.name,
        },
        process.env.TOKENKEY
      );
      res.json({ message: "succes", token });
    } else {
      res.json({ message: "the password is incorrect" });
    }
  } else {
    res.json({ message: "email incorrect" });
  }
};

module.exports.changePass = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // console.log(req.user._id);
  const password = newPassword;
  let match = await bcrypt.compare(oldPassword, req.user.password);
  if (match) {
    let hash = await bcrypt.hash(password, saltRounds);
    // console.log(hash);
    const user = await userModel.updateOne(
      { _id: req.user._id },
      { password: hash }
    );
    res.json({ message: "succes", user });
  } else {
    res.json({ message: "old password incorrect" });
  }
};
module.exports.update = async (req, res) => {
  const { name, email, phone, age } = req.body;
  const id = req.user._id;
  let user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email alreada exists" });
  } else {
    let userUpdate = await userModel.updateMany(
      { _id: id },
      { name, email, phone, age }
    );
    res.json({ message: "succes", user: req.user });
  }
};
module.exports.deleteUser = async (req, res) => {
  const id = req.user._id;
  const user = await userModel.deleteOne({ _id: id });
  await postModel.deleteOne({ createdBy: id });
  await commentModel.deleteOne({ createdBy: id });
  res.json({ message: "succes" });
};
