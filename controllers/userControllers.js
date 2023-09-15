const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, phone, location } = req.body;

  if (!name || !email || !password, !phone, !location) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    phone,
    location: {
      type: 'Point',
      area:location.area,
      coordinates: [location.longitude, location.latitude],
    },
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      phone: user.phone,
      location: {
        area:user.location.area,
        type:user.location.type,
        coordinates: {
          longitude:user.location.coordinates[0],
          latitude:user.location.coordinates[1]
        },
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      phone: user.phone,
      location: {
        area:user.location.area,
        type:user.location.type,
        coordinates: {
          longitude:user.location.coordinates[0],
          latitude:user.location.coordinates[1]
        },
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };