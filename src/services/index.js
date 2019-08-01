const locations = require('./locations/locations.service.js');
const types = require('./types/types.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(locations);
  app.configure(types);
};
