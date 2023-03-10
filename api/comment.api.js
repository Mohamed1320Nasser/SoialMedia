const { auth } = require("../middleware/auth");
const { paramValidation } = require("../middleware/user.valid");
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../services/comment.services");
console.log("test api");
const app = require("express").Router();
app.post("/add/:id", auth(),paramValidation, addComment);
app.put("/update/:id", auth(),paramValidation, updateComment);
app.delete("/delete/:id", auth(),paramValidation, deleteComment);

module.exports = app;
