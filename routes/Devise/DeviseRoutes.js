const express = require('express')
const router = express.Router()

const DeviseController = require('../../controller/DevisController/DeviseController')


router.get("/devises", DeviseController.GetDevises)
router.post("/devises", DeviseController.CreateDevise)
router.get("/devises/:id", DeviseController.ShowDevise)
router.put("/devises/:id", DeviseController.updateDevise)
router.delete("/devises/:id", DeviseController.deleteDevise)

module.exports = router