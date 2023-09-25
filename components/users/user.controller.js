/* eslint-disable no-console */
const userService = require('./user.service');

async function getAllUsers(req, res) {
  try {
    const users = await userService.findAllUsers();
    if (users.length < 1) {
      return res.status(200).json({
        status: 'OK',
        message: 'user is empty',
        users,
      });
    }
    return res.status(200).json({
      status: 'OK',
      message: 'all data users',
      users,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await userService.findUserById(id);
    return res.status(200).json({
      status: 'OK',
      message: 'get data user',
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function registerUser(req, res) {
  try {
    const user = await userService.registerUser(req.body);
    return res.status(201).json({
      status: 'OK',
      message: 'registration is success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function updateUserById(req, res) {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);

    return res.status(201).json({
      status: 'OK',
      message: 'update data user is success',
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

async function deleteUserById(req, res) {
  try {
    await userService.deleteUserById(req.params.id);

    return res.status(200).json({
      status: 'OK',
      message: `user with id '${req.params.id}' deleted`,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      status: 'failed',
      message: error.message,
    });
  }
}

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
