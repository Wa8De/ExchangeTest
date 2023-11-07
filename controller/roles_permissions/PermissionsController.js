const User = require("../../models/users/User");
const Role = require("../../models/Roles_and_Permissions/Roles");
const Permission = require("../../models/Roles_and_Permissions/Permissions");

class PermissionsController {
  static AssignPermissionToRole = async (userId, roleName) => {
    let userPermissions = [];
    const DefaultAdminPermissions = [
      "addLanguageSupport",
      "translateUIElements",
      "implementLanguageSwitching",
      "defineRoles",
      "manageUserPermissions",
      "configurePermissionsByRole",
      "implementUserAuthentication",
      "manageUsers",
      "createUserProfiles",
      "resetUserPasswords",
      "clientAdd",
    ];

    if (roleName === "admin") {
      userPermissions = DefaultAdminPermissions;
    }
    if (roleName === "bureau") {
      userPermissions = DefaultBureauPermissions;
    }
    if (roleName === "client") {
      userPermissions = DefaultClientPermissions;
    }
    return userPermissions;
  };

  static getPermissions = async (req, res) => {
    const userId = req.params.id;
    try {
      // Find the user by their userId and populate the "permissions" field
      const user = await User.findOne({ _id: userId }).populate("permissions");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Access the user's permissions
      const userPermissions = user.permissions;
      // console.log(user);

      if (!userPermissions || userPermissions.length === 0) {
        return res
          .status(404)
          .json({ message: "User does not have permissions" });
      }

      return res.status(200).json({ permissions: userPermissions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static addPermission = async (req, res) => {
    const userId = req.params.id;
    const { newPermissionNames } = req.body;

    try {
      // Find the user by their userId
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the permission documents that match the provided names
      const newPermissions = await Permission.find({
        permissionName: { $in: newPermissionNames },
      });

      if (!newPermissions || newPermissions.length === 0) {
        return res.status(404).json({ error: "Permissions not found" });
      }

      // Extract the _id values from the newPermissions array
      const newPermissionIds = newPermissions.map(
        (permission) => permission._id
      );

      // Update the user's permissions array with the new permission _ids
      await User.updateOne(
        { _id: userId },
        { $push: { permissions: { $each: newPermissionIds } } }
      );

      return res
        .status(200)
        .json({ message: "User's permissions added successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static editPermissions = async (req, res) => {
    const userId = req.params.id;
    const { newPermissions } = req.body;

    try {
      const user = await User.findOne({ _id: userId }).populate("permissions");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userPermissions = user.permissions.map(
        (permission) => permission.permissionName
      );

      for (const newPermissionName of newPermissions) {
        const replacement = await Permission.findOne({
          permissionName: newPermissionName,
        });

        if (!replacement) {
          return res
            .status(404)
            .json({ error: `Permission '${newPermissionName}' not found` });
        }

        if (userPermissions.includes(newPermissionName)) {
          continue;
        }

        await User.updateOne(
          { _id: userId },
          {
            $push: { permissions: replacement._id },
          }
        );
      }

      return res
        .status(200)
        .json({ message: "User's permissions updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deletePermissions = async (req, res) => {
    const userId = req.params.id;
    const permissionId = req.params.perm_id;

    const chosenPermissionToDelete = await Permission.findOne({
      _id: permissionId,
    });

    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          permissions: chosenPermissionToDelete._id,
        },
      }
    );

    if (!chosenPermissionToDelete) {
      return res.status(404).json({ error: "Permission Not Found" });
    }
    return res
      .status(200)
      .json({ message: "User's permission deleted successfully !" });
  };

  //Check if a User has a Permission
  static UserHasPermission = async (userId, permission) => {
    console.log(userId);
    const user = await User.findOne({ _id: userId }).populate("permissions");
    // console.log(user);
    const userPermissions = user.permissions;
    const wantedPermission = await Permission.findOne({
      permissionName: permission,
    });

    if (
      wantedPermission &&
      userPermissions.some(
        (userPermission) => userPermission.permissionName === permission
      )
    ) {
      console.log(`User has permission: ${permission}`);
      return true;
    } else {
      console.log(`User does not have permission: ${permission}`);
      return false;
    }
  };
}

module.exports = PermissionsController;
