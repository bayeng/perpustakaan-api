const router = require('express').Router();
const {
  getAllBooksLoan, createBookLoan, getBooLoankById, deleteBookLoanById,
} = require('./bookLoan.controller');

router.get('/api/bookloan', getAllBooksLoan);
router.post('/api/bookloan', createBookLoan);
router.get('/api/bookloan', getBooLoankById);
router.delete('/api/bookloan', deleteBookLoanById);

module.exports = router;
