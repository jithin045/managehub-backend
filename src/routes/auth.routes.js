const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getManagers
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post("/register", register);
router.post("/login", login);

router.get("/managers",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  getManagers
);

module.exports = router;