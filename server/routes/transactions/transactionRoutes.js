const express = require("express");

const TransactionController = require("../../controller/TransactionControllers/TransactionController")
const CheckUser = require("../../controller/JWT/CheckUser");

const router = express.Router();


router.get('/transactions',TransactionController.getTransaction);
router.get("/transactions/:transId",TransactionController.showTransaction);
router.post('/transactions/create',CheckUser.getUser,TransactionController.createTransaction);
router.put('/transactions/validate/:transId',CheckUser.getUser,TransactionController.TransactionApproval);
router.put('/transactions/:transId',CheckUser.getUser,TransactionController.updateTransaction);
router.delete('/transactions/:transId',CheckUser.getUser,TransactionController.deleteTransaction);


module.exports = router;