const express = require('express')

const HistoryController = require('../../controller/History/HistoryController')

const router = express.Router()


router.get('/history/users', HistoryController.getUsersHistory)
router.get('/history/transacions', HistoryController.getTransactionsHistory)

module.exports = router