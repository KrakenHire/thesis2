const express = require('express');
const router = express.Router();

const booking= require("../controller/booking");

router.get('/',booking.getRecentBookings);
router.post('/',booking.createBooking);


module.exports = router;
