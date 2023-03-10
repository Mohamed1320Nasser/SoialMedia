const { auth } = require("../middleware/auth");
const {  userValidation } = require("../middleware/user.valid");
const {
  signup,
  signin,
  changePass,
  update,
  deleteUser,
} = require("../services/user.services");

const app = require("express").Router();
app.post("/signup",userValidation, signup);
app.post("/signin", signin);
app.patch("/changePss", auth(), changePass);
app.put("/update", auth(), update);
app.delete("/delete", auth(), deleteUser);

module.exports = app;
