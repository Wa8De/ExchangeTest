const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Amount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Balance",
  },

  CurrencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency", // Reference the 'Currency' model
    required: true,
  },
  TypeTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transactionsCategory",
    required: false,
  },
  Commission: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    default: "Pending",
  },
  Raison: {
    type: String,
    required: false,
    default: null,
  },
  Description: {
    type: String,
    required: false,
    default: null,
  },
  Commentaire: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set to the current timestamp by default
  },
  transactionHistory: [
    [
      {
        property: {
          type: String,
          default: null,
        },
        previous: {
          type: String,
          default: null,
        },
        latest: {
          type: String,
          default: null,
        },
        event: {
          type: String,
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  ],
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
