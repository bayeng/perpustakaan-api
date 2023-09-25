const router = require('express').Router();
const {
  getAllBooks, getBookById, createDataBook, updateDataBook, deleteBookById,
} = require('./book.controller');

router.get('/api/books', getAllBooks);
router.get('/api/books/:id', getBookById);
router.post('/api/books', createDataBook);
router.patch('/api/books/:id', updateDataBook);
router.delete('/api/books/:id', deleteBookById);

module.exports = router;
