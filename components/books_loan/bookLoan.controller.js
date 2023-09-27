const bookLoanService = require('./bookLoan.service');
const { responseError, bookLoanResponseStatusOk } = require('../../helper/response');

async function getAllBooksLoan(req, res) {
  try {
    const bookLoan = await bookLoanService.findAllBookLoan();

    if (bookLoan.length < 1) {
      return bookLoanResponseStatusOk(res, 200, bookLoan, 'booksLoan is empty');
    }

    return bookLoanResponseStatusOk(res, 200, bookLoan, 'get All booksLoan');
  } catch (error) {
    return responseError(res, error);
  }
}

async function getBooLoankById(req, res) {
  try {
    const { id } = req.params;

    const getBookLoan = await bookLoanService.findBookLoan(id);

    return bookLoanResponseStatusOk(res, 200, getBookLoan, 'get bookLoan by id');
  } catch (error) {
    return responseError(res, error);
  }
}

async function createBookLoan(req, res) {
  try {
    const createBook = await bookLoanService.createDataBookLoan(req.body);

    return bookLoanResponseStatusOk(res, 201, createBook, 'create data book');
  } catch (error) {
    console.log(error);
    return responseError(res, error);
  }
}
async function deleteBookLoanById(req, res) {
  try {
    const { id } = req.params;

    const deleteBookLoan = await bookLoanService.deleteBookLoanById(id);

    return bookLoanResponseStatusOk(res, 200, deleteBookLoan, `bookLoan with id='${id}' has deleted`);
  } catch (error) {
    return responseError(res, error);
  }
}

module.exports = {
  getAllBooksLoan,
  getBooLoankById,
  createBookLoan,
  deleteBookLoanById,
};
