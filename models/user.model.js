const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // set(val) {
      //   return require("bcryptjs".hashSync(val, 10));
      // },
    },
  })
);

module.exports = User;
