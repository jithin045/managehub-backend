const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/dashboard", authMiddleware, userController.getDashboard);

// Admin Routes
router.get("/all", authMiddleware, roleMiddleware(["superadmin"]), userController.getAllUsers);
router.put("/:id", authMiddleware, roleMiddleware(["superadmin"]), userController.updateUser);
router.delete("/:id", authMiddleware, roleMiddleware(["superadmin"]), userController.deleteUser);

module.exports = router;