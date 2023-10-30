const express = require("express");
const router = express.Router();
const CurrencyController = require('../../controller/CurrencyControllers/CurrencyControllers')
const CheckUser = require("../../controller/JWT/CheckUser");
// Currency routes
router.get("/currency/:idCurrency", CurrencyController.getCurrency);
router.get("/currencies", CurrencyController.getCurrencies);
router.post("/currencies",CheckUser.getUser, CurrencyController.createCurrency);
router.put("/currency/:idCurrency",CheckUser.getUser,CurrencyController.updateCurrency);
router.delete("/currency/:idCurrency",CheckUser.getUser,CurrencyController.deleteCurrency);

module.exports = router;
