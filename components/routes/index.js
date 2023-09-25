const router = require('express').Router();
const routerBookCategory = require('../categories/category.route');
const routerUser = require('../users/user.route');
const routerBook = require('../books/book.router');

router.use(routerBookCategory);
router.use(routerUser);
router.use(routerBook);

module.exports = router;
