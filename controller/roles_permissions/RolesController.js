const User = require("../../models/users/User");
const Role = require("../../models/Roles_and_Permissions/Roles");

class RolesController {
  static getRole = async (req, res) => {
    const userId = req.params.id;
    try {
      // Find the user by their userId
      const user = await User.findOne({ _id: userId }).populate("role");

      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Access the user's role
      const userRole = user.role;

      if (!userRole) {
        return res.status(404).json({ error: "User does not have a role" });
      }

      return res.status(200).json({ role: userRole });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static editRole = async (req, res) => {
    const userId = req.params.id; 
    const newRoleId = req.params.newRoleId; 
  
    try {
      const role = await Role.findById(newRoleId);
  
      if (!role) {
        return res.status(404).json({ error: "New role not found" });
      }
  
      const user = await User.findByIdAndUpdate(
        userId,
        { role: role._id }, 
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res
        .status(200)
        .json({ message: "User's role updated successfully", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deleteRole = async (req, res) => {
    const userId = req.params.id; // Get the user's ID from the request parameters

    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Set the user's role to null
      user.role = null;
      await user.save();

      console.log(user);

      return res
        .status(200)
        .json({ message: "Role deleted successfully", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = RolesController;
