const RBACMiddleware = (allowedRoles) => (req, res, next) => {
  if (req.user && allowedRoles.includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Insufficient permissions.",
      success: false,
    });
  }
};

module.exports = { RBACMiddleware };
