const jwt = require("jsonwebtoken");
const Agency = require("../models/agencyModel.js");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require("../config/env.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization;

      //decodes token id
      const decoded = jwt.verify(token, JWT_SECRET);

      req.agency = await Agency.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };