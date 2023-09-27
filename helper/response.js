function responseError(res, error) {
  return res.status(error.statusCode || 400).json({
    status: 'fail',
    message: error.message,
  });
}

function bookResponseStatusOk(res, status, book, message) {
  if (book.length > 1) {
    return res.status(status).json({
      status: 'OK',
      message,
      books: book,
    });
  }
  return res.status(status).json({
    status: 'OK',
    message,
    book,
  });
}

function bookLoanResponseStatusOk(res, status, bookLoan, message) {
  if (bookLoan.length > 1) {
    return res.status(status).json({
      status: 'OK',
      message,
      booksLoan: bookLoan,
    });
  }
  return res.status(status).json({
    status: 'OK',
    message,
    bookLoan,
  });
}

module.exports = { responseError, bookResponseStatusOk, bookLoanResponseStatusOk };
