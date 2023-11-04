const mongoose = require("mongoose");

const connected = (url) => {
  return mongoose.connect(url);
};

module.exports = { connected };
