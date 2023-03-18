const express = require('express');
const router = express.Router();

const best = require("../controller/bestSelling");

router.get('/', best.getTopSellingProviders);

module.exports = router;
