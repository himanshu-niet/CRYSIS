const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://himanshu16:himanshu@cluster0.vfz23.mongodb.net/sih?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;