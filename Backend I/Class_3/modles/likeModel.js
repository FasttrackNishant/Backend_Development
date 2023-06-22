const mongoose = require('mongoose');


//route handler

const likeSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Post",
    },
    user: {
        type: String,
        required: true,

    },

})


//export

module.exports = mongoose.model("Like", likeSchema);