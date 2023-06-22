const File = require('../models/File')
const cloudinary = require("cloudinary").v2;

//localfile upload -> handler function
exports.localFileUpload = async (req, res) => {
    try {

        //fetch file
        const file = req.files.file;
        console.log("file aa gayi ", file);

        //server path to store the file
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path -> ", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully"
        });

    } catch (error) {

        console.log(error);
    }
}


//function for validation of the extension

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

//functino to upload file on clodudinary


async function uploadFileCloudinary(file, folder) {
    const options = { folder };
    console.log("temp file path ", file.tempFilePath);

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka logic hain

exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);


        const file = req.files.imageFile;
        console.log(file);


        //validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type ", fileType)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'file format not supported',
            })
        }

        //file format supported then upload on cloudinary

        const response = await uploadFileCloudinary(file, "fileUpload");
        console.log(response);

        //db mein entry save karni hain

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded ",
        })



    }
    catch (error) {

        console.error(error + "hi");

        res.status(400).json(
            {
                success: false,
                message: "something went wrong",
            }
        );

    }
}



//video upload handler


exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Successfully Uploaded',
        })

    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}