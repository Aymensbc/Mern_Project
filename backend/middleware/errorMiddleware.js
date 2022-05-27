//this error handle is created inorder  to override the default express error handler
//setGoals controller uses this error handler.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; //500 is a server error

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //if in production then dont show error stack
  });
};

module.exports = {
  errorHandler,
};
