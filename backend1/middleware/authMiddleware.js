// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    // Assuming user role is stored in req.user after authentication (e.g., using JWT)
    if (req.user && req.user.role === 'admin') {
        next(); // Allow admin access
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = { isAdmin };
