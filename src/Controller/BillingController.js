const BillingModel = require('../Model/BillingSchema');
const OrderModel = require('../Model/OrderScema');





const ContractorBillCrete = async (req, res) => {
  try {
    const { orderId, charges } = req.body;


    console.log(orderId, charges)

    // 🔒 Validation
    if (!orderId || !charges || !Array.isArray(charges)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid data"
      });
    }

    // 🔍 Step 1: Check Order exist
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "Order not found"
      });
    }



    // 🔍 Step 2: Check Billing already exist
    const existingBill = await BillingModel.findOne({ orderId });

    if (existingBill && existingBill.contractorBilling?.total > 0) {
      return res.status(400).json({
        success: false,
        msg: "Contractor already submitted"
      });
    }

    // 🔥 Clean & Lock charges
    const cleanedCharges = charges.map((item) => ({
      type: item.type,
      amount: Number(item.amount),
      locked: true
    }));

    // ✅ Total
    const total = cleanedCharges.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    let billing;

    // 🆕 Step 3: Create OR Update
    if (!existingBill) {
      // ✅ Create new billing (FIRST TIME)
      billing = new BillingModel({
        orderId,
        contractorBilling: {
          charges: cleanedCharges,
          total,
          submittedAt: new Date()
        },
        status: "quoted"
      });

      await billing.save();

    } else {
      // 🔄 Update existing billing
      existingBill.contractorBilling = {
        charges: cleanedCharges,
        total,
        submittedAt: new Date()
      };

      existingBill.status = "quoted";

      await existingBill.save();

      billing = existingBill;
    }

    // 🔥 Update Order Status also
    order.status = "quoted";
    await order.save();

    // 🎯 Response
    res.status(200).json({
      success: true,
      msg: "Contractor quote submitted",
      data: billing
    });

  } catch (err) {
    console.error("Contractor Billing Error:", err);
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};





module.exports = { ContractorBillCrete };