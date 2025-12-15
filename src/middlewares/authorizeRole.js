// authorizeRole("admin") => solo admins
// authorizeRole("user")  => solo users
const authorizeRole = (...roles) => (req, res, next) => {
  // Si no hay req.user, no está autenticado
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Not authenticated' });

  // Si el rol del user no está permitido, forbidden
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ status: 'error', message: 'Not authorized for this resource' });
  }

  next(); // si pasa, sigue al controller
};

module.exports = authorizeRole;
