
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const PAYU_BASE_URL = "https://sandboxsecure.payu.in"; // Use sandbox for testing
const CLIENT_ID = process.env.CLIENT_ID || "b45168a781ac88453f54d8275524ddb6803820997ea647e49c08122d4cf54c4e";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "eee27c61a18937757d7d02f2c6750f619abd40b667517b69701a6dfb2a3106e0";
const MERCHANT_KEY = process.env.MERCHANT_KEY || "Sy5lhf";

// PayU Success and Failure URLs (configured in .env or hardcoded)
const PAYU_SUCCESS_URL = process.env.PAYU_SUCCESS_URL || "http://localhost:3000/success";
const PAYU_FAILURE_URL = process.env.PAYU_FAILURE_URL || "http://localhost:3000/failure";

// Function to generate the hash for PayU
const generateHash = (data) => {
  const hashString = `${MERCHANT_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${CLIENT_SECRET}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

// Payment endpoint to process payments
const payment = async (req, res) => {
 
  
  try {
    const { amount, firstname, email, phone, productinfo } = req.body;
  
   
    // Validate required fields
    if (!amount || !firstname || !email || !phone || !productinfo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate unique order and transaction ID
    const orderId = 'order_' + new Date().getTime();
    const txnId = 'txn_' + new Date().getTime();

    // Prepare payment data
    const paymentData = {
      key: MERCHANT_KEY,
      txnid: txnId,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: PAYU_SUCCESS_URL,
      furl: PAYU_FAILURE_URL,
    };

    // Generate the hash for the payment request
    paymentData.hash = generateHash(paymentData);

    // Send the payment data to the frontend
    res.status(200).json({
      paymentData,
    });

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
};

module.exports = { payment };
