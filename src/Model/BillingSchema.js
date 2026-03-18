import mongoose from "mongoose";

const OrderBillSchema = new mongoose.Schema(
  {
    // 🔗 लिंक Order से (MOST IMPORTANT)
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true // 1 order = 1 bill
    },

    clientId: {
      type: String,
      required: true
    },

    contractorId: {
      type: String,
      required: true
    },

    // =========================
    // 🔹 CONTRACTOR BILLING
    // =========================
    contractorBilling: {
      charges: [
        {
          type: String,   // ✅ fixed
          amount: Number,
          locked: { type: Boolean, default: false }
        }
      ],

      total: { type: Number, default: 0 },

      submittedAt: Date
    },

    // =========================
    // 🔹 ADMIN BILLING
    // =========================
    adminBilling: {
      baseAmount: { type: Number, default: 0 },

      extras: [
        {
          name: String,
          amount: Number
        }
      ],

      extraTotal: { type: Number, default: 0 },

      finalTotal: { type: Number, default: 0 },

      profit: { type: Number, default: 0 },

      locked: { type: Boolean, default: false },

      finalizedAt: Date
    },

    // =========================
    // 🔹 CLIENT BILLING
    // =========================
    clientBilling: {
      finalAmount: { type: Number, default: 0 },

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

    // =========================
    // 🔹 PAYMENT
    // =========================
    payment: {
      paidAmount: { type: Number, default: 0 },
      pendingAmount: { type: Number, default: 0 },
      method: String,
      status: {
        type: String,
        enum: ["pending", "partial", "paid"],
        default: "pending"
      }
    },

    // =========================
    // 🔹 STATUS FLOW
    // =========================
    status: {
      type: String,
      enum: ["created", "quoted", "finalized", "completed"],
      default: "created"
    }
  },
  { timestamps: true }
);

export default mongoose.model("OrderBill", OrderBillSchema);