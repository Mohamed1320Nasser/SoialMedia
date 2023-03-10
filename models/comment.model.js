const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comment", schema);
