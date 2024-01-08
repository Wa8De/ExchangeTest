const ExchangeRates = require("../../models/ExchangeRatesModel/ExchangeRates");
const Devise = require("../../models/Devise/DeviseModel");

class ExchangeRatesController {
  //Create new ExchangeRates
  static CreateExchangeRates = async (req, res) => {
    const { departDevise, arrivalDevise, exchangeRates } = req.body;

    try {
      const deviseD = await Devise.findOne({ _id: departDevise });
      const deviseA = await Devise.findOne({ _id: arrivalDevise });
      if (!deviseD || !deviseA) {
        res.status(404).json({ message: "Devise not found" });
      } else {
        console.log(`depart : ${deviseD}`);
        console.log(`arriv : ${deviseA}`);
        console.log(exchangeRates);
        const newExchangeRates = new ExchangeRates({
          departureDevise: deviseD._id,
          arrivalDevise: deviseA._id,
          exchangeRates,
        });
        await newExchangeRates.save();
        if (!newExchangeRates) throw "Error creating ExchangeRates";
        return res.status(201).json({
          message: "New ExchangeRates created successfully",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  // static CreateExchangeRates = async (req, res) => {
  //   const { departDevise, arrivalDevise, exchangeRates } = req.body;

  //   try {
  //     const deviseD = await Devise.findOne({ _id: departDevise });
  //     const deviseA = await Devise.findOne({ _id: arrivalDevise });
  //     if (!deviseD || !deviseA) {
  //       res.status(404).json({ message: "Devise not found" });
  //     } else {
  //       console.log(`depart : ${deviseD}`);
  //       console.log(`arriv : ${deviseA}`);
  //       console.log(exchangeRates);
  //       const newExchangeRates = new ExchangeRates({
  //         departureDevise: deviseD._id,
  //         arrivalDevise: deviseA._id,
  //         exchangeRates,
  //       });
  //       await newExchangeRates.save();
  //       if (!newExchangeRates) throw "Error creating ExchangeRates";
  //       return res.status(201).json({
  //         message: "New ExchangeRates created successfully",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  // };

  //Get all ExchangeRates
  static GetExchangeRates = async (req, res) => {
    try {
      const exchangeRates = await ExchangeRates.find()
        .populate("departureDevise")
        .populate("arrivalDevise");
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

  //Show an ExchangeRate
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

  //Update an ExchangeRate
  static updateExchangeRates = async (req, res) => {
    const { id } = req.params;
    const { departDevise, arrivalDevise, exchangeRates } = req.body;

    try {
      const deviseD = await Devise.findOne({ _id: departDevise });
      const deviseA = await Devise.findOne({ _id: arrivalDevise });
      if (!deviseD || !deviseA) {
        res.status(404).json({ message: "Devise not found" });
      } else {
        const updatedExchangeRates = await ExchangeRates.findByIdAndUpdate(id, {
          departureDevise: deviseD._id,
          arrivalDevise: deviseA._id,
          exchangeRates,
        });

        if (!updatedExchangeRates) {
          return res.status(404).json({ error: "ExchangeRates not found" });
        }

        return res.status(200).json({
          message: "ExchangeRates updated successfully",
          updatedExchangeRates,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Delete an ExchangeRate
  static deleteExchangeRates = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedExchangeRates = await ExchangeRates.findByIdAndDelete(id);

      if (!deletedExchangeRates) {
        return res.status(404).json({ error: "ExchangeRates not found" });
      }

      return res.status(200).json({
        message: "ExchangeRates deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
module.exports = ExchangeRatesController;
