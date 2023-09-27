const router = require('express').Router();
const { login } = require('./auth.controller');

router.post('/api/login', login);

module.exports = router;
