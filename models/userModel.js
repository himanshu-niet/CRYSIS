const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone:{ type: "String", required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'], // Only 'Point' type for location
        required: true,
      },
      area:{ 
        name:String,
        street:String,
        isoCountryCode:String,
        country:String,
        postalCode:Number,
        administrativeArea:String,
        subAdministrativeArea:String,
        locality:String,
        subLocality:String,
        thoroughfare:String,
        subThoroughfare:String
       },
      coordinates: {
        type: [Number], // [longitude, latitude] coordinates
        required: true,
      },
    },
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User", userSchema);

module.exports = User;