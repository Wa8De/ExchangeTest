const express = require('express')
const router = express.Router()

const ExchangeRatesController = require('../../controller/ExchangeRatesController/ExchangeRatesController')


router.get("/exchangeRates", ExchangeRatesController.GetExchangeRates)
router.post("/exchangeRates", ExchangeRatesController.CreateExchangeRates)
router.get("/exchangeRates/:id", ExchangeRatesController.ShowExchangeRates)
router.put("/exchangeRates/:id", ExchangeRatesController.updateExchangeRates)
router.delete("/exchangeRates/:id", ExchangeRatesController.deleteExchangeRates)

module.exports = router