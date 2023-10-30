const express = require("express");

const TransactionCategoryController = require("../../controller/TransactionCategoryController/TransactionCategoryController")
const CheckUser = require("../../controller/JWT/CheckUser");

const router = express.Router();


router.get('/transactions/categories',TransactionCategoryController.getTransactionCategories);
router.get('/transactions/categories/:idCategory',TransactionCategoryController.getTransactionsbyCategory);
router.post('/transactions/categories/create',CheckUser.getUser,TransactionCategoryController.createTransactionCategory);
router.put('/transactions/categories/:idCategory',CheckUser.getUser,TransactionCategoryController.updateTransactionCategory);
router.delete('/transactions/categories/:idCategory',CheckUser.getUser,TransactionCategoryController.deleteTransactionCategory);


module.exports = router;