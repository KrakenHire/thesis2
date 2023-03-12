const express = require('express');
const router = express.Router();

const rating= require("../controller/rating");

// router.get('/',rating.getAllratings);
router.post('/',rating.postRate);
// router.get('/:idratings',rating.getratingById);



module.exports = router;