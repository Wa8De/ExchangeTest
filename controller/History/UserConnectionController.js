const UserConnection = require("../../models/HistoryModel/UsersConnection");

class UserConnectionController {
  static getUserConnectionHistory = async (req, res) => {
    try {
      const history = await UserConnection.find();
      res.status(200).json({ ConnectionHistory: history });
    } catch (error) {
      console.log(error);
      res.status(404).json({ errorMessage: error });
    }
  };
  static saveUserConnection = async (userId, event) => {
    try {
      const newUserConnection = UserConnection({
        userId,
        connection_type: event,
      });
      await newUserConnection.save();
      console.log("Login event saved successfully.");
    } catch (error) {
      console.error("Error saving login event:", error);
    }
  };
}

module.exports = UserConnectionController;
