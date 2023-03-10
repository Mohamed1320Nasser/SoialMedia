const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.auth = () => {
  return async (req, res, next) => {
    console.log("test auth");
    let { token } = req.headers;
    if (token) {
      if (token.startsWith("lab")) {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.TOKENKEY, async (err, decoded) => {
          if (err) {
            res.json({ message: "in-valid token1" });
          } else {
            const user = await userModel.findById(decoded.id);
            if (user) {
              req.user = user;
              //   console.log(user._id);
              next();
            } else {
              res.json({ message: "user not found" });
            }
          }
        });
      } else {
        res.json({ message: "in-valid key" });
      }
    } else {
      res.json({ message: "in-valid token" });
    }
  };
};
