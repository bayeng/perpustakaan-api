const router = require('express').Router();
const auth = require('./auth');

router.use('/api', auth.verifyToken);

module.exports = router;
