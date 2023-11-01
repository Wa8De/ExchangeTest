const mongoose = require("mongoose");
const TimeZone = require("../../models/TimeZones/TimeZones");


class TimeZoneController {
    static getTimeZones = async (req, res) => {
        try {
        const timezones = await TimeZone.find();
        if (timezones) {
            return res.status(200).json({
            timezones,
            });
        } else {
            return res.status(404).json({
            message: "No Timezone found",
            });
        }
        } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
        }
    };


}

module.exports = TimeZoneController;
