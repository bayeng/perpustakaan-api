/* eslint-disable no-use-before-define */
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/apiError');

async function findAllBooks() {
  const getAllBooks = await prisma.book.findMany({
    include: {
      author: {
        select: { name: true },
      },
      bookCategory: {
        select: { name: true },
      },
    },
  });

  return getAllBooks;
}

async function findBookById(id) {
  const getBook = await prisma.book.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true },
      },
      bookCategory: {
        select: { name: true },
      },
    },
  });

  if (!getBook) {
    throw new ApiError(404, 'book not found', true);
  }
  return getBook;
}

async function createDataBook(body) {
  const {
    title, desc, bookCategoryId, authorId,
  } = body;

  if (!(title && desc && bookCategoryId && authorId)) {
    throw new ApiError(400, 'field is required', true);
  }

  const checkTitle = await checkExistingTitle(title);
  if (checkTitle) {
    throw new ApiError(400, 'title already used', true);
  }

  const newData = {
    title,
    desc,
    bookCategory: { connect: { id: bookCategoryId } },
    author: { connect: { id: authorId } },
  };

  const createBook = await prisma.book.create({
    data: {
      ...newData,
    },
  });
  if (!createBook) {
    throw new ApiError(400, '');
  }
  console.log(createBook);
  return createBook;
}

async function updateBookById(id, body) {
  const {
    title, desc, bookCategoryId, authorId,
  } = body;

  const existingTitle = await checkExistingTitle(title);
  if (existingTitle) {
    throw new ApiError(400, 'title already used');
  }

  const newData = {
    title,
    desc,
    bookCategory: { connect: { id: bookCategoryId } },
    user: { connect: { id: authorId } },
  };

  const updateBook = await prisma.book.update({
    where: { id },
    data: { ...newData },
  });

  return updateBook;
}

async function deleteBookById(id) {
  const checkBookById = await findBookById(id);
  console.log(checkBookById);

  const deleteBook = await prisma.book.delete({ where: { id } });
  return deleteBook;
}

// helper
async function checkExistingTitle(title) {
  const findBookByTitle = await prisma.book.findUnique({
    where: {
      title,
    },
  });
  return findBookByTitle;
}

module.exports = {
  findAllBooks,
  findBookById,
  createDataBook,
  updateBookById,
  deleteBookById,
};
