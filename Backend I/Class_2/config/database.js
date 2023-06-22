const mongoose = require('mongoose')
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
            //userNewUrlParse: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("db ka coneections suceesfull"))
        .catch((error) => {
            console.log("issue in db connection");
            console.error(error.message);
            process.exit(1);
        })
}


module.exports = dbConnect;