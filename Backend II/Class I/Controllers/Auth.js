const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}


//login router handler

exports.login = async (req, res) => {
    try {

        //data fetch
        const { email, password } = req.body;


        //validation on email and password

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "pls enter valid data"
            });
        }

        //check if user exists or not
        let user = await User.findOne({ email });
        //if not a registered user
        if (!user) {
            res.status(401), json({
                success: false,
                message: "user is not registerd",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }
        //verify password and generate jwt token
        if (await bcrypt.compare(password, user.password)) {

            //password match hua toh login kardiya
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });
            console.log(user);

            //user = user.toObject();
            user.token = token;
            console.log(user);
            user.password = undefined; //ye sirf object se hata hain db mein se nahi
            console.log(user);

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),//ms
                httpOnly: true,//client side acces nahi kar sakte

            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,    
                message: "User logged in successfully"
            });
            // res.status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "User logged in successfully"
            // });


        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "password incorrect",
            });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "login failure",
        });
    }
}