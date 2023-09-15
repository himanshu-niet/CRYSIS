const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { PORT } = require("./config/env");

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





const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

