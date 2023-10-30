const express = require("express");
const RolesController = require("../../controller/roles_permissions/RolesController");
const router = express.Router();

// Roles routes
router.get("/roles/:id", RolesController.getRole);
router.put('/roles/:id/:newRoleId', RolesController.editRole)
router.delete('/roles/:id', RolesController.deleteRole)


// export routers
module.exports = router;