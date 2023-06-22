const mongoose = require('mongoose')


//route handler

const commnetSchema = new mongoose.Schema(
    {
        post:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", //refreence to the post model
        },
        user:
        {
            type: String,
            requied: true,
        },
        body:
        {
            type: String,
            required: true,
        }

    }
);



//export
module.exports = mongoose.model("Comment", commentSchema);  