const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  photo_url: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
