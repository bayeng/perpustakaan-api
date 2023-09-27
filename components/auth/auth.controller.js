const authService = require('./auth.service');
const { responseError } = require('../../helper/response');

async function login(req, res) {
  try {
    const userLogin = await authService.findUserByEmail(req.body);

    return res.status(200).json({
      status: 'OK',
      message: 'login success',
      user: userLogin,
    });
  } catch (error) {
    console.log(error);
    return responseError(res, error);
  }
}

module.exports = { login };
