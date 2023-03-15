const express = require('express');
const router = express.Router();

const images= require("../controller/images");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');



// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${uuidv4()}.${ext}`);
  }
});

const upload = multer({ storage: storage });


router.get('/getImage/:idproviders',images.getImagebyId)
router.post('/:providerId', upload.array('images'),images.postImg)
router.delete('/:imageId',images.removeImage)


module.exports = router;
