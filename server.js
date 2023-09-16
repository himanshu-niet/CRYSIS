const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const agencyRoutes = require("./routes/agencyRoutes");

const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { PORT } = require("./config/env");


connectDB();



const app = express();

app.use(cors());

app.use(express.json()); // to accept json data


app.get("/msg",async(req,res)=>{
  try{
    const { msg }=req.body;

  const user = await User.create({});


    return res.json({message:req})

  }catch(e){
    res.status(203).json({e})
  }
})



app.use("/api/user", userRoutes);



app.use("/api/agency", agencyRoutes);



// --------------------------deployment------------------------------

// Error Handling middlewares

app.use(notFound);
app.use(errorHandler);





const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

