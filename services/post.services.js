const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

module.exports.addPost = async (req, res) => {
  const { title, content } = req.body;
  const id = req.user._id;
  const post = await postModel.insertMany({ title, content, createdBy: id });
  res.json({ message: "succes", post });
};
module.exports.update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const post = await postModel.findById(id);
  if (post) {
    // console.log(req.user._id);
    // console.log(post.createdBy);
    if (post.createdBy.toString() == req.user._id.toString()) {
      const postUpdate = await postModel.updateOne(
        { _id: id },
        { title, content },
        { new: true }
      );
      res.json({ message: "succes", postUpdate });
    } else {
      res.json({ message: "can't update this post " });
    }
  } else {
    res.json({ message: "post not found" });
  }
};

module.exports.allposts = async (req, res) => {
  let posts = await postModel
    .find({})
    .populate("createdBy")
    .populate([
      {
        path: "comments",
        select: "content",
      },
    ]);
  res.json({ message: "succes", posts });
};
module.exports.allpostsOneUser = async (req, res) => {
  const id = req.user._id;
  let posts = await postModel
    .find({ createdBy: id })
    .populate("createdBy")
    .populate([
      {
        path: "comments",
        select: "content",
      },
    ]);
  res.json({ message: "succes", posts });
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  if (post) {
    if (post.createdBy.toString() == req.user._id.toString()) {
       const postdelete = await postModel.findByIdAndDelete(id);
      console.log(postModel.comments);
      res.json({ message: "succes" });
    } else {
      res.json({ message: "can't delete this is post " });
    }
  } else {
    res.json({ message: "post not found" });
  }
};
