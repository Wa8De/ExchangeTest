const mongoose = require("mongoose");
const Currency = require("../../models/currencies/currency");
const PermissionsController = require("../../controller/roles_permissions/PermissionsController");


class CurrencyController {
  static getCurrency = async (req, res) => {
    try {
      const { idCurrency } = req.params;
      const currency = await Currency.findOne({ _id: idCurrency });
      if (currency) {
        return res.status(200).json({
          currency,
        });
      } else {
        return res.status(404).json({
          message: "No Specific Currency found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static getCurrencies = async (req, res) => {
    try {
      const currency = await Currency.find();
      if (currency) {
        return res.status(200).json({
          currency,
        });
      } else {
        return res.status(404).json({
          message: "No Currency found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static createCurrency = async (req, res) => {
    const { CurrencyName, CurrencySymbol, CurrencyCode } = req.body;
    const ClientId = req.user.userId;
    const HasPermission = await PermissionsController.UserHasPermission(
      ClientId,
      "currencyCreate"
    );
    if (HasPermission) {
      try {
        const newCurrency = new Currency({
          CurrencyName,
          CurrencySymbol,
          CurrencyCode,
        });
        await newCurrency.save();
        return res.status(201).json({ message: "Currency Added successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Create Currency" });
    }
  };

  static updateCurrency = async (req, res) => {
    const { idCurrency } = req.params;
    const UpdatedCurrencyData = req.body;
     const ClientId = req.user.userId;
     const HasPermission = await PermissionsController.UserHasPermission(
       ClientId,
       "currencyUpdate"
     );
    if (HasPermission) {
      try {
        const updatedCurrency = await Currency.findByIdAndUpdate(
          idCurrency,
          UpdatedCurrencyData,
          {
            new: true,
          }
        ).select("CurrencyName CurrencySymbol CurrencyCode");
        if (!updatedCurrency) {
          return res.status(404).json({ error: "Currency not found" });
        }
        return res
          .status(200)
          .json({ message: "Currency Updated Successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Update Currency data " });
    }
  };

  static deleteCurrency = async (req , res) => {
    const { idCurrency } = req.params;
     const ClientId = req.user.userId;
     const HasPermission = await PermissionsController.UserHasPermission(
       ClientId,
       "currencyDelete"
     );
    if (HasPermission) {
      try {
        const deletedCurrency = await Currency.findByIdAndDelete(idCurrency);

        if (!deletedCurrency) {
          return res.status(404).json({ error: "Currency Not Found ! " });
        }
        return res
          .status(200)
          .json({ message: "Currency Deleted Successfully xD ! " });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User Not Allowed To Delete Currency " });
    }
  };
}

module.exports = CurrencyController;
