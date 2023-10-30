const TransactionsCategory = require("../../models/TransactionTypes/TransactionsCategory");
const Balance = require("../../models/balance/balance");
const Currency = require("../../models/currencies/currency");
const Transaction = require("../../models/transactions/transaction");
const Profile = require("../../models/users/Profile");
const User = require("../../models/users/User");

class HistoryController {
  static getUsersHistory = async (req, res) => {
    try {
      const users = await User.find();
      const UserHistory = [];

      for (const user of users) {
        const userProfile = await Profile.findOne({ _id: user.profile });

        if (!userProfile) {
          continue;
        }

        const schema = {
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          CIN: userProfile.CIN,
          email: user.email,
          userHistory: user.userHistory,
        };

        UserHistory.push(schema);
      }

      return res.status(200).json({ History: UserHistory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  static getTransactionsHistory = async (req, res) => {
    try {
      const transactions = await Transaction.find();
      const TransactionsHistory = [];

      for (const transaction of transactions) {
        const user = await User.findOne({ _id: transaction.ClientId });
        const profile = await Profile.findOne({ _id: user.profile });
        const balance = await Balance.findOne({ _id: transaction.Amount });
        const currency = await Currency.findOne({
          _id: transaction.CurrencyId,
        });
        const category = await TransactionsCategory.findOne({
          _id: transaction.TypeTransaction,
        });

        console.log(category);
        if (!balance || !currency || !category || !profile) {
          continue;
        }

        const schema = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: user.email,
          amount: balance.Amount,
          currency: currency.CurrencyCode,
          category: category.NameCategory,
          commission: transaction.Commission,
          status: transaction.Status,
          raison: transaction.raison,
          TransactionHistory: transaction.transactionHistory,
        };

        TransactionsHistory.push(schema);
      }

      return res.status(200).json({ History: TransactionsHistory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
}
module.exports = HistoryController;
