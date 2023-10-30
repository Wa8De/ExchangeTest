const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      select: true,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      select: true, // if you wanna show password when getting users , Change the select from false to true , walakin rah u shouldn't //
      required: [true, "Please add a password"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // Reference to the Role model
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile", // Reference to the Profile model
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission", // Reference to the Permissions model
      },
    ],
    userHistory: [
      [
        {
          property: {
            type: String, //profile.firstName
            required: true,
            default: null,
          },
          previous: {
            type: String,
            default: null,
          },
          latest: {
            type: String,
            required: true,
            default: null,
          },
          updatedAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
