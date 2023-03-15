const express = require('express');
const router = express.Router();

const provider= require("../controller/provider");
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

router.get('/',provider.getAllProviders);
router.post('/',provider.postPro);
router.get('/:idproviders',provider.getProviderById);
router.get('/getImage/:idproviders',provider.getImagebyId)
router.post('/uploadImage', upload.single('image'),provider.postImg)


module.exports = router;
