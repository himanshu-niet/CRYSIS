const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


// Create a Mongoose schema for the agency
const agencySchema = new mongoose.Schema(
    {
        agencyName: {
            type: String,
            required: true,
        },
        agencyType: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure email is unique
        },
        contactInformation: {
           
            phoneNumber: {
                type: String,
            
                // unique: true, // Ensure phone number is unique
            },
            emergencyContact: String,
            emergencyContactNumber: String,
        },
        location: {
            type: { type: String, default: 'Point' },
            coordinates: [Number],
          },
        address: String,
        agencyID: String,
        specialization: String,
        coverageArea: String,
        hoursOfOperation: String,
        emergencyResponseHistory: String,
        trainingAndCertifications: [String],
        password: {
            type: String,
            required: true,
        },
        
    },{ timestaps: true });


// Hash the password before saving it to the database
agencySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

agencySchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

// Create a Mongoose model for the agency
const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
