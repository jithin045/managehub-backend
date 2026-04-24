const User = require("../models/User");

// =============================
// GET DASHBOARD
// =============================
exports.getDashboard = async (req, res) => {
  try {
    res.json({
      msg: "Dashboard data",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// ADMIN: GET ALL USERS
// =============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("shop", "name");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// ADMIN: UPDATE USER
// =============================
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, shop } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, role, shop: shop || null } },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// ADMIN: DELETE USER
// =============================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};