const passwordHash = require('password-hash');
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/apiError');
const { generateAccessToken } = require('../../helper/jwt');

async function findUserByEmail(body) {
  const { email, password } = body;
  if (!(email && password)) {
    throw new ApiError(400, 'field is required', true);
  }

  const findUser = await prisma.user.findUnique({ where: { email } });
  if (!findUser) {
    throw new ApiError(404, 'email not registered', true);
  }

  const verifyPassword = passwordHash.verify(password, findUser.password);
  if (findUser && verifyPassword) {
    findUser.token = generateAccessToken(findUser);

    return findUser;
  }

  throw new ApiError(400, 'invalid credential', true);
}

module.exports = { findUserByEmail };
