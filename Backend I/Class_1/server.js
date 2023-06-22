 const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');





//specifically parse json data & add  it to the request ki body
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log("server started");

});
//Get request
app.get('/about', (req, res) => {
    res.send("hello this is response ");
})


//Post Request 
app.post('/api/cars', (req, res) => {
    const { name, brand } = req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted ");
})

//connect database to the backend

mongoose.connect('mongodb://localhost:27017/Cars', {

    //configurations ye likhni hi padege 4 hoti hain 2 for localhost
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
        console.log("connection successdfull ");
    })
    .catch((e) => {
        console.log("error aaya hain", e);
    })
