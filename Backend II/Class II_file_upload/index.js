const express = require('express')
const app = express();
const fileUplod = require('express-fileupload')
const db = require('./config/database')
const cloudinary = require('./config/cloudinary')
const Upload = require('./routes/FileUpload');

require("dotenv").config();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(fileUplod({
    useTempFiles: true,
    tempFileDir: '/tmp',
}
));


//connection karlo

db.connect();
cloudinary.cloudinaryConnect();

//mount karlo v1 se
app.use('/api/v1/upload', Upload);


//activate app

app.listen(PORT, () => {

    console.log(`app is ruuning on Port ${PORT}`);
})