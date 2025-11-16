import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      immutable: true,
    },

    timestamp: {
      type: Date,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    productCategory: {
      type: String,
      required: true,
    },

    salesAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    customerTier: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

transactionSchema.index({ transactionId: 1 }, { unique: true });

transactionSchema.index(
  { region: 1, timestamp: -1, salesAmount: -1 },
  { name: "idx_region_time_amount" }
);

transactionSchema.index(
  { productCategory: 1, timestamp: -1, salesAmount: -1 },
  { name: "idx_category_time_amount" }
);

transactionSchema.index(
  { customerTier: 1, timestamp: -1, salesAmount: -1 },
  { name: "idx_tier_time_amount" }
);

transactionSchema.index(
  { timestamp: -1, _id: -1 },
  { name: "idx_paginate_timestamp" }
);

transactionSchema.index(
  { salesAmount: -1, _id: -1 },
  { name: "idx_paginate_amount" }
);

const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
