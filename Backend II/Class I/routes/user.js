const express = require("express");
const router = express.Router();
const User = require('../models/User')


const { login, signup } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/login", login);
router.post("/signup", signup);


router.get("./test", auth, (req, res) => {
    res.json({
        success: true,
        message: "test is here",
    })
})


//Protected Route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for students",
    });
});


router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Admin Portal",
    });
});

router.get("/getEmail", auth, async (req, res) => {


    try {
        const id = req.user.id;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user: user, 
            message: "Welcome to the Email route",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "fat gaya email",
        })

    }


});

module.exports = router;