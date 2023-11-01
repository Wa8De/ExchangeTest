require("dotenv").config();
const jwt = require("jsonwebtoken");
const Balance = require("../../models/balance/balance");
const Transaction = require("../../models/transactions/transaction");
const User = require("../../models/users/User");
const Currency = require("../../models/currencies/currency");
const GetEventType = require("../../helpers/GetEventType");
const PermissionsController = require("../../controller/roles_permissions/PermissionsController");
const TransactionsCategory = require("../../models/TransactionTypes/TransactionsCategory");

class TransactionController {
  static getTransaction = async (req, res) => {
    const page = req.query.page || 1;
    const ITEMS_PER_PAGE = 20;
    const query = {
      deletedAt: null,
    };
    const { min, max, amountValue, currency, status, category, id } = req.query;
    // RANGE FILTER
    if (min || max || amountValue) {
      if (amountValue) {
        const balance = await Balance.find({ Amount: amountValue }, { _id: 1 });
        query.Amount = balance;
      }
      if (min && !max) {
        const balance = await Balance.find(
          { Amount: { $gte: min } },
          { _id: 1 }
        );
        query.Amount = balance;
      }
      if (max && !min) {
        const balance = await Balance.find(
          { Amount: { $lte: max } },
          { _id: 1 }
        );
        query.Amount = balance;
      }
      if (min && max) {
        const balance = await Balance.find(
          { Amount: { $gte: min, $lte: max } },
          { _id: 1 }
        );
        query.Amount = balance;
      }
    }

    // CURRENCY FILTER
    if (currency) {
      const selectedCurrency = await Currency.findOne({
        CurrencyCode: currency,
      });
      if (!selectedCurrency) {
        return res.status(404).json({
          message: `No transactions were found with the currency: ${currency}`,
        });
      }
      // console.log(selectedCurrency);
      query.CurrencyId = selectedCurrency._id;
    }

    if (id) {
      console.log(id);
      const client = await User.findOne({
        _id: id,
      });
      if (!id) {
        return res.status(404).json({
          message: `No Client were found with the id: ${currency}`,
        });
      }
      console.log(client);
      query.ClientId = client._id;
    }

    // CATEGORY FILTER
    if (category) {
      const selectedCategory = await TransactionsCategory.findOne({
        NameCategory: category,
      });
      if (!selectedCategory) {
        return res.status(404).json({
          message: `No transactions were found with the category: ${category}`,
        });
      }
      // console.log(selectedCategory);
      query.TypeTransaction = selectedCategory._id;
    }
    // STATUS FILTER
    if (status) {
      switch (status) {
        case "Pending":
          query.Status = "Pending";
          break;
        case "Approved":
          query.Status = "Approved";
          break;
        case "Declined":
          query.Status = "Declined";
          break;
        default:
          return res.status(404).json({
            message: `No transaction was found with the status : ${status}`,
          });
      }
    }
    const skip = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of documents to skip
    const limit = ITEMS_PER_PAGE; // Number of documents to retrieve per page

    try {
      const transactions = await Transaction.find(query)
        .populate("ClientId")
        .populate("Amount")
        .populate("CurrencyId")
        .populate("TypeTransaction")
        .populate({
          path: "ClientId",
          populate: {
            path: "profile",
            model: "Profile",
          },
        })
        .skip(skip)
        .limit(limit);
      // console.log(transactions);
      const count = await Transaction.countDocuments(query);
      const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
      res.send({ transactions, pagination: { count, pageCount, page } });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };

  static showTransaction = async (req, res) => {
    try {
      const { transId } = req.params;
      const transaction = await Transaction.findOne({
        _id: transId,
        deletedAt: null,
      })
        .populate("ClientId")
        .populate("Amount")
        .populate("CurrencyId")
        .populate("TypeTransaction")
        .populate({
          path: "ClientId",
          populate: {
            path: "profile",
            model: "Profile",
          },
        });
      console.log(transaction);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.send({ transaction });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };

  static createTransaction = async (req, res) => {
    const event = await GetEventType(req.route, req.method);
    const { Amount, CurrencyId, Commission, TypeTransaction } = req.body;
    const ClientId = req.user._id;
    // console.log(ClientId);
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "transactionsCreate"
    );
    if (HasPermission) {
      try {
        const user = await User.findById(ClientId);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const newBalance = new Balance({
          ClientId: user._id,
          TransactionId: null,
          Amount,
        });
        await newBalance.save();

        const newTransaction = new Transaction({
          ClientId: user._id,
          Amount: newBalance._id,
          CurrencyId,
          TypeTransaction,
          Commission,
        });
        await newTransaction.save();

        newBalance.TransactionId = newTransaction._id;
        newBalance.ClientId = user._id;
        await newBalance.save();

        return res
          .status(201)
          .json({ message: "Transaction created successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Create Treansaction" });
    }
  };

  static updateTransaction = async (req, res) => {
    const historyEntries = [];

    const event = await GetEventType(req.route, req.method);
    const transId = req.params.transId;
    const { Amount, CurrencyId, TypeTransaction } = req.body;
    const ClientId = req.user._id;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "transactionsModify"
    );

    if (HasPermission) {
      try {
        const transaction = await Transaction.findOne({
          _id: transId,
          deletedAt: null,
        });
        if (!transaction) {
          return res.status(404).json({ error: "Transaction not found" });
        } else {
          //Get old amount
          const OldAmount = await Balance.findOne({
            _id: transaction.Amount,
          });
          //-------------------------------------------------------------------------------

          //Get old currency
          const OldCurrency = await Currency.findOne({
            _id: transaction.CurrencyId,
          });
          //-------------------------------------------------------------------------------

          //Get old type
          const OldTransactionType = await TransactionsCategory.findOne({
            _id: transaction.TypeTransaction,
          });
          //-------------------------------------------------------------------------------

          //Get new Currency

          const NewCurrency = await Currency.findOne({
            _id: CurrencyId,
          });
          //-------------------------------------------------------------------------------

          //Get new Type

          const NewTransactionType = await TransactionsCategory.findOne({
            _id: TypeTransaction,
          });
          //-------------------------------------------------------------------------------

          //UPDATE Amount

          if (Amount !== undefined) {
            const updatedAmount = await Balance.findByIdAndUpdate(
              OldAmount._id,
              { Amount: Amount },
              { new: true }
            );
            historyEntries.push({
              property: "Amount",
              previous: OldAmount.Amount,
              latest: updatedAmount.Amount,
              event: event,
            });
          }

          if (CurrencyId !== undefined) {
            const updatedCurrency = await Transaction.findByIdAndUpdate(
              transaction._id,
              { CurrencyId: NewCurrency._id },
              { new: true }
            );
            historyEntries.push({
              property: "CurrencyId",
              previous: OldCurrency._id,
              latest: updatedCurrency.CurrencyId,
              event: event,
            });
          }

          if (TypeTransaction !== undefined) {
            const updatedType = await Transaction.findByIdAndUpdate(
              transaction._id,
              { TypeTransaction: NewTransactionType._id },
              { new: true }
            );
            historyEntries.push({
              property: "TypeTransaction",
              previous: OldTransactionType._id,
              latest: updatedType.TypeTransaction,
              event: event,
            });
          }

          if (historyEntries.length > 0) {
            transaction.transactionHistory.push(historyEntries);
            await transaction.save();
          }

          return res.status(200).json({
            message: "Transaction Updated successfully!",
            newtransaction: transaction,
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "User Not Allowed To Update Transaction" });
    }
  };

  static deleteTransaction = async (req, res) => {
    const historyEntries = [];
    const event = await GetEventType(req.route, req.method);
    const ClientId = req.user._id;
    const transId = req.params.transId;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "transactionsDelete"
    );
    if (HasPermission) {
      try {
        const transaction = await Transaction.findOne({
          _id: transId,
          deletedAt: null,
        });
        if (!transaction) {
          return res.status(404).json({ error: "Transaction not found" });
        } else {
          historyEntries.push({
            property: "Transaction.deletedAt",
            previous: transaction.deletedAt,
          });
          transaction.deletedAt = Date.now();
          historyEntries[0].latest = transaction.deletedAt;
          transaction.transactionHistory.push(historyEntries);
          transaction.save();

          return res
            .status(200)
            .json({ message: "Transaction deleted successfully" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "User Not Allowed To Delete Treansaction" });
    }
  };

  static TransactionApproval = async (req, res) => {
    const historyEntries = [];
    const transactionId = req.params.transId;
    const decision = req.body.decision;
    const raison = req.body.raison;
    const event = await GetEventType(req.route, req.method, decision);

    const HasPermission = await PermissionsController.UserHasPermission(
      req.user._id,
      "transactionsValidate"
    );

    const transaction = await Transaction.findOne({
      _id: transactionId,
      deletedAt: null,
    });
    if (HasPermission) {
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      } else {
        if (decision !== undefined) {
          const updatedStatus = await Transaction.findByIdAndUpdate(
            transaction._id,
            { Status: decision },
            { new: true }
          );
          historyEntries.push({
            property: "decision",
            previous: transaction.Status,
            latest: updatedStatus.Status,
            event: event,
          });
        }

        if (decision === "Declined") {
          if (raison !== undefined) {
            const updatedRaison = await Transaction.findByIdAndUpdate(
              transaction._id,
              { Raison: raison },
              { new: true }
            );

            historyEntries.push({
              property: "raison",
              previous: transaction.Raison,
              latest: updatedRaison.Raison,
              event: event,
            });
          }
        }

        transaction.transactionHistory.push(historyEntries);
        await transaction.save();

        return res.status(200).json({
          message: `Transaction has been ${decision}`,
          status: transaction.status,
          transaction,
        });
      }
    } else {
      return res.status(401).json({
        message:
          "You don't have the permission to Approve / Decline this transaction!",
      });
    }
  };
}

module.exports = TransactionController;

//TODOS : +++++++++++++++++++++++++++++++++++++++++++++++
//+   setting up the filter ...                         +
//+   tools used : req.query                            +
//+   for transaction the filter will be with :         +
//+   ammount (>|<|=)                                   + DONE
//+   currecy = ex(USD || MAD)                          + DONE
//+   type = ex:(national || international)             +
//+   commission = (>|<|=)                              +
//+   status ex:(pending | declined | approved)         +
//+   deleted true/false                                +
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
