const basicInfo = require("./basicInfo");
const users = require("./users/create-User");
const components = require("./components");
const createUser = require("./users/create-User");
const tag = require("./tags");

module.exports = {
  ...basicInfo,
  ...users,
  ...components,
  ...createUser,
  ...tag,
};
