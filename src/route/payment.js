// routes/payment.js
const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

   // console.log("rahul")

    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});





// routes/payment.js
const crypto = require("crypto");

router.post("/verify", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_SECRET")
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ PAYMENT VERIFIED

    // 👉 DB update karo (important)
    // paidAmount += payment
    // pendingAmount -= payment

    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});






router.post("/webhook", express.json({ verify: (req, res, buf) => {
  req.rawBody = buf;
}}), (req, res) => {

  const secret = "YOUR_WEBHOOK_SECRET";

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.rawBody);

  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {

    const event = req.body;

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      // 🔥 DB UPDATE HERE
      // find order using receipt or metadata
      // update payment status

      console.log("Payment Captured:", payment.amount / 100);
    }

    res.status(200).send("OK");
  } else {
    res.status(400).send("Invalid signature");
  }
});




module.exports = router;