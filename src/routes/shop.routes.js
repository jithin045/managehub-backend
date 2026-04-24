const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// =============================
// CREATE / READ
// =============================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  shopController.createShop
);

router.get(
  "/my-shops",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  shopController.getMyShops
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["superadmin"]),
  shopController.getAllShopsForAdmin
);

router.get(
  "/my-shop",
  authMiddleware,
  roleMiddleware(["manager"]),
  shopController.getManagerShop
);

router.get(
  "/:id",
  authMiddleware,
  shopController.getShopById
);

// =============================
// UPDATE / DELETE
// =============================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  shopController.updateShop
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  shopController.deleteShop
);

// =============================
// OTHERS
// =============================
router.post(
  "/assign-manager",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  shopController.assignManager
);

router.get(
  "/my-shop",
  authMiddleware,
  roleMiddleware(["manager"]),
  shopController.getManagerShop
);

module.exports = router;