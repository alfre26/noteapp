const { format } = require("timeago.js");

const helpers = {};

// tiene de que fue creado
helpers.time = timestamp => {
  return format(timestamp);
};

module.exports = helpers;