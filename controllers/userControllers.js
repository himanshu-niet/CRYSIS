const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const HelpRequest = require("../models/requestModel");

const registerUser = asyncHandler(async (req, res) => {

 
  const { name, email, password, phone, location,coordinates } = req.body;

  if (!name || !email || !password, !phone, !location,!coordinates) {
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

    phone,
    location: {
      type: 'Point',
      area:{ 
             name:location.name,
        street:location.street,
        isoCountryCode:location.isoCountryCode,
        country:location.country,
        postalCode:location.postalCode,
        administrativeArea:location.administrativeArea,
        subAdministrativeArea:location.subAdministrativeArea,
        locality:location.locality,
        subLocality:location.subLocality,
        thoroughfare:location.thoroughfare,
        subThoroughfare:location.subThoroughfare
   
       },
      coordinates: [coordinates.longitude, coordinates.latitude],
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
    throw new Error("Registration Failed.. Try Again");
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


const getUser = asyncHandler(async (req, res) => {
  
  const userId=req.user._id;

  const user = await User.findOne({ _id:userId });

  if (user) {
    res.status(200).json({user})
  } else {
    res.status(400);
    throw new Error(" not found");
  }

});


const requestUser = asyncHandler(async (req, res) => {
  const { 
    emergencyType,
    location,
    currentLocation,
    urgencyLevel,
    description, } = req.body;

    console.log(req.user)
    const userId=req.user._id;

    const request = await HelpRequest.create({
      userId,
    emergencyType,
    location,
    currentLocation,
    urgencyLevel,
    description,
    });

    // const nearestAgency = await Agency.findOne({
    //   agencyType: emergencyType,
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: 'Point',
    //         coordinates: [currentLocation.longitude, currentLocation.latitude],
    //       },
    //       $maxDistance: 20000, // 10 kilometers in meters
    //     },
    //   },
    // });
  
    if (request) {
      res.status(201).json({
        _id: request._id,
        request
        // nearestAgency
      });
    } else {
      res.status(400);
      throw new Error(" not found");
    }

});


const getActiveRequestUser = asyncHandler(async (req, res) => {
  
    const userId=req.user._id;

    const activeRequests = await HelpRequest.find({ isActive: true,userId:userId });
  
    if (activeRequests) {
      res.status(200).json({
        activeRequests
      });
    } else {
      res.status(400);
      throw new Error(" not found");
    }

});


const getHistoryRequestUser = asyncHandler(async (req, res) => {
  
  const userId=req.user._id;

  const hisRequests = await HelpRequest.find({ isActive: false,userId:userId });

  if (hisRequests) {
    res.status(200).json({
      hisRequests
    });
  } else {
    res.status(400);
    throw new Error(" not found");
  }

});

module.exports = { registerUser, authUser,requestUser,getActiveRequestUser,getHistoryRequestUser ,getUser};