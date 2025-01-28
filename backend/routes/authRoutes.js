// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  getUserById, 
  updateUserAvatar,
  updateUserProfile 
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

// New routes
router.get('/:id', getUserById);

router.put('/avatar', updateUserAvatar);
router.put('/update', updateUserProfile);

module.exports = router;