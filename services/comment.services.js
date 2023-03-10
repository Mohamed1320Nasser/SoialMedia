const commentModel = require("../models/comment.model");
const commwntModle = require("../models/comment.model");
const postModel = require("../models/post.model");

module.exports.addComment = async (req, res) => {
  //   console.log("test");
  const { content } = req.body;
  const { id } = req.params;
  const user_id = req.user._id;
  //   console.log(user_id);
  const post = await postModel.findById(id);
  if (post) {
    const comment = await commentModel.insertMany({
      content,
      createdBy: user_id,
    });
    await postModel.updateOne(
      { _id: id },
      {
        $push: {
          comments: comment[0]._id,
        },
      }
    );
    res.json({ message: "success", comment });
  } else {
    res.json({ message: "post not found" });
  }
};
module.exports.updateComment = async (req, res) => {
  const { content, commentId } = req.body;
  const { id } = req.params;
  const user_id = req.user._id;

  const post = await postModel.findById(id);
  if (post) {
    const comment = await commentModel.findById(commentId);
    if (comment) {
      if (comment.createdBy.toString() == user_id.toString()) {
        const commentUpdate = await commentModel.updateOne(
          { _id: commentId },
          { content },
          { new: true }
        );
        res.json({ message: "succes", commentUpdate });
      } else {
        res.json({ message: "Can't Update This Is Comment " });
      }
    } else {
      res.json({ message: "comment not found" });
    }
  } else {
    res.json({ message: "post not found" });
  }
};
module.exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const { id } = req.params;
  const user_id = req.user._id;

  const post = await postModel.findById(id);
  if (post) {
    const comment = await commentModel.findById(commentId);
    if (comment) {
      if (
        comment.createdBy.toString() == user_id.toString() &&
        post.createdBy.toString() == user_id.toString()
      ) {
        const commentdelete = await commentModel.findByIdAndDelete(commentId);
        await postModel.updateOne(
          { _id: id },
          { $pull: { comments: commentId } }
        );
        res.json({ message: "succes comment deleted" });
      } else {
        res.json({ message: "can't delete this is comment " });
      }
    } else {
      res.json({ message: "comment not found" });
    }
  } else {
    res.json({ message: "post not found" });
  }
};
