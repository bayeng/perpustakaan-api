/* eslint-disable no-use-before-define */
const passwordHash = require('password-hash');
const prisma = require('../../prisma/prismaClient');
const { ApiError } = require('../../helper/apiError');

async function findUserById(id) {
  const userByid = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!userByid) {
    throw new ApiError(404, 'user not found', true);
  }

  return userByid;
}

async function findAllUsers() {
  const getAllUsers = await prisma.user.findMany();
  return getAllUsers;
}

async function registerUser(body) {
  const {
    name, email, username, password, levelId,
  } = body;
  const existingUsername = await checkExistingUsername(username);
  const existingEmail = await checkExistingEmail(email);

  if (existingUsername) {
    throw new ApiError(400, 'username already taken', true);
  }
  if (existingEmail) {
    throw new ApiError(400, 'email already taken', true);
  }
  if (!(name && email && username && levelId)) {
    throw new ApiError(400, 'the field is required', true);
  }

  const encryptPassword = passwordHash.generate(password);
  const newData = {
    name,
    email,
    username,
    password: encryptPassword,
    level: {
      connect: { id: levelId },
    },
  };

  const newUserData = await prisma.user.create({
    data: {
      ...newData,
    },
  });

  return newUserData;
}

async function updateUserById(id, body) {
  const {
    name, email, username, password, levelId,
  } = body;
  const encryptPassword = passwordHash.generate(password);
  const existingUsername = await checkExistingUsername(username);
  const existingEmail = await checkExistingEmail(email);

  if (existingUsername) {
    throw new ApiError(400, 'username already taken', true);
  }
  if (existingEmail) {
    throw new ApiError(400, 'email already taken', true);
  }

  const newData = {
    name,
    email,
    username,
    password: encryptPassword,
    level: {
      connect: { id: levelId },
    },
  };

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      ...newData,
    },
  });
}

async function deleteUserById(id) {
  const checkExistingUser = await findUserById(id);
  console.log(checkExistingUser);

  const deleteUser = await prisma.user.delete({ where: { id } });
  return deleteUser;
}

// helper
async function checkExistingUsername(username) {
  const checkUsername = await prisma.user.findUnique(
    {
      where: { username },
    },
  );

  return checkUsername;
} async function checkExistingEmail(email) {
  const checkEmail = await prisma.user.findUnique(
    {
      where: { email },
    },
  );

  return checkEmail;
}

module.exports = {
  findUserById,
  registerUser,
  findAllUsers,
  updateUserById,
  deleteUserById,
};
