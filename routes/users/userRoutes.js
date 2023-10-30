const express = require("express");
const UserController = require("../../controller/UserControllers/UserController");
const router = express.Router();

// Authentication routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// user routes
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id/status", UserController.toggleStatus);
router.put("/restore", UserController.restore);

module.exports = router;
