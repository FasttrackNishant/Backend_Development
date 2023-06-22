const express = require('express')
const app = express();
require("dotenv").config();


//bad pratice
// app.listen(3000, () => {
//     console.log("server started in the backend ")
// });


//env file se port karo 
//agar env se nahi aaya toh by default 4k use hoga
const PORT = process.env.PORT || 4000


//middleware to parse json request body
app.use(express.json());


//import routes for todo api
const todoRules = require("./routes/todo")

//import routes from todo api
const todoRoutes = require("./routes/todo");
//mount the api like api/v1 likha aa jaye
app.use("/api/v1", todoRoutes);


//start server
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})


//connect to db
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("./", (req, res) => {
    res.send(`<h1>This is Homepage </h1>`);
})