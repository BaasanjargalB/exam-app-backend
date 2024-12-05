const { User } = require('../models/projectModel');

exports.register = async (req, res) => {
  const { username, role, fireId, teacherId } = req.body;
  try {

    const newUser = new User({
      username,
      role,
      fireId,
      teacherId: teacherId !== '' ? teacherId : null,
      status: 'pending',
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

    res.json({ role: user.role, status: user.status });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: 'No teachers found' });
    }

    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Error fetching teachers' });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const { status } = req.params;
    const users = await User.find({ status: status }).populate('teacherId');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No teachers found' });
    }

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};