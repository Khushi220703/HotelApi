const {payment} = require("../Controller/paymentController");
const express = require("express");
const router = express.Router();


router.post("/make-payment", payment);

module.exports = router;