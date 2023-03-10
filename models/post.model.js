const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title:{
    type:String,
    required:true,
  } ,
  content:{
    type:String,
    required:true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comment",
    },
  ],
},{
  timestamps: true,
});
module.exports = mongoose.model("post", schema);
