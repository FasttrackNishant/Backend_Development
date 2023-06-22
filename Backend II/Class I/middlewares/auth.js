// auth , isStudent , isAdmin

const jwt = require('jsonwebtoken');
require("dotenv").config();



exports.auth = (req, res, next) => {
    try {

        //  3 ways hain token fetching ke : body , cookie, header
        //extract jwt token from body 
        // const token = req.body.token  // || req.cookies.token;


        console.log("cookie", req.cookies.token);
        console.log("header", req.header("Authorization"));
        console.log("body" , req.body.token);

        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");


        //if token is missing

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing",
            })
        }

        //token ko verify karna -> using verify in jwt 

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        } catch (error) {

            res.status(401).json({
                success: false,
                message: "Token invalid",
            });
        }
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {

        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This a protected route for a student",
            });

        }
        next();


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User Role can not be verified",
        });
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This a protected route for a Admin ",
            });

        }
        next();


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User Role can not be verified",
        });
    }
}