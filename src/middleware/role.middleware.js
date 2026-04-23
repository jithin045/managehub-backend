module.exports = function roleMiddleware(allowedRoles = []) {
  // allow both formats: "owner" OR ["owner"]
  if (!Array.isArray(allowedRoles)) {
    allowedRoles = [allowedRoles];
  }

  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ msg: "Forbidden: Access denied" });
    }

    next();
  };
};