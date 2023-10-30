const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.userName,
        email: user.email,
        role: user.role,
        permissions:user.permissions
      };
    console.log(process.env.JWT_SECRET)
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

module.exports = generateToken;