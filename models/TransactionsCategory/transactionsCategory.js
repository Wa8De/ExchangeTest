const mongoose = require("mongoose");

const TransactionsCategory = mongoose.Schema({
  NameCategory: {
    type: String,
    required: true,
  },
  DescriptionCategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TransactionsCategory", TransactionsCategory);
