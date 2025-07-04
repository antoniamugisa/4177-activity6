module.exports = function authorizeRoles(...roles) {
  return (req, res, next) => {
    console.log('Checking roles for:', req.user?.role); // Debug
    if (!roles.includes(req.user?.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};
