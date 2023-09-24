/* eslint-disable no-use-before-define */

const { ApiError } = require('../../helper/apiError');
const prisma = require('../../prisma/prismaClient');

async function createBookCategory(body) {
  const { name } = body;
  const checkExistBookCategory = await existingBookCategory(name);

  if (checkExistBookCategory) {
    throw new ApiError(409, 'bookCategory already exist', true);
  }

  const createNewBookCategory = await prisma.bookCategory.create({
    data: {
      name,
    },
  });
  return createNewBookCategory;
}

async function findAllBookCategory() {
  const getAllBookCategory = prisma.bookCategory.findMany();
  return getAllBookCategory;
}

async function findBookCategoryById(id) {
  const getBookCategory = await prisma.bookCategory.findUnique({
    where: {
      id,
    },
  });
  if (!getBookCategory) {
    throw new ApiError(404, 'book category not found', true);
  }

  return getBookCategory;
}

async function deleteBookCategoryById(id) {
  if (!(await findBookCategoryById(id))) {
    throw new ApiError(404, 'book not found', true);
  }

  const deleteBookCategory = await prisma.bookCategory.delete({
    where: {
      id,
    },
  });

  return deleteBookCategory;
}

// helper
async function existingBookCategory(name) {
  const checkExistBookCategory = await prisma.bookCategory.findUnique({
    where: {
      name,
    },
  });

  return checkExistBookCategory;
}

module.exports = {
  createBookCategory,
  findBookCategoryById,
  deleteBookCategoryById,
  findAllBookCategory,
};
