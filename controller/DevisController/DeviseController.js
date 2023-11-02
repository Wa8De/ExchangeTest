const Devise = require("../../models/Devise/DeviseModel");

class DeviseController {
  //Create new Devise
  static CreateDevise = async (req, res) => {
    const { name, country, city, amount } = req.body;

    try {
      const newDevise = new Devise({
        devise: name,
        amount,
        country,
        city,
      });
      await newDevise.save();

      if (!newDevise) throw "Error creating devise";
      return res.status(201).json({
        message: "New Devise created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Get all Devises
  static GetDevises = async (req, res) => {
    try {
      const devises = await Devise.find();
      if (!devises) {
        return res.status(404).json({
          mressage: "No devise were found",
        });
      } else {
        return res.status(200).json({
          devises,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Show a Devise
  static ShowDevise = async (req, res) => {
    const id = req.params.id;
    try {
      const devise = await Devise.findOne({ _id: id });
      if (!devise) {
        return res.status(404).json({
          mressage: "No devise were found",
        });
      } else {
        return res.status(200).json({
          devise,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Update a Devise
  static updateDevise = async (req, res) => {
    const { id } = req.params;
    const { name, country, city, amount } = req.body;

    try {
      const updatedDevise = await Devise.findByIdAndUpdate(id, {
        devise: name,
        country,
        city,
        amount,
      },
      {new : true});

      if (!updatedDevise) {
        return res.status(404).json({ error: "Devise not found" });
      }

      return res.status(200).json({
        message: "Devise updated successfully",
        updatedDevise
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
module.exports = DeviseController;
