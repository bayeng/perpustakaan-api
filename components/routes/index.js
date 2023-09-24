const router = require('express').Router();
const routerBookCategory = require('../categories/category.route');
const routerUser = require('../users/user.route');

router.use(routerBookCategory);
router.use(routerUser);

module.exports = router;
