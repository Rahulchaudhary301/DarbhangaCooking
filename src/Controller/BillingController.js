
const OrderModel = require('../Model/OrderScema');
const BillingModel = require('../Model/BillingSchema');




const ContractorBillCrete = async (req, res) => {
    try {
        const { orderId, charges } = req.body;

        // 🔒 Basic validation
        if (!orderId || !charges) {
            return res.status(400).json({
                success: false,
                msg: "orderId and charges are required"
            });
        }

        // 🔍 Order fetch
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "Order not found"
            });
        }

        // 🔄 Parse if string
        let parsedCharges = charges;
        if (typeof charges === "string") {
            try {
                parsedCharges = JSON.parse(charges);
            } catch (e) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid charges format"
                });
            }
        }

        const cleanedCharges = parsedCharges.map(item => {

            if (!item.type || !item.amount) return null;

            return {
                type: item.type,
                amount: Number(item.amount) || 0,  // 🔥 FIX (for ALL cases)
                locked: item.locked || false
            };

        }).filter(Boolean);


        // ❌ Empty validation
        if (cleanedCharges.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "No valid charges"
            });
        }

        // ✅ Total
        const total = cleanedCharges.reduce(
            (sum, item) => sum + (Number(item.amount) || 0),
            0
        );

        // 🔍 Check existing bill (IMPORTANT FIX)
        let existingBill = await BillingModel.findOne({
            orderId: order._id.toString()
        });

        let billing;

        if (!existingBill) {
            // 🆕 CREATE
            billing = new BillingModel({
                orderId: order._id.toString(),
                contractorId: order.ContractorIdd, // ⚠️ confirm field

                contractorBilling: {
                    charges: cleanedCharges,
                    total,
                    IsUpdate: true,
                    submittedAt: new Date(),
                    pendingAmount: total - Math.round(total * 0.05)
                },

                status: "quoted",

            });

            await billing.save();

        } else {
            // 🔄 UPDATE
            existingBill.contractorBilling = {
                charges: cleanedCharges,
                total,
                IsUpdate: true,
                submittedAt: new Date()
            };

            existingBill.status = "quoted";

            await existingBill.save();

            billing = existingBill;
        }

        // 🔥 Optional: sync order status
        order.status = "quoted";
        await order.save();

        // 🎯 Response
        res.status(200).json({
            success: true,
            msg: existingBill
                ? "Contractor bill updated successfully"
                : "Contractor bill created successfully",
            data: billing
        });

    } catch (err) {
        console.error("ERROR 👉", err);
        res.status(500).json({
            success: false,
            msg: err.message
        });
    }
};







const getBillById = async (req, res) => {
    try {
        // Fetch all users sorted by creation time in descending order

        const { orderId, contractorId } = req.body;

        // console.log(orderId , contractorId)

        const updatedData = await BillingModel.findOne({ contractorId: contractorId, orderId: orderId });

        res.status(200).send({ status: true, data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};









const unlockContractorCharge = async (req, res) => {
    try {
        const { orderId, contractorId, chargeId } = req.body;

        // ✅ FIXED validation
        if (!orderId || !contractorId || !chargeId) {
            return res.status(400).json({
                success: false,
                msg: "orderId, contractorId & chargeId required"
            });
        }

        // 🔍 Find bill
        const bill = await BillingModel.findOne({
            orderId: orderId.toString(),
            contractorId
        });

        if (!bill) {
            return res.status(404).json({
                success: false,
                msg: "Bill not found"
            });
        }

        // 🔥 FIND ITEM DIRECTLY (BEST WAY)
        const chargeItem = bill.contractorBilling.charges.id(chargeId);

        if (!chargeItem) {
            return res.status(404).json({
                success: false,
                msg: "Charge item not found"
            });
        }

        // 🔓 Unlock
        chargeItem.locked = false;

        // 🔓 Allow adding new
        bill.contractorBilling.IsUpdate = false;

        await bill.save();

        res.status(200).json({
            success: true,
            msg: "Item unlocked successfully",
            data: bill
        });

    } catch (err) {
        console.error("Unlock Error 👉", err);
        res.status(500).json({
            success: false,
            msg: err.message
        });
    }
};








const unlockNewChargePermission = async (req, res) => {
    try {
        const { orderId, contractorId } = req.body;

        // 🔒 Validation
        if (!orderId || !contractorId) {
            return res.status(400).json({
                success: false,
                msg: "orderId & contractorId required"
            });
        }

        // 🔍 Find Bill
        const bill = await BillingModel.findOne({
            orderId: orderId.toString(),
            contractorId
        });

        if (!bill) {
            return res.status(404).json({
                success: false,
                msg: "Bill not found"
            });
        }

        // 🔓 Unlock "Add New Charge"
        bill.contractorBilling.IsUpdate = false;

        await bill.save();

        res.status(200).json({
            success: true,
            msg: "New charge adding unlocked",
            data: bill
        });

    } catch (err) {
        console.error("Unlock Add Charge Error 👉", err);
        res.status(500).json({
            success: false,
            msg: err.message
        });
    }
};






const AdminConfirmAmountwithContractor = async (req, res) => {
    try {

        const data = req.body;

        const { orderId ,contractorId } = data
       
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd:contractorId , _id: orderId },
            {
                $set: {                    
                  IsAmountConfirmFromcontractor: true,
                }
            }, // Update fields
            { new: true }
        );

        // console.log(updatedData.IsContractorPrepaiedOrder)

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully" });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};








// CREATE / UPDATE ADMIN BILLING
const upsertAdminBilling = async (req, res) => {
    try {
        const { orderId, baseAmount, extras } = req.body;

       // console.log(extras)

        let bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({ message: "Order bill not found" });
        }

        // 🔥 Calculate totals
        const extraTotal = extras.reduce((sum, e) => sum + Number(e.amount), 0);
        const finalTotal = Number(baseAmount) + extraTotal;

        const contractorTotal = bill.contractorBilling?.total || 0;
        const profit = finalTotal - contractorTotal;

        // 🔥 Update admin billing
        bill.adminBilling = {
            baseAmount,
            extras,
            extraTotal,
            finalTotal,
            profit,
            locked: false,
            finalizedAt: null
        };

        await bill.save();

         const contractorTotals = bill.contractorBilling?.total || 0;

         const AdminTotal = bill.adminBilling?.finalTotal || 0;

         const TotalBill = contractorTotals + AdminTotal  

         const TotalBillIncludeGST = TotalBill + Math.round(TotalBill * 0.05)


         bill.clientBilling = {
            finalAmount: TotalBill,
            finalAmountWithGST: TotalBillIncludeGST
        };

        await bill.save();

        const FinalAmounts= bill.clientBilling.finalAmount
        const PaidAmounts= bill.payment.paidAmount
        const sta = FinalAmounts-PaidAmounts > 0 ? "Pending":"Paid"

         bill.payment = {
            paidAmount :PaidAmounts,
            pendingAmount:FinalAmounts-PaidAmounts,
           // status: sta,

        };

         await bill.save();



        res.status(200).json({
            message: "Admin billing saved",
            data: bill.adminBilling
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};



























const upsertContractorAmountBilling = async (req, res) => {
    try {
        const { orderId, contractorId, ContractorPaidAmount, status } = req.body;

        let bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({ message: "Order bill not found" });
        }

        // ✅ ensure array exists
        if (!bill.contractorBilling.paidAmount) {
            bill.contractorBilling.paidAmount = [];
        }

        // ✅ push new payment
        bill.contractorBilling.paidAmount.push({
            amount: Number(ContractorPaidAmount),
            status: status || "success",
            date: new Date()
        });

        // ✅ 🔥 IMPORTANT: use FIXED TOTAL AMOUNT (NOT pending)
        const contractorTotalAmount = bill.contractorBilling.totalAmount || 0;

        // ✅ sum only successful payments
        const totalPaid = bill.contractorBilling.paidAmount.reduce((sum, e) => {
            return e.status === "success" ? sum + Number(e.amount) : sum;
        }, 0);

        // ✅ calculate pending correctly
        const pendingAmount = contractorTotalAmount - totalPaid;

        // ✅ update fields
        bill.contractorBilling.totalPaidAmount = totalPaid;
        bill.contractorBilling.pendingAmount = pendingAmount < 0 ? 0 : pendingAmount;

        await bill.save();

        res.status(200).json({
            message: "Contractor billing updated successfully",
            data: bill.contractorBilling
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
















const upsertClientsAmountBilling = async (req, res) => {
    try {
        const { orderId, contractorId, ClientsPaidAmount, status } = req.body;

        let bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({ message: "Order bill not found" });
        }

        // ✅ ensure array exists
        if (!bill.payment.paidAmount) {
            bill.payment.paidAmount = [];
        }

        // ✅ push new payment (history maintain)
        bill.payment.paidAmount.push({
            amount: Number(ClientsPaidAmount),
            status: status || "success",
            date: new Date()
        });

        const clientTotal = bill.payment?.pendingAmount || 0;

        // ✅ calculate only success payments
        const totalHistoryAmount = bill.payment.paidAmount.reduce((sum, e) => {
            return e.status === "success" ? sum + Number(e.amount) : sum;
        }, 0);

        // ✅ pending calculation
        const clientPendingAmount = clientTotal - totalHistoryAmount;

        bill.payment.pendingAmount = clientPendingAmount;

        bill.payment.totalPaidAmount = totalHistoryAmount;
        

        await bill.save(); // ✅ single save

        res.status(200).json({
            message: "Client billing updated successfully",
            data: bill
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};





























const getAdminBilling = async (req, res) => {
    try {
        const { orderId } = req.params;

        const bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json({
            adminBilling: bill.adminBilling || null
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
























module.exports = { ContractorBillCrete, getBillById, unlockContractorCharge, 
     upsertAdminBilling, getAdminBilling,
    
    unlockNewChargePermission , AdminConfirmAmountwithContractor , upsertContractorAmountBilling  , upsertClientsAmountBilling};