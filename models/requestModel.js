const mongoose = require("mongoose");


const helpRequestSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    emergencyType: {
      type: String,
      required: true,
    },
    agencyId: {
        type: String,
        default: "",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    location: {
      type: String,
      required: true,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
    urgencyLevel: {
      type: String,
      required: true,
    },
    description: String,
    // Other fields specific to the help request
  },{ timestaps: true });
  

const HelpRequest = mongoose.model("HelpRequest", helpRequestSchema);

module.exports = HelpRequest;