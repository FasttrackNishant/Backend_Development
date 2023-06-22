const express = require('express')
const router = express.Router();

//handler function utha ke lao controller se

const { imageUpload, videoUpload, imageReducer, localFileUpload } = require('../controllers/fileUpload')


//api route
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
// router.post("/imageReducer", imageReducer);
// router.post("/localFileUpload", localFileUpload);



module.exports = router;