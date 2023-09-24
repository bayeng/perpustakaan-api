const router = require('express').Router();
const {
  getAllBookCategory, getBookCategoryById, createBookCategory, deleteBookById,
} = require('./category.controller');

router.get('/api/bookcategories', getAllBookCategory);
router.get('/api/bookcategories/:id', getBookCategoryById);
router.post('/api/bookcategories/', createBookCategory);
router.delete('/api/bookcategories/:id', deleteBookById);

module.exports = router;
