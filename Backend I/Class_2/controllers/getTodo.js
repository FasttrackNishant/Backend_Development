//impot the model

const Todo = require("../models/Todo");


//define route handler 

exports.getTodo = async (req, res) => {
    try {

        //fetch all todo items from database

        const todos = await Todo.find({});

        //update the response
        res.status(200)
            .json(
                {
                    success: true,
                    data: todos,
                    messgae: "entire todo data is fetched",
                }
            )

    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json(
                {
                    success: false,
                    error: err.message,
                    message: "external error occured ",
                }
            )

    }
}

exports.getTodoById = async (req, res) => {
    try {
        //extract todo item basisi on id 
        //fetch id
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id })

        if (!todo) {
            return res.status(404)
                .json({
                    success: false,
                    messgae: "no data found with that id ",
                })
        }

        //data for given id found
        res.status(200)
            .json({
                success: true,
                data: todo,
                message: `Todo is ${id} successfully fetched `,
            })

    }
    catch (err) {


        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'internal error ',
            });
    }
}