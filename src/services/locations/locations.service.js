// Initializes the `locations` service on path `/locations`
const createService = require('feathers-knex');
const createModel = require('../../models/locations.model');
const hooks = require('./locations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'locations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/locations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('locations');

  service.hooks(hooks);
};
  