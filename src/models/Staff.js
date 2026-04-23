const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["sales", "support", "technical", "other"],
        default: "sales",
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Staff", StaffSchema);
