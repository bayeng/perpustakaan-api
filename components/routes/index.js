const router = require('express').Router();
const routerBookCategory = require('../categories/category.route');
const routerUser = require('../users/user.route');
const routerBook = require('../books/book.router');
const routerBookLoan = require('../books_loan/bookLoan.route');
const routerAuth = require('../auth/auth.route');
const routerMiddleware = require('../middlewares/index');

router.use(routerAuth);
router.use(routerMiddleware);
router.use(routerBookCategory);
router.use(routerUser);
router.use(routerBook);
router.use(routerBookLoan);

module.exports = router;
