const express = require('express')
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middle ware add kardo aga kabhi json body parse karni pade 
app.use(express.json());


//include route file

const blog = require("./routes/blog");

//mount kardo
app.use("/api/v1", blog);

const connectDB = require("./config/database");
connectDB();

//start the server
app.listen(PORT, () => {
    console.log(`app started at port ${PORT}`)
})

app.get("/", (req, res) => {
    res.send(`<h1> This is mY homepage </h1>`);
})