const categoryServices = require('./category.service');

async function getAllBookCategory(req, res) {
  try {
    const bookCategory = await categoryServices.findAllBookCategory();
    if (bookCategory.length < 1) {
      return res.status(200).json({
        status: 'success',
        message: 'book category is empty',
        bookCategory,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'get all book category',
      bookCategory,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function getBookCategoryById(req, res) {
  try {
    const { id } = req.params;

    const bookCategory = await categoryServices.findBookCategoryById(id);

    return res.status(200).json({
      status: 'success',
      message: 'get book category',
      bookCategory,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function createBookCategory(req, res) {
  try {
    const bookCategory = await categoryServices.createBookCategory(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'create book category',
      bookCategory,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function deleteBookById(req, res) {
  try {
    await categoryServices.deleteBookCategoryById(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: `book category with id: '${req.params.id}' has deleted`,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

module.exports = {
  createBookCategory,
  getAllBookCategory,
  getBookCategoryById,
  deleteBookById,
};
