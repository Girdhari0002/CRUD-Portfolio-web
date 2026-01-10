const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Public route
router.post('/', createContact);

// Protected routes (Admin only)
router.get('/', auth, getAllContacts);
router.patch('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteContact);

module.exports = router;
