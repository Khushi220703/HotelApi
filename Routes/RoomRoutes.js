const {addRooms,showHotelRooms} = require("../Controller/RoomController");
const express = require("express");
const router = express.Router();

router.post("/add-rooms", addRooms);
router.get("/show-hotelRooms", showHotelRooms);

module.exports = router;