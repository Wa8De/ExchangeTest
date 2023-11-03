const express = require('express')
const router = express.Router()

const ExchangeRatesController = require('../../controller/ExchangeRatesController/ExchangeRatesController')


router.get("/exchangeRates", ExchangeRatesController.GetExchangeRatess)
router.post("/exchangeRates", ExchangeRatesController.CreateExchangeRates)
router.get("/exchangeRates/:id", ExchangeRatesController.ShowExchangeRates)
router.put("/exchangeRates/:id", ExchangeRatesController.updateExchangeRates)

module.exports = router