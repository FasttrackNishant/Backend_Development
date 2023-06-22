const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            maxLength: 50,
        },
        description:
        {
            type: String,
            required: true,
            maxLength: 50,
        },
        createdAt:
        {
            type: Date,
            requied: false,
            default: Date.now(),
        },
        updatedAt:
        {
            type: Date,
            required: false,
            default: Date.now(),
        }
    }
);

module.exports = mongoose.model("Todo", todoSchema)