const Staff = require("../models/Staff");
const Shop = require("../models/Shop");

// =============================
// ADD STAFF
// =============================
exports.addStaff = async (req, res) => {
    try {
        const { name, email, phone, role, shopId } = req.body;

        // Verify shop ownership
        const shop = await Shop.findById(shopId);
        if (!shop) return res.status(404).json({ msg: "Shop not found" });

        if (shop.owner.toString() !== req.user.id && req.user.role !== 'superadmin' &&
            (shop.manager && shop.manager.toString() !== req.user.id)) {
            return res.status(403).json({ msg: "Not authorized to add staff to this shop" });
        }

        const staff = await Staff.create({
            name,
            email,
            phone,
            role,
            shop: shopId
        });

        res.json({ staff });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// =============================
// GET SHOP STAFF
// =============================
exports.getShopStaff = async (req, res) => {
    try {
        const { shopId } = req.params;
        const staff = await Staff.find({ shop: shopId });
        res.json({ staff });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// =============================
// UPDATE STAFF
// =============================
exports.updateStaff = async (req, res) => {
    try {
        const { name, email, phone, role, status } = req.body;
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            { $set: { name, email, phone, role, status } },
            { new: true }
        );
        res.json({ staff });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// =============================
// DELETE STAFF
// =============================
exports.deleteStaff = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ msg: "Staff member removed successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
