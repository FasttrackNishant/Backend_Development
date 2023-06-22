const Tag = require('../models/Tags')



//create tag handler function
exports.createCategories = async (req, res) => {
    try {

        const { name, description } = req.body;


        //validation
        if (!name || !description) {
            return res.statsu(400).json({
                success: false,
                message: 'All fields are required',
            })

        }

        //create entry in db

        const tagDetails = await Tag.create({
            name: name,
            description: description,
        })
        console.log('Tag entry');

        //return response
        return res.status(200).json({
            success: true,
            message: 'Tag Created Successfully ',
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

};


//Get all Tags

exports.showAllCategories = async (req, res) => {
    try {
        
        const allTags = await Tag.find({}, { name: true, description: true });

        res.status(200).json({
            success: true,
            message: 'All Tags returned succcessfully',
            allTags,
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


