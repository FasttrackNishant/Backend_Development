//impot the model

const Todo = require("../models/Todo");

//agar yaha tak aaye ho it means ki kisi na kisi route handler se aaya ho toh uske liye ek route handler likhan padega

//define route handler 

exports.createTodo = async (req, res) => {
    try {

        //extrack title and description from request ki body
        const { title, description } = req.body;

        //create a new todo object and insert it into db
        const response = await Todo.create({ title, description });

        //send a json response with success flag
        res.status(200).json
            (
                {
                    success: true,
                    data: response,
                    message: 'Entry Created Successfully'
                }
            );

    }
    catch (err) {

        console.error(err);
        console.log(err);
        res.status(500)
            .json(
                {
                    success: false,
                    data: "internal server error",
                    message: err.message, 
                })
    }
}