
const OrderModel = require('../Model/OrderScema');
const BillingModel = require('../Model/BillingSchema');




// const ContractorBillCrete = async (req, res) => {
//     try {
//         const { orderId, charges } = req.body;

//         // 🔒 Basic validation
//         if (!orderId || !charges) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "orderId and charges are required"
//             });
//         }

//         // 🔍 Order fetch
//         const order = await OrderModel.findById(orderId);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Order not found"
//             });
//         }

//         // 🔄 Parse if string
//         let parsedCharges = charges;
//         if (typeof charges === "string") {
//             try {
//                 parsedCharges = JSON.parse(charges);
//             } catch (e) {
//                 return res.status(400).json({
//                     success: false,
//                     msg: "Invalid charges format"
//                 });
//             }
//         }

//         const cleanedCharges = parsedCharges.map(item => {

//             if (!item.type || !item.amount) return null;

//             return {
//                 type: item.type,
//                 amount: Number(item.amount) || 0,  // 🔥 FIX (for ALL cases)
//                 locked: item.locked || false
//             };

//         }).filter(Boolean);


//         // ❌ Empty validation
//         if (cleanedCharges.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "No valid charges"
//             });
//         }

//         // ✅ Total
//         const total = cleanedCharges.reduce(
//             (sum, item) => sum + (Number(item.amount) || 0),
//             0
//         );

//         // 🔍 Check existing bill (IMPORTANT FIX)
//         let existingBill = await BillingModel.findOne({
//             orderId: order._id.toString()
//         });

//         let billing;

//         if (!existingBill) {
//             // 🆕 CREATE
//             billing = new BillingModel({
//                 orderId: order._id.toString(),
//                 contractorId: order.ContractorIdd, // ⚠️ confirm field




//                 contractorBilling: {
//                     charges: cleanedCharges,
//                     total,
//                     IsUpdate: true,
//                     submittedAt: new Date(),
//                     pendingAmount: total - Math.round(total * 0.05),
//                     totalwithplateformcharge: total - Math.round(total * 0.05)
//                 },

//                 status: "quoted",

//             });

//             await billing.save();

//         } else {
//             // 🔄 UPDATE
//             existingBill.contractorBilling = {
//                 charges: cleanedCharges,
//                 total,
//                 IsUpdate: true,
//                 submittedAt: new Date()
//             };

//             existingBill.status = "quoted";

//             await existingBill.save();

//             billing = existingBill;
//         }

//         // 🔥 Optional: sync order status
//         order.status = "quoted";
//         await order.save();


//         // 🎯 Response
//         res.status(200).json({
//             success: true,
//             msg: existingBill
//                 ? "Contractor bill updated successfully"
//                 : "Contractor bill created successfully",
//             data: billing
//         });

//     } catch (err) {
//         console.error("ERROR 👉", err);
//         res.status(500).json({
//             success: false,
//             msg: err.message
//         });
//     }
// };











const recalculateBilling = async (bill) => {

    const contractorTotal = Number(bill.contractorBilling?.total) || 0;

    const adminBase = Number(bill.adminBilling?.baseAmount) || 0;

    const extraTotal = Array.isArray(bill.adminBilling?.extras)
        ? bill.adminBilling.extras.reduce((sum, e) => sum + Number(e.amount || 0), 0)
        : 0;

    const finalAdminTotal = adminBase + extraTotal;

    // ✅ CLIENT BILL
    const totalBill = contractorTotal + finalAdminTotal;
    const totalWithGST = totalBill + Math.round(totalBill * 0.05);

    bill.clientBilling = {
        finalAmount: totalBill,
        finalAmountWithGST: totalWithGST
    };

    // ✅ PAYMENT CALCULATION
    const paymentHistory = Array.isArray(bill.payment?.paidAmount)
        ? bill.payment.paidAmount
        : [];

    const totalPaidAmount = paymentHistory.reduce((sum, e) => {
        return e?.status === "success"
            ? sum + Number(e.amount || 0)
            : sum;
    }, 0);

    const pendingAmount = totalWithGST - totalPaidAmount;

    bill.payment = {
        TotalAmount: totalWithGST,
        paidAmount: paymentHistory,
        totalPaidAmount,
        pendingAmount: pendingAmount > 0 ? pendingAmount : 0,
        status: pendingAmount <= 0 ? "paid" : "pending"
    };

    return bill;
};










// const ContractorBillCrete = async (req, res) => {
//     try {
//         const { orderId, charges } = req.body;

//         if (!orderId || !charges) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "orderId and charges are required"
//             });
//         }

//         const order = await OrderModel.findById(orderId);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Order not found"
//             });
//         }

//         // ✅ Parse charges
//         let parsedCharges = charges;
//         if (typeof charges === "string") {
//             try {
//                 parsedCharges = JSON.parse(charges);
//             } catch {
//                 return res.status(400).json({
//                     success: false,
//                     msg: "Invalid charges format"
//                 });
//             }
//         }

//         // ✅ Clean charges
//         const cleanedCharges = parsedCharges.map(item => {
//             if (!item.type || !item.amount) return null;

//             return {
//                 type: item.type,
//                 amount: Number(item.amount) || 0,
//                 locked: item.locked || false
//             };
//         }).filter(Boolean);

//         if (cleanedCharges.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "No valid charges"
//             });
//         }

//         const total = cleanedCharges.reduce(
//             (sum, item) => sum + item.amount,
//             0
//         );

//         let bill = await BillingModel.findOne({
//             orderId: order._id.toString()
//         });

//         // =========================
//         // 🆕 CREATE
//         // =========================
//         if (!bill) {
//             bill = new BillingModel({
//                 orderId: order._id.toString(),
//                 contractorId: order.ContractorIdd,

//                 contractorBilling: {
//                     charges: cleanedCharges,
//                     total,
//                     IsUpdate: true,
//                     submittedAt: new Date()
//                 },

//                 status: "quoted"
//             });
//         } 
//         // =========================
//         // 🔄 UPDATE
//         // =========================
//         else {
//             bill.contractorBilling = {
//                 charges: cleanedCharges,
//                 total,
//                 IsUpdate: true,
//                 submittedAt: new Date()
//             };

//             bill.status = "quoted";
//         }

//         // 🔥 AUTO RECALCULATION
//         await recalculateBilling(bill);

//         await bill.save();

//         // 🔄 sync order
//         order.status = "quoted";
//         await order.save();

//         res.status(200).json({
//             success: true,
//             msg: "Contractor bill saved successfully",
//             data: bill
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             msg: err.message
//         });
//     }
// };


const ContractorBillCrete = async (req, res) => {
    try {
        const { orderId, charges } = req.body;

        if (!orderId || !charges) {
            return res.status(400).json({
                success: false,
                msg: "orderId and charges are required"
            });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "Order not found"
            });
        }

        let parsedCharges = charges;
        if (typeof charges === "string") {
            try {
                parsedCharges = JSON.parse(charges);
            } catch {
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
                amount: Number(item.amount) || 0,
                locked: item.locked || false
            };
        }).filter(Boolean);

        if (cleanedCharges.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "No valid charges"
            });
        }

        const total = cleanedCharges.reduce((sum, item) => sum + item.amount, 0);

        let bill = await BillingModel.findOne({ orderId: order._id.toString() });

        const platformCharge = Math.round(total * 0.05);
        const finalTotal = total - platformCharge;

        // =========================
        // 🆕 CREATE
        // =========================
        if (!bill) {
            bill = new BillingModel({
                orderId: order._id.toString(),
                contractorId: order.ContractorIdd,

                contractorBilling: {
                    charges: cleanedCharges,
                    total,
                    totalwithplateformcharge: finalTotal,
                    paidAmount: [],
                    totalPaidAmount: 0,
                    pendingAmount: finalTotal,
                    IsUpdate: true,
                    submittedAt: new Date()
                },

                status: "quoted"
            });
        } 
        // =========================
        // 🔄 UPDATE
        // =========================
        else {
            const oldData = bill.contractorBilling || {};

            const totalPaidAmount = (oldData.paidAmount || []).reduce((sum, e) => {
                return e.status === "success"
                    ? sum + Number(e.amount || 0)
                    : sum;
            }, 0);

            const pendingAmount = finalTotal - totalPaidAmount;

            bill.contractorBilling = {
                ...oldData,
                charges: cleanedCharges,
                total,
                totalwithplateformcharge: finalTotal,
                totalPaidAmount,
                pendingAmount: pendingAmount > 0 ? pendingAmount : 0,
                IsUpdate: true,
                submittedAt: new Date()
            };

            bill.status = "quoted";
        }

        // 🔥🔥🔥 MOST IMPORTANT FIX
        await recalculateBilling(bill);

        await bill.save();

        order.status = "quoted";
        await order.save();

        res.status(200).json({
            success: true,
            msg: "Contractor bill saved successfully",
            data: bill
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: err.message
        });
    }
};

























const upsertAdminBilling = async (req, res) => {
    try {
        const { orderId, baseAmount, extras } = req.body;

        let bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({
                message: "Order bill not found"
            });
        }

        const base = Number(baseAmount) || 0;

        const extraTotal = Array.isArray(extras)
            ? extras.reduce((sum, e) => sum + Number(e.amount || 0), 0)
            : 0;

        const finalAdminTotal = base + extraTotal;

        // ✅ ADMIN BILL UPDATE
        bill.adminBilling = {
            baseAmount: base,
            extras: Array.isArray(extras) ? extras : [],
            extraTotal,
            finalTotal: finalAdminTotal,
            locked: false,
            finalizedAt: null
        };

        // 🔥 AUTO RECALCULATION
        await recalculateBilling(bill);

        await bill.save();

        res.status(200).json({
            message: "Admin billing updated successfully",
            data: bill
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
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













// // CREATE / UPDATE ADMIN BILLING
// const upsertAdminBilling = async (req, res) => {
//     try {
//         const { orderId, baseAmount, extras } = req.body;

//         let bill = await BillingModel.findOne({ orderId });

//         if (!bill) {
//             return res.status(404).json({ message: "Order bill not found" });
//         }

//         // =========================
//         // 🔥 SAFE EXTRAS CALCULATION
//         // =========================
//         const extraTotal = Array.isArray(extras)
//             ? extras.reduce((sum, e) => sum + Number(e.amount || 0), 0)
//             : 0;

//         const base = Number(baseAmount) || 0;
//         const finalAdminTotal = base + extraTotal;

//         // =========================
//         // 🔥 UPDATE ADMIN BILLING
//         // =========================
//         bill.adminBilling = {
//             baseAmount: base,
//             extras: Array.isArray(extras) ? extras : [],
//             extraTotal,
//             finalTotal: finalAdminTotal,
//             locked: false,
//             finalizedAt: null
//         };

//          await bill.save();
//         // =========================
//         // 🔥 TOTAL BILL CALCULATION
//         // =========================
//         const contractorTotal = Number(bill.contractorBilling?.total) || 0;

//         const totalBill = contractorTotal + finalAdminTotal;

//         const totalWithGST = totalBill + Math.round(totalBill * 0.05);

//         bill.clientBilling = {
//             finalAmount: totalBill,
//             finalAmountWithGST: totalWithGST
//         };


//         await bill.save();

//         // =========================
//         // 🔥 PAYMENT HISTORY SAFE
//         // =========================
//         const paymentHistory = Array.isArray(bill.payment?.paidAmount)
//             ? bill.payment.paidAmount
//             : [];

//         // =========================
//         // 🔥 CALCULATE TOTAL PAID
//         // =========================
//         const totalPaidAmount = paymentHistory.reduce((sum, e) => {
//             return e?.status === "success"
//                 ? sum + Number(e.amount || 0)
//                 : sum;
//         }, 0);

//         // =========================
//         // 🔥 FINAL PAYMENT CALCULATION
//         // =========================
//         const finalAmount = Number(totalWithGST) || 0;

//         const pendingAmount = finalAmount - totalPaidAmount;

//         bill.payment = {
//             TotalAmount: finalAmount,
//             paidAmount: paymentHistory, // ✅ history safe
//             totalPaidAmount: totalPaidAmount,
//             pendingAmount: pendingAmount > 0 ? pendingAmount : 0,
//             status: pendingAmount <= 0 ? "paid" : "pending"
//         };

//         // =========================
//         // 🔥 SINGLE SAVE (OPTIMIZED)
//         // =========================
//         await bill.save();

//         res.status(200).json({
//             message: "Admin billing saved successfully",
//             data: bill
//         });

//     } catch (error) {
//         console.error("ERROR:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
















///2


// const upsertContractorAmountBilling = async (req, res) => {
//     try {
//         const { orderId, ContractorPaidAmount, status } = req.body;

//         let bill = await BillingModel.findOne({ orderId });

//         if (!bill) {
//             return res.status(404).json({
//                 message: "Order bill not found"
//             });
//         }

//         // ✅ ensure structure
//         if (!bill.contractorBilling) {
//             bill.contractorBilling = {};
//         }

//         if (!Array.isArray(bill.contractorBilling.paidAmount)) {
//             bill.contractorBilling.paidAmount = [];
//         }

//         // ✅ push payment
//         if (ContractorPaidAmount) {
//             bill.contractorBilling.paidAmount.push({
//                 amount: Number(ContractorPaidAmount) || 0,
//                 status: status || "success",
//                 date: new Date()
//             });
//         }

//         // =========================
//         // 🔥 CORE FIX
//         // =========================

//         // ✅ ALWAYS base total use karo
//         const contractorTotal = Number(bill.contractorBilling.total) || 0;

//         // ✅ dynamic platform charge
//         const platformCharge = Math.round(contractorTotal * 0.05);

//         const finalTotal = contractorTotal - platformCharge;

//         // =========================
//         // ✅ CALCULATE PAID
//         // =========================
//         const totalPaidAmount = bill.contractorBilling.paidAmount.reduce((sum, e) => {
//             return e.status === "success"
//                 ? sum + Number(e.amount || 0)
//                 : sum;
//         }, 0);

//         // =========================
//         // ✅ PENDING FIX
//         // =========================
//         let pendingAmount = finalTotal - totalPaidAmount;

//         // ❗ NEVER NEGATIVE
//         if (pendingAmount < 0) pendingAmount = 0;

//         // =========================
//         // ✅ SAVE VALUES
//         // =========================
//         bill.contractorBilling.totalPaidAmount = totalPaidAmount;
//         bill.contractorBilling.pendingAmount = pendingAmount;

//         // ❗ optional (debug ke liye rakh sakte ho)
//         bill.contractorBilling.totalwithplateformcharge = finalTotal;

//         await bill.save();

//         res.status(200).json({
//             message: "Contractor billing updated successfully",
//             data: bill.contractorBilling
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// };



//1

// const upsertContractorAmountBilling = async (req, res) => {
//     try {
//         const { orderId, contractorId, ContractorPaidAmount, status } = req.body;

//         let bill = await BillingModel.findOne({ orderId });

//         if (!bill) {
//             return res.status(404).json({ message: "Order bill not found" });
//         }

//         // ✅ ensure array exists
//         if (!bill.contractorBilling.paidAmount) {
//             bill.contractorBilling.paidAmount = [];
//         }

//         // ✅ push new payment (history maintain)
//         bill.contractorBilling.paidAmount.push({
//             amount: Number(ContractorPaidAmount),
//             status: status || "success",
//             date: new Date()
//         });

        
//           await bill.save();



//           const contractorTotalPending = bill.contractorBilling?.totalwithplateformcharge || 0;

//         // ✅ calculate only success payments
//         const totalHistoryAmount = bill.contractorBilling.paidAmount.reduce((sum, e) => {
//             return e.status === "success" ? sum + Number(e.amount) : sum;
//         }, 0);

//         // ✅ pending calculation
//         const contractorPendingAmount = contractorTotalPending - totalHistoryAmount;

//         bill.contractorBilling.pendingAmount = contractorPendingAmount;

//         bill.contractorBilling.totalPaidAmount = totalHistoryAmount;
        

//         await bill.save(); // ✅ single save

//         res.status(200).json({
//             message: "Contractor billing updated successfully",
//             data: bill.contractorBilling
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };















const upsertContractorAmountBilling = async (req, res) => {
    try {
        const { orderId, ContractorPaidAmount, status } = req.body;

        let bill = await BillingModel.findOne({ orderId });

        if (!bill) {
            return res.status(404).json({
                message: "Order bill not found"
            });
        }

        const contractorBilling = bill.contractorBilling || {};

        if (!Array.isArray(contractorBilling.paidAmount)) {
            contractorBilling.paidAmount = [];
        }

        // ✅ Add payment
        if (ContractorPaidAmount) {
            contractorBilling.paidAmount.push({
                amount: Number(ContractorPaidAmount) || 0,
                status: status || "success",
                date: new Date()
            });
        }

        // ✅ Base total
        const contractorTotal = Number(contractorBilling.total) || 0;

        const platformCharge = Math.round(contractorTotal * 0.05);
        const finalTotal = contractorTotal - platformCharge;

        // ✅ Paid calc
        const totalPaidAmount = contractorBilling.paidAmount.reduce((sum, e) => {
            return e.status === "success"
                ? sum + Number(e.amount || 0)
                : sum;
        }, 0);

        let pendingAmount = finalTotal - totalPaidAmount;
        if (pendingAmount < 0) pendingAmount = 0;

        // ✅ Update fields
        contractorBilling.totalPaidAmount = totalPaidAmount;
        contractorBilling.pendingAmount = pendingAmount;
        contractorBilling.totalwithplateformcharge = finalTotal;

        bill.contractorBilling = contractorBilling;

        await bill.save();

        res.status(200).json({
            message: "Contractor billing updated successfully",
            data: contractorBilling
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
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


        await bill.save();


        const clientTotal = bill.payment?.TotalAmount || 0;

        // ✅ calculate only success payments
        const totalHistoryAmount = bill.payment.paidAmount.reduce((sum, e) => {
            return e.status === "success" ? sum + Number(e.amount) : sum;
        }, 0);

        // ✅ pending calculation
        const clientPendingAmount = clientTotal - totalHistoryAmount;

        bill.payment.pendingAmount = clientPendingAmount;

        bill.payment.totalPaidAmount = totalHistoryAmount;
        

        await bill.save(); 




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