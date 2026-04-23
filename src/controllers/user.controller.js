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