const {bookHotel,cancelBooking} = require("../Controller/BookedHotelController");
const express = require("express");
const router = express.Router();

router.post("/book-hotel", bookHotel);
router.delete("cancel-booking", cancelBooking);

module.exports = router;