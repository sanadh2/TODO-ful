const { CustomApiError } = require("./custom-error");

const errorHandlerMiddleWare = (err, req, res, next) => {
  // return res.status(500).json({ msg: "err", err });
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something Fishy" });
};

module.exports = errorHandlerMiddleWare;
