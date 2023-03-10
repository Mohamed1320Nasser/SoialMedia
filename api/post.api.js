const { auth } = require("../middleware/auth");
const { paramValidation } = require("../middleware/user.valid");
const {
  addPost,
  update,
  deletePost,
  allposts,
  allpostsOneUser,
} = require("../services/post.services");

const app = require("express").Router();

app.post("/add", auth(), addPost);
app.put("/update/:id", auth(),paramValidation, update);
app.delete("/delete/:id", auth(),paramValidation, deletePost);
app.get("/allPosts", auth(), allposts);
app.get("/allpostsOneUser", auth(), allpostsOneUser);

module.exports = app;
