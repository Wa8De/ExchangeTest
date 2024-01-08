const TransactionsCategory = require("../../models/TransactionTypes/TransactionsCategory");
const Transaction = require("../../models/transactions/transaction");
const PermissionsController = require("../../controller/roles_permissions/PermissionsController");

class TransactionCategoryController {
  static getTransactionCategories = async (req, res) => {
    try {
      const categories = await TransactionsCategory.find();
      res.send({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };
  // static getTransactionCategories = async (req, res) => {
  //   try {
  //     const categories = await TransactionsCategory.find();
  //     res.send({ categories });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ error: "Server Error" });
  //   }
  // };

  static getTransactionsbyCategory = async (req, res) => {
    const { idCategory } = req.params;
    try {
      const transactionbyCategory = await Transaction.find({
        TypeTransaction: idCategory,
      })
        .populate("ClientId")
        .populate("Amount")
        .populate("CurrencyId")
        .populate("TypeTransaction");
      res.send({ transactionbyCategory });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };

  static createTransactionCategory = async (req, res) => {
    const { NameCategory, DescriptionCategory } = req.body;
    const ClientId = req.user._id;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "categoryCreate"
    );
    if (HasPermission) {
      try {
        const newCategory = new TransactionsCategory({
          NameCategory,
          DescriptionCategory,
        });
        await newCategory.save();
        return res
          .status(201)
          .json({ message: "Transaction created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Create new Categories " });
    }
  };

  static updateTransactionCategory = async (req, res) => {
    const { idCategory } = req.params;
    const updatedCategoryData = req.body;
    const ClientId = req.user.userId;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "categoryUpdate"
    );
    if (HasPermission) {
      try {
        const UpdatedCategory = await TransactionsCategory.findByIdAndUpdate(
          idCategory,
          updatedCategoryData,
          { new: true }
        );
        console.log(UpdatedCategory);
        if (!UpdatedCategory) {
          return res.status(404).json({ error: "Category not found" });
        }
        return res
          .status(200)
          .json({ message: "Category Updated Successfully xD !" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Update Category ! " });
    }
  };

  static deleteTransactionCategory = async (req, res) => {
    const { idCategory } = req.params;
    const ClientId = req.user.userId;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "categoryDelete"
    );
    if (HasPermission) {
      try {
        const deletedCategory = await TransactionsCategory.findByIdAndDelete(
          idCategory
        );
        if (!deletedCategory) {
          return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({ error: "Catgeory deleted successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
        return res
        .status(400)
        .json({ message: "User Not Allowed To Delete Transaction" });
    }
  };
}

module.exports = TransactionCategoryController;
