require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require('../../models/users/User')
class CheckUser {
  //Get the User's Id from the JWT token
  static getUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    try {
      const token = authHeader.split(" ")[1];
      //   console.log(token)
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(decodedPayload);
      const decodedUser = decodedPayload.payload;
      // console.log(req.user.userId)
      const user = await User.findOne({_id:decodedUser.userId})
      req.user = user //returning the existing user
      // console.log(req.user)
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

}

module.exports = CheckUser;