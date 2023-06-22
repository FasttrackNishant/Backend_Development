//impot the model

const Todo = require("../models/Todo");

//define route handler 

exports.updateTodo = async (req, res) => {
    try {

        //second way to get id
        const { id } = req.params;
        //ab jo ho chize upadte ho sakti hain unko target kiya
        const { title, description } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updateAt: DataTransfer.now() }
            ,)

        res.status(200)
            .json({
                success: true,
                data: todo,
                message: `updatded successfully `,
            })

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