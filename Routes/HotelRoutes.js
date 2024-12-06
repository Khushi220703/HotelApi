const {addHotel,getAllHotel,deleteHotel} = require("../Controller/HotelController");
const express = require("express");
const router = express.Router();

router.post("/add-hotel", addHotel);
router.get("/get-all-hotels", getAllHotel);
router.delete("/delete-hotel/:id", deleteHotel);
module.exports = router;