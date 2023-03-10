const express = require("express");
require("dotenv").config();
const { dbconnection } = require("./config/dateBase/dbConnection");
const app = express();
const port = process.env.PORT;
// console.log(port);
app.use(express.json());
dbconnection();
app.use("/user", require("./api/user.api"));
app.use("/post", require("./api/post.api"));
// console.log("test appjs");
app.use("/comment", require("./api/comment.api"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
