const {addHotel,getAllHotel,deleteHotel,addReview} = require("../Controller/HotelController");
const express = require("express");
const router = express.Router();
const {uploadMultipleImages} = require("../Middleware/multer");

router.post("/add-hotel", uploadMultipleImages
,addHotel);


router.get("/get-all-hotels/:email", getAllHotel);
router.delete("/delete-hotel/:id", deleteHotel);
router.patch("/add-review", addReview);
module.exports = router;