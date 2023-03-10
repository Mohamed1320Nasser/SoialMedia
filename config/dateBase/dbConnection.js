const mongoose = require("mongoose");
require("dotenv").config();
module.exports.dbconnection = () => {
  mongoose
    .connect(process.env.URL)

    .then(() => {
      console.log("data Base is Connected");
    })
    .catch((error) => {
      console.log(error);
      console.log(process.env.URL);
    });
};
