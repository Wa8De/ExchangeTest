const bcrypt = require("bcrypt");
const generateToken = require("../JWT/generateToken");
const GetEventType = require("../../helpers/GetEventType");

const User = require("../../models/users/User");
const Profile = require("../../models/users/Profile");
const Role = require("../../models/Roles_and_Permissions/Roles");
const Permission = require("../../models/Roles_and_Permissions/Permissions");

const PermissionsController = require("../../controller/roles_permissions/PermissionsController");
const UserConnectionController = require("../History/UserConnectionController");
const Roles = require("../../models/Roles_and_Permissions/Roles");
const Permissions = require("../../models/Roles_and_Permissions/Permissions");
const { search } = require("../../routes/users/userRoutes");

class UserController {
  //get All Users
  static getUsers = async (req, res) => {
    const userRole = req.query.role;
    const userPermissions = req.query.permissions;
    const username = req.query.username;
    const name = req.query.name;
    const page = req.query.page || 1;
    const ITEMS_PER_PAGE = 20;
    const query = {
      deletedAt: null,
    };

    if (userRole) {
      const selectedRole = await Roles.findOne({ roleName: userRole });
      if (!selectedRole) {
        return res
          .status(404)
          .json({ message: `No users were found with the role: ${userRole}` });
      }
      query.role = selectedRole;
    }
    if (userPermissions) {
      const permissionsToSearch = [];
      for (const perm in userPermissions) {
        const selectedPermissions = await Permissions.findOne({
          permissionName: userPermissions[perm],
        });
        if (selectedPermissions) {
          permissionsToSearch.push(selectedPermissions._id);
        }
      }
      if (permissionsToSearch.length > 0) {
        query.permissions = { $in: permissionsToSearch };
      }
    }

    if (username) {
      query.userName = { $regex: username, $options: "i" };
    }

    const skip = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of documents to skip
    const limit = ITEMS_PER_PAGE; // Number of documents to retrieve per page

    try { 
      const users = []
      if (name) {
        if (Number(name) === 1) {
          users.push(await User.find(query)
          .populate("profile")
          .populate("role")
          .populate("permissions")
          .sort({userName: 1})
          .skip(skip)
          .limit(limit))
          console.log("asc")
        }
        if (Number(name) === -1) {
          users.push(await User.find(query)
          .populate("profile")
          .populate("role")
          .populate("permissions")
          .sort({userName: -1})
          .skip(skip)
          .limit(limit))
          console.log("desc")
        }
        if(Number(name) === 0){
          users.push(await User.find(query)
          .populate("profile")
          .populate("role")
          .populate("permissions")
          .skip(skip)
          .limit(limit))
          console.log("default")
        }
      }else{
        users.push(await User.find(query)
        .populate("profile")
        .populate("role")
        .populate("permissions")
        .skip(skip)
        .limit(limit))
      }

      const count = await User.countDocuments(query);
      const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
      res.send({ users, pagination: { count, pageCount, page } });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };

  // Register (create user)
  static register = async (req, res) => {
    const {
      userName,
      email,
      password,
      roleName,
      firstName,
      lastName,
      CIN,
      address,
      phoneNumber,
      permissions, // Array of permission names
    } = req.body;

    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Check if required fields are provided
      if (
        !userName ||
        !email ||
        !roleName ||
        !phoneNumber ||
        !firstName ||
        !lastName ||
        !CIN ||
        !address
      ) {
        return res.status(400).json({ error: "Please fill all fields" });
      }

      // Check if a user with the same email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Find the role by its name
      const chosenRole = await Role.findOne({ roleName });

      if (!chosenRole) {
        return res.status(400).json({ error: "Invalid role name" });
      }

      // Find permissions by name and get their ObjectId references
      const permissionObjects = await Permission.find({
        permissionName: { $in: permissions },
      });

      const permissionIds = permissionObjects.map(
        (permission) => permission._id
      );

      // Create a new user record in the database with the hashed password
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        role: chosenRole._id,
        permissions: permissionIds, // Assign the permission IDs
      });
      await newUser.save();

      // Create a new profile record in the database
      const newProfile = new Profile({
        userId: newUser._id,
        firstName,
        lastName,
        CIN,
        address,
        phoneNumber,
      });
      await newProfile.save();
      newProfile.userId = newUser._id;
      newUser.profile = newProfile._id;
      await newUser.save();

      // Send a success response
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Login
  static login = async (req, res) => {
    const { email, password } = req.body;
    const event = await GetEventType(req.route, req.method);
    try {
      // Find the user by email
      const user = await User.findOne({ email: email, deletedAt: null });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Saved the logged-in user in the UserConectiohistory
      await UserConnectionController.saveUserConnection(user._id, event);
      // ----------------------------------------------------------------------------

      // Verify the password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Find the user's role
      const { role } = user;

      if (!role) {
        console.log("User does not have a role.");
        return res.status(500).json({ error: "User does not have a role" });
      }

      // Use the user's 'role' field (which contains the role's ObjectId) to find the role by its ObjectId
      const roleName = await Role.findOne({ _id: role });

      if (!roleName) {
        console.log("Role not found.");
        return res.status(500).json({ error: "Role not found" });
      }

      const UserRole = roleName.role;

      // Generate a JWT token and send it in the response
      const token = generateToken(user);

      return res.status(200).json({
        message: "Logged in successfully!",
        UserRole, // Include the user's role in the response
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Get one user
  static show = async (req, res) => {
    //get the user Id from the URL
    const userId = req.params.id;
    try {
      // Find the user with the given ID and where the deletedAt is null (available user) in the database
      const user = await User.findOne({ _id: userId, deletedAt: null })
        .populate("profile")
        .populate("role")
        .populate("permissions");

      // Check if the user was found
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ user: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Update User's data
  static update = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = {};
    const updatedProfileData = {};
    const historyEntries = [];

    try {
      const existingUser = await User.findOne({ _id: userId, deletedAt: null });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { userName } = req.body;
      if (userName !== undefined) {
        updatedUserData.userName = userName;
        historyEntries.push({
          property: "userName",
          previous: existingUser.userName,
          latest: userName,
        });
      }

      const profile = await Profile.findOne({ userId: userId });
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const { firstName, lastName, CIN, address, phoneNumber } = req.body;
      if (firstName !== undefined) {
        updatedProfileData.firstName = firstName;
        historyEntries.push({
          property: "profile.firstName",
          previous: profile.firstName,
          latest: firstName,
        });
      }
      if (lastName !== undefined) {
        updatedProfileData.lastName = lastName;
        historyEntries.push({
          property: "profile.lastName",
          previous: profile.lastName,
          latest: lastName,
        });
      }
      if (CIN !== undefined) {
        updatedProfileData.CIN = CIN;
        historyEntries.push({
          property: "profile.CIN",
          previous: profile.CIN,
          latest: CIN,
        });
      }
      if (address !== undefined) {
        updatedProfileData.address = address;
        historyEntries.push({
          property: "profile.address",
          previous: profile.address,
          latest: address,
        });
      }
      if (phoneNumber !== undefined) {
        updatedProfileData.phoneNumber = phoneNumber;
        historyEntries.push({
          property: "profile.phoneNumber",
          previous: profile.phoneNumber,
          latest: phoneNumber,
        });
      }

      await Profile.findByIdAndUpdate(profile._id, updatedProfileData, {
        new: true,
      });

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        {
          new: true,
        }
      );

      // Push the entire historyEntries array inside the userHistory
      updatedUser.userHistory.push(historyEntries);

      await updatedUser.save();

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Delete User
  static delete = async (req, res) => {
    const userId = req.params.id;
    const historyEntries = [];
    try {
      const user = await User.findOne({ _id: userId, deletedAt: null });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const deletedUser = await User.findByIdAndUpdate(
          user._id,
          {
            deletedAt: Date.now(),
          },
          { new: true }
        );

        historyEntries.push({
          property: "User.deletedAt",
          latest: deletedUser.deletedAt,
        });
        user.userHistory.push(historyEntries);
        await user.save();

        return res.status(200).json({ message: "User deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static toggleStatus = async (req, res) => {
    const { id } = req.params;
    const historyEntries = [];
    try {
      const user = await User.findOne({ _id: id, deletedAt: null });
      // console.log(user);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const userStatusUpdated = await User.findByIdAndUpdate(
          user._id,
          {
            status: !user.status,
          },
          { new: true }
        );
        historyEntries.push({
          property: "User.status",
          previous: user.status,
          latest: userStatusUpdated.status,
        });
        user.userHistory.push(historyEntries);
        await user.save();
        return res.status(200).json({
          message: "User Status Updated successfully",
          user: userStatusUpdated,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  static restore = async (req, res) => {
    // const query = {
    //   deletedAt: !null,
    // };
    try {
      const users = await User.find({ deletedAt: { $ne: null } });

      for (const user of users) {
        user.deletedAt = null;
        await user.save();
      }
      res.status(200).send({ message: "Users restored successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server Error" });
    }
  };
}

module.exports = UserController;

//TODOS : +++++++++++++++++++++++++++++++++++++++++++++++
//+   setting up the filter ...                         +
//+   tools used : req.query                            +
//+   for users the filter will be with :               +
//+   role ex :(admin / client/ bureau)                 + DONE
//+   permissions = ex(usersAdd || userDelete)          +
//+   deleted true/false                                +
//+++++++++++++        THE SOLDE!!!          ++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
