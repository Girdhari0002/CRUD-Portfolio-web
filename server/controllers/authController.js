const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register Admin
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password',
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: 'admin',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, photoUrl } = req.body;

    // Find user by ID (from auth middleware)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (photoUrl) user.photoUrl = photoUrl;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// Verify Token
exports.verifyToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    userId: req.userId,
  });
};

// Get Admin Profile (Public)
exports.getAdminProfile = async (req, res) => {
  try {
    const user = await User.findOne({ role: 'admin' });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin profile not found',
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        photoUrl: user.photoUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin profile',
      error: error.message,
    });
  }
};
