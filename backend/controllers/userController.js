const User = require('../models/User');
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
exports.updateMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const disallowed = ['email', 'password', 'passwordHash', '_id', 'id', 'createdAt', 'updatedAt', '__v'];
    Object.keys(req.body || {}).forEach((key) => {
      if (!disallowed.includes(key)) {
        user[key] = req.body[key];
      }
    });

    const saved = await user.save();
    const plain = saved.toObject();
    delete plain.passwordHash;

    res.json(plain);
  } catch (err) {
    next(err);
  }
};
