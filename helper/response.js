function responseError(res, error) {
  return res.status(error.statusCode || 400).json({
    status: 'fail',
    message: error.message,
  });
}

function responseStatusOk(res, status, entity, message) {
  return res.status(status).json({
    status: 'OK',
    message,
    data: { entity },
  });
}

module.exports = { responseError, responseStatusOk };
