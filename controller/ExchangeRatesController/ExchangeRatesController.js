const ExchangeRates = require("../../models/ExchangeRatesModel/ExchangeRates");

class ExchangeRatesController {
  //Create new ExchangeRates
  static CreateExchangeRates = async (req, res) => {
    const {
      departCountry,
      arrivalCountry,
      departDevise,
      arrivalDevise,
      exchangeRates,
    } = req.body;

    try {
      const newExchangeRates = new ExchangeRates({
        departureCountry: departCountry,
        arrivalCountry,
        departureDevise: departDevise,
        arrivalDevise,
        exchangeRates,
      });
      await newExchangeRates.save();

      if (!newExchangeRates) throw "Error creating ExchangeRates";
      return res.status(201).json({
        message: "New ExchangeRates created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Get all ExchangeRatess
  static GetExchangeRatess = async (req, res) => {
    try {
      const exchangeRates = await ExchangeRates.find();
      if (!exchangeRates) {
        return res.status(404).json({
          mressage: "No exchangeRates were found",
        });
      } else {
        return res.status(200).json({
          exchangeRates,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Show a ExchangeRates
  static ShowExchangeRates = async (req, res) => {
    const id = req.params.id;
    try {
      const exchangeRates = await ExchangeRates.findOne({ _id: id });
      if (!exchangeRates) {
        return res.status(404).json({
          mressage: "No ExchangeRates were found",
        });
      } else {
        return res.status(200).json({
          exchangeRates,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Update a ExchangeRates
  static updateExchangeRates = async (req, res) => {
    const { id } = req.params;
    const {
      departCountry,
      arrivalCountry,
      departDevise,
      arrivalDevise,
      exchangeRates,
    } = req.body;

    try {
      const updatedExchangeRates = await ExchangeRates.findByIdAndUpdate(
        id,
        {
          departureCountry: departCountry,
          arrivalCountry,
          departureDevise: departDevise,
          arrivalDevise,
          exchangeRates,
        },
        { new: true }
      );

      if (!updatedExchangeRates) {
        return res.status(404).json({ error: "ExchangeRates not found" });
      }

      return res.status(200).json({
        message: "ExchangeRates updated successfully",
        updatedExchangeRates,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
module.exports = ExchangeRatesController;
