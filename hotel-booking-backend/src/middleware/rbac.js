/**
 * Restrict access to routes by user role.
 * Must be used after protectRoute (req.user must exist).
 *
 * @param {string[]} allowedRoles - Roles that can access the route
 */
export const restrictTo = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const userRole = req.user.role?.toLowerCase();
    const isAllowed = allowedRoles.some((r) => r.toLowerCase() === userRole);

    if (!isAllowed) {
      return res.status(403).json({ success: false, message: 'Forbidden - insufficient permissions' });
    }

    next();
  };
};
