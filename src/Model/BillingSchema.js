const mongoose = require("mongoose");

const OrderBillSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true
        },

        // clientId: {
        //   type: String,
        //   required: true
        // },

        contractorId: {
            type: String,
            required: true
        },

        contractorBilling: {
            charges: [
                {
                    type: {
                        type: String,   // 🔥 IMPORTANT (nested type)
                        required: true
                    },
                    amount: {
                        type: Number,
                        required: true
                    },
                    locked: {
                        type: Boolean,
                        default: false
                    }
                }
            ],

            // 🔥 change here
            paidAmount: [
                {
                    amount: { type: Number, required: true },
                    date: { type: Date, default: Date.now },
                    status: {
                        type: String,
                        enum: ["success", "pending", "failed"],
                        default: "pending"
                    }
                }
            ],

             
            pendingAmount: { type: Number, default: 0 },
            totalPaidAmount: { type: Number, default: 0 },

            total: { type: Number, default: 0 },
            totalwithplateformcharge: { type: Number, default: 0 },
            IsUpdate: {
                type: Boolean,
                default: false
            },
            submittedAt: Date
        },

        adminBilling: {
            baseAmount: { type: Number, default: 0 },
            extras: [
                {
                    name: String,
                    Quantity: String,
                    amount: Number
                }
            ],
            extraTotal: { type: Number, default: 0 },
            finalTotal: { type: Number, default: 0 },
            profit: { type: Number, default: 0 },
            locked: { type: Boolean, default: false },
            finalizedAt: Date
        },

        clientBilling: {
            finalAmount: { type: Number, default: 0 },
            finalAmountWithGST: { type: Number, default: 0 },
            breakdown: [
                {
                    name: String,
                    amount: Number,
                    source: {
                        type: String,
                        enum: ["contractor", "admin"]
                    }
                }
            ],
            status: {
                type: String,
                enum: ["pending", "approved", "rejected"],
                default: "pending"
            },
            approvedAt: Date
        },

        payment: {
            TotalAmount: { type: Number, default: 0 },
            paidAmount: [
                {
                    amount: { type: Number, required: true },
                    date: { type: Date, default: Date.now },
                    status: {
                        type: String,
                        enum: ["success", "pending", "failed"],
                        default: "pending"
                    }
                }
            ],

            pendingAmount: { type: Number, default: 0 },
            totalPaidAmount: { type: Number, default: 0 },
        },

        status: {
            type: String,
            enum: ["created", "quoted", "finalized", "completed"],
            default: "created"
        }
    },
    { timestamps: true }
);

// ✅ Correct model name
const BillModel = mongoose.model("OrderBill", OrderBillSchema);

module.exports = BillModel;