const bookService = require('./book.service');
const { responseError, responseStatusOk } = require('../../helper/response');

async function getAllBooks(req, res) {
  try {
    const getBooks = await bookService.findAllBooks();

    if (getBooks.length < 1) {
      return responseStatusOk(res, 200, getBooks, 'books is empty');
    }

    return responseStatusOk(res, 200, getBooks, 'get All books');
  } catch (error) {
    return responseError(res, error);
  }
}

async function getBookById(req, res) {
  try {
    const { id } = req.params;

    const getBook = await bookService.findBookById(id);

    return responseStatusOk(res, 200, getBook, 'get book by id');
  } catch (error) {
    return responseError(res, error);
  }
}

async function createDataBook(req, res) {
  try {
    const createBook = await bookService.createDataBook(req.body);
    console.log(createBook);
    return responseStatusOk(res, 201, createBook, 'create data book');
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

async function updateDataBook(req, res) {
  try {
    const { id } = req.params;

    const updateBook = await bookService.updateBookById(id, req.body);

    return responseStatusOk(res, 200, updateBook, 'update data book');
  } catch (error) {
    return responseError(res, error);
  }
}

async function deleteBookById(req, res) {
  try {
    const { id } = req.params;

    const deleteBook = await bookService.deleteBookById(id);

    return responseStatusOk(res, 200, deleteBook, `book with id='${id}' has deleted`);
  } catch (error) {
    return responseError(res, error);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createDataBook,
  updateDataBook,
  deleteBookById,
};
