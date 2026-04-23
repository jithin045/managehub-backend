const Shop = require("../models/Shop");

// =============================
// CREATE SHOP
// =============================
exports.createShop = async (req, res) => {
  try {
    const { name, address, image, manager } = req.body;

    const shop = await Shop.create({
      name,
      address,
      image,
      manager,
      owner: req.user.id,
    });

    res.json({ shop });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// =============================
// OWNER SHOPS
// =============================
exports.getMyShops = async (req, res) => {
  try {
    const shops = await Shop.find({ owner: req.user.id });
    res.json({ shops });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// ADMIN - ALL SHOPS
// =============================
exports.getAllShopsForAdmin = async (req, res) => {
  try {
    const shops = await Shop.find().populate("owner", "name email");
    res.json({ shops });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// SINGLE SHOP BY ID
// =============================
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate("owner", "name email")
      .populate("manager", "name email");

    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }

    res.json({ shop });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// ASSIGN MANAGER
// =============================
exports.assignManager = async (req, res) => {
  try {
    const { shopId, managerId } = req.body;

    const shop = await Shop.findByIdAndUpdate(
      shopId,
      { $set: { manager: managerId } },
      { new: true }
    );

    res.json({ shop });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// MANAGER - SINGLE SHOP
// =============================
exports.getManagerShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ manager: req.user.id });

    res.json({ shop });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// UPDATE SHOP
// =============================
exports.updateShop = async (req, res) => {
  try {
    const { name, address, image, manager } = req.body;
    const shopId = req.params.id;

    let shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }

    // Check ownership or superadmin role
    if (shop.owner.toString() !== req.user.id && req.user.role !== 'superadmin') {
      return res.status(403).json({ msg: "Not authorized to update this shop" });
    }

    shop = await Shop.findByIdAndUpdate(
      shopId,
      { $set: { name, address, image, manager } },
      { new: true }
    );

    res.json({ shop });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// =============================
// DELETE SHOP
// =============================
exports.deleteShop = async (req, res) => {
  try {
    const shopId = req.params.id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }

    // Check ownership or superadmin role
    if (shop.owner.toString() !== req.user.id && req.user.role !== 'superadmin') {
      return res.status(403).json({ msg: "Not authorized to delete this shop" });
    }

    await Shop.findByIdAndDelete(shopId);

    res.json({ msg: "Shop deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};