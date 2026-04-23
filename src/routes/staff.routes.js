const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, staffController.addStaff);
router.get("/shop/:shopId", authMiddleware, staffController.getShopStaff);
router.put("/:id", authMiddleware, staffController.updateStaff);
router.delete("/:id", authMiddleware, staffController.deleteStaff);

module.exports = router;
