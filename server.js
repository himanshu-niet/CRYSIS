const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const agencyRoutes = require("./routes/agencyRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { PORT } = require("./config/env");


connectDB();

const app = express();

app.use(express.json()); // to accept json data


app.get("/",(req,res)=>{
    return res.json({message:"server running"})
})

// http://localhost:6000

// app.post("/ml",async(req,res)=>{
//   try {
//     const imageData = req.body.file; // Assuming the image data is sent as 'image' in the request body

//     // Make a POST request to your Flask application
//     const response = await axios.post('http://localhost:6000', { image: imageData });

//     // Handle the response from Flask here
//     console.log('Response from Flask:', response.data);

//     // Send a response back to the client
//    return res.json({ message: 'Image forwarded to Flask successfully', response: response.data });
//   } catch (error) {
//     console.error('Error forwarding image to Flask:', error);
//    return res.status(500).json({ message: 'Error forwarding image to Flask' });
//   }
// })


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

