const { ApiError } = require('../../helper/apiError');
const prisma = require('../../prisma/prismaClient');

async function findAllBookLoan() {
  const getBookLoan = await prisma.bookLoan.findMany({
    include: {
      author: {
        select: { name: true },
      },
      book: {
        select: { title: true },
      },
    },
  });

  return getBookLoan;
}

async function findBookLoan(id) {
  const getBookLoan = await prisma.bookLoan.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true },
      },
      book: {
        select: { title: true },
      },
    },
  });

  if (!getBookLoan) {
    throw new ApiError(404, 'book not found', true);
  }
  return getBookLoan;
}

async function createDataBookLoan(body) {
  const {
    userId, bookId,
  } = body;

  if (!(userId && bookId)) {
    throw new ApiError(400, 'field is required', true);
  }

  const newData = {
    book: { connect: { id: bookId } },
    user: { connect: { id: userId } },
  };

  const createBook = await prisma.bookLoan.create({
    data: {
      ...newData,
    },
  });
  return createBook;
}
async function deleteBookLoanById(id) {
  const checkBookLoanById = await findBookLoan(id);
  console.log(checkBookLoanById);

  const deleteBook = await prisma.bookLoan.delete({ where: { id } });
  return deleteBook;
}

module.exports = {
  findAllBookLoan,
  findBookLoan,
  createDataBookLoan,
  deleteBookLoanById,
};
