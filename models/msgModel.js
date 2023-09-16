const mongoose = require("mongoose");


const msgS = new mongoose.Schema({
  
   
    msg: String,
    // Other fields specific to the help request
  },{ timestaps: true });
  

const Msg = mongoose.model("msg", msgS);

module.exports = msgS;