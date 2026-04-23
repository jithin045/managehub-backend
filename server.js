const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const shopRoutes = require("./src/routes/shop.routes");
const userRoutes = require("./src/routes/user.routes");
const staffRoutes = require("./src/routes/staff.routes");

const authMiddleware = require("./src/middleware/auth.middleware");
const roleMiddleware = require("./src/middleware/role.middleware");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// =============================
// BASE ROUTES
// =============================

app.get("/", (req, res) => {
  res.send("ManageHub API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/user", userRoutes);
app.use("/api/staff", staffRoutes);

// =============================
// PROTECTED ROUTES
// =============================

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Protected route accessed",
    user: req.user,
  });
});

// =============================
// SUPER ADMIN ONLY
// =============================

app.get(
  "/api/superadmin",
  authMiddleware,
  roleMiddleware(["superadmin"]),
  (req, res) => {
    res.json({
      msg: "Super Admin access granted",
      user: req.user,
    });
  }
);

// =============================
// OWNER OR SUPERADMIN
// =============================

app.get(
  "/api/owner-access",
  authMiddleware,
  roleMiddleware(["superadmin", "owner"]),
  (req, res) => {
    res.json({
      msg: "Owner level access granted",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});