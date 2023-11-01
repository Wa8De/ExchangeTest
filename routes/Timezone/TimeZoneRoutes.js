const express = require('express')

const TimeZonesController = require('../../controller/TimeZonesController/TimeZonesController')

const router = express.Router()


router.get('/timezone', TimeZonesController.getTimeZones)

module.exports = router