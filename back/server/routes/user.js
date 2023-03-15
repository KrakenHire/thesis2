const express = require('express');
const router = express.Router();
const user= require ("../controller/user")
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


router.post('/',user.post);

router.get('/:iduser',user.getUserById);
router.get('/getImage/:iduser',user.getImagebyId)
router.post('/uploadImage', upload.single('image'),user.postImg)

module.exports = router;
