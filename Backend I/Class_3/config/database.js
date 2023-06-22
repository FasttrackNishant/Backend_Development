const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser = true,
            useUnifiedTopology = true;
        })
        .then(console.log("db connected successfully "))
        .catch((error) => {
            console.log("connection mein problem aa rahe hain ");
            console.log(error);
            process.exit(1);
        })
}

module.exports = connectDB;