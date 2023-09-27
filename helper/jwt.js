const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_TOKEN,
    {
      expiresIn: '2h',
    },
  );

  return token;
}

module.exports = { generateAccessToken };
