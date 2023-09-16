const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require("../config/env.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization 
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({msg:"Not authorized, token failed"})
      
    }
  }

  if (!token) {
    return res.status(404).json({msg:"Not authorized, no token"})
    
  }
});

module.exports = { protect };