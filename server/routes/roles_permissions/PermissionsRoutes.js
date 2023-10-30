const express = require("express");
const PermissionsController = require("../../controller/roles_permissions/PermissionsController");
const router = express.Router();

// Permissions routes
router.get("/permissions/:id", PermissionsController.getPermissions);
router.post("/permissions/:id", PermissionsController.addPermission);
router.put("/permissions/:id/", PermissionsController.editPermissions);
router.delete("/permissions/:id/:perm_id", PermissionsController.deletePermissions);

// export routers
module.exports = router;