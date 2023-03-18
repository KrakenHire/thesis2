const express = require('express');
const router = express.Router();

const review= require("../controller/review");

router.get('/', review.getReviews);
router.post('/', review.createReview);


module.exports = router;