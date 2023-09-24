const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUserById, deleteUserById, registerUser,
} = require('./user.controller');

router.get('/api/users', getAllUsers);
router.post('/api/users', registerUser);
router.get('/api/users/:id', getUserById);
router.patch('/api/users/:id', updateUserById);
router.delete('/api/users/:id', deleteUserById);

module.exports = router;
