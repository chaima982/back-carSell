// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
