const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // to accept json data


app.get("/",(req,res)=>{
    return res.json({message:"server running"})
})


app.use("/api/user", userRoutes);



// --------------------------deployment------------------------------

// Error Handling middlewares

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;




const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

