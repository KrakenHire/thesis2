const express = require('express');
const router = express.Router();

const reviews= require("../controller/reviews");



router.get('/:providers_idproviders',reviews.getReviwsById);
router.get('/',reviews.getAllReviews);
router.post('/',reviews.postreview);
// router.get('/:providers_idproviders',rating.getratingById);



module.exports = router;