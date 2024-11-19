const { User } = require('../models/projectModel');

exports.register = async (req, res) => {
  const { username, role, fireId } = req.body;
  try {

    const newUser = new User({
      username,
      role,
      fireId,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user, please try again.' });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const { fireId } = req.params;

    const user = await User.findOne({ fireId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
};
